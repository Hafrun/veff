using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VideoCommentApp.Models
{
    public class Likes
    {
        public int ID { get; set; }
        public int LikedID { get; set; }
        public String Username { get; set; }
    }
}