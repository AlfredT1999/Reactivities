using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public string Bio { get; set; }

        // many to many relationships:
        public ICollection<ActivityAttendee> Activities { get; set; }

        // One to many relationships:
        public ICollection<Photo> Photos { get; set; }
    }
}