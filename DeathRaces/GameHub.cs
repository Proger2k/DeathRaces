using DeathRaces.Models;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;

namespace DeathRaces
{
    public class GameHub : Hub
	{
        public async Task Send(GameHubModel model)
        {
            model.ConnectionId = Context.ConnectionId;
            await Clients.Others.SendAsync("Receive", model);
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
