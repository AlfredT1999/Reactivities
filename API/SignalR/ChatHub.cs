/* 
   Create a hub by declaring a class that inherits from Hub, 
   and add public methods to it. Clients can call methods that 
   are defined as public.
*/
using System;
using System.Threading.Tasks;
using Application.Comments;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    public class ChatHub : Hub
    {
        private readonly IMediator mediator;

        public ChatHub(IMediator mediator)
        {
            this.mediator = mediator;
        }

        // The name of our methods are important because when we called in the client side we invoked 
        // by his current name:
        public async Task SendComment(Create.Command command)
        {
            var comment = await this.mediator.Send(command);

            /* 
               We want to send that comment to anybody who is connected to the hub: 
               
               Clients = Calls a method on specific connected clients.
               Group = Calls a method on all connections in the specified group.
            */
            await Clients.Group(command.ActivityId.ToString())
                .SendAsync("ReceiveComment", comment.Value);
        }

        // Called when a new connection is established with the hub.
        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            var activityId = httpContext.Request.Query["activityId"];

            /* Groups = Calls a method on multiple groups of connections. */
            await Groups.AddToGroupAsync(Context.ConnectionId, activityId);

            var result = await this.mediator.Send(new List.Query{ActivityId = Guid.Parse(activityId)});

            await Clients.Caller.SendAsync("LoadComments", result.Value);
        }
    }
}