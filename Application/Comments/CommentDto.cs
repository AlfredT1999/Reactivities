using System;

namespace Application.Comments
{
    public class CommentDto
    {
        // These 3 properties not need to be mapped because they are directly mapped in our Comment entity.
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Body { get; set; }

        // These 3 properties needs to be mapped because they are not directly accessible from our Comment entity.
        public string Username { get; set; }
        public int DisplayName { get; set; }
        public int Image { get; set; }
    }
}