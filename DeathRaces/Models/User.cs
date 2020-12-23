using Microsoft.AspNetCore.Identity;

namespace DeathRaces.Models
{
    public class User : IdentityUser
    {
        public int Age { get; set; }
    }
}
