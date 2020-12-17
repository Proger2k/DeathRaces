using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;

namespace DeathRaces
{
	public class GameHub : Hub
	{
        public string ConnectionId;
		public async Task Send(string key, string evenеtType)
        {
			await Clients.Others.SendAsync("Receive", key, evenеtType, Context.ConnectionId);
		}
        public override async Task OnConnectedAsync()
        {
            await Clients.Others.SendAsync("Notify", $"{Context.ConnectionId}", "1");
            await base.OnConnectedAsync();
        }
        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await Clients.All.SendAsync("Notify", $"{Context.ConnectionId}", "-1");
            await base.OnDisconnectedAsync(exception);
        }
    }
}
