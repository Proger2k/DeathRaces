using System.ComponentModel.DataAnnotations;

namespace DeathRaces.Models
{
	public class RegistrationModel
	{
        [Required(ErrorMessage = "Укажите имя пользователя")]
        public string NickName { get; set; }
        [Required(ErrorMessage = "Укажите Email")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Укажите Ваш возраст")]
        [Range(12, 1000, ErrorMessage = "Вы должны быть старше 12-ти лет")]
        public int Age { get; set; }

        [Required(ErrorMessage = "Введите пароль")]
        public string Password { get; set; }
        public string PasswordConfirm { get; set; }
    }
}
