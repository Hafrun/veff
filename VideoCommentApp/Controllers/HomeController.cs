using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VideoBlogApplication.Models;

namespace VideoCommentApp.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            var model = CommentRepository.Instance.GetComments();
            return View(model);
        }


        public string getUser()
        {
            String strUser = System.Security.Principal.WindowsIdentity.GetCurrent().Name;
            if (!String.IsNullOrEmpty(strUser))
            {
                int slashPos = strUser.IndexOf("\\");
                if (slashPos != -1)
                {
                    strUser = strUser.Substring(slashPos + 1);
                }
            }
            else
            {
                strUser = "Unknown user";
            }
            return strUser;
        }

        [HttpPost]
        public ActionResult AddComment(Comment c)
        {
            if (!String.IsNullOrEmpty(c.CommentText))
            {
                c.Username = getUser();
                CommentRepository.Instance.AddComment(c);
                foreach (Comment com in CommentRepository.Instance.GetComments())
                {
                    System.Console.WriteLine(com.CommentText);
                }
            }
            var comments = CommentRepository.Instance.GetComments();
            return Json(comments, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult getAllComments()
        {
            var model = CommentRepository.Instance.GetComments();

            return Json(model, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult AddLikes(string commentText)
        {
            Comment c = new Comment();
            c.CommentText = commentText;
            return Json(c, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult getLikes()
        {
            var model = CommentRepository.Instance.GetComments();
            return Json(model, JsonRequestBehavior.AllowGet);
        }



    }
}