namespace DeathRaces.Models
{
	public class GameHubModel
	{
		public string ConnectionId { get; set; }
		public double X { get; set; }
		public double Y { get; set; }
		public double Degrees { get; set; }
		public bool IsShot { get; set; }
		public string UserName { get; set; }
	}
}
