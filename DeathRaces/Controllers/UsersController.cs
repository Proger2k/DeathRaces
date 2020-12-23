using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DeathRaces.Models;
using System.Security.Claims;
using System;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Identity;

namespace DeathRaces.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        public UsersController(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        [HttpPost("Registration")]
        public async Task<ActionResult<User>> Registration(RegistrationModel model)
        {
            if (ModelState.IsValid)
            {
                User user = new User { Email = model.Email, UserName = model.NickName, Age = model.Age };
                var result = await _userManager.CreateAsync(user, model.Password);
                if (result.Succeeded)
                {
                    return Ok(user);
                }
                else
                {
                    return BadRequest();
                }
            }
            return BadRequest();
        }

        [HttpPost("Login")]
        public async Task<ActionResult<User>> Login(LoginModel model)
        {
            if (ModelState.IsValid)
            {
                User user = await _userManager.FindByNameAsync(model.NickName);
                string encodedJwt = null;

                if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
                {
                    encodedJwt = GetToken(user);
                }

                if (encodedJwt == null)
                {
                    return BadRequest("Invalid username or password.");
                }

                var response = new
                {
                    access_token = encodedJwt,
                    username = user.UserName,
                    userid = user.Id
                };
                
                return Ok(response);
            }
            return BadRequest("Invalid username or password.");
        }

        [HttpPost("VerifyId")]
        public async Task<ActionResult<User>> VerifyId(VerifyModel model)
		{
            var user = await _userManager.FindByIdAsync(model.Id);
            if (user != null)
			{
                string encodedJwt = GetToken(user);

                if (encodedJwt == null)
                {
                    return BadRequest("Invalid username or password.");
                }

                var response = new
                {
                    access_token = encodedJwt,
                    client = user
                };
                return Ok(response);
            }
            return BadRequest("Invalid username or password.");
		}

        private ClaimsIdentity GetIdentity(User user)
        {
            var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, user.UserName),
                    new Claim(ClaimsIdentity.DefaultRoleClaimType, "user")
                };
            ClaimsIdentity claimsIdentity =
            new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                ClaimsIdentity.DefaultRoleClaimType);
            return claimsIdentity;
        }

        private string GetToken(User user)
		{
            ClaimsIdentity identity = GetIdentity(user);
            if (identity == null)
                return null;

            var now = DateTime.UtcNow;

            var jwt = new JwtSecurityToken(
                    issuer: AuthOptions.ISSUER,
                    audience: AuthOptions.AUDIENCE,
                    notBefore: now,
                    claims: identity.Claims,
                    expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                    signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            return encodedJwt;
        }
    }
}
