using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using VideoCommentApp.Models;

namespace VideoBlogApplication.Models
{
    public class CommentRepository
    {
        private static CommentRepository _instance;

        public static CommentRepository Instance
        {
            get
            {
                if (_instance == null)
                    _instance = new CommentRepository();
                return _instance;
            }
        }

        private List<Comment> m_comments = null;
        private List<Likes> m_likes = null;

        private CommentRepository()
        {
            this.m_comments = new List<Comment>();
            Comment commment1 = new Comment { ID = 1, CommentText = "Great Video!", CommentDate = new DateTime(2014, 3, 1, 12, 30, 00), Username = "Patrekur" };
            Comment commment2 = new Comment { ID = 2, CommentText = "Amazing content!", CommentDate = new DateTime(2014, 3, 5, 12, 30, 00), Username = "Siggi" };
            this.m_comments.Add(commment1);
            this.m_comments.Add(commment2);

            m_likes = new List<Likes>();

        }

        public IEnumerable<Comment> GetComments()
        {
            var result = from c in m_comments
                         orderby c.CommentDate ascending
                         select c;
            return result;
        }

        public void AddComment(Comment c)
        {
            int newID = 1;
            if (m_comments.Count() > 0)
            {
                newID = m_comments.Max(x => x.ID) + 1;
            }
            c.ID = newID;
            c.CommentDate = DateTime.Now;
            m_comments.Add(c);
        }
        public IEnumerable<Likes> GetLikes(int id)
        {
            var result = from c in m_likes
                         where c.LikedID == id
                         select c;
            return result;
        }

        public void AddLikes(Likes c)
        {
            int newID = 1;
            if (m_likes.Count() > 0)
            {
                newID = m_likes.Max(x => x.ID) + 1;
            }
            c.ID = newID;
            m_likes.Add(c);

        }
    }
}