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
            //return Json(model, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult Index(FormCollection formData)
        {
            String strComment = formData["CommentText"];
            if (!String.IsNullOrEmpty(strComment))
            {
                Comment c = new Comment();

                c.CommentText = strComment;
                String strUser = System.Security.Principal.WindowsIdentity.GetCurrent().Name;
                if (!String.IsNullOrEmpty(strUser))
                {
                    int slashPos = strUser.IndexOf("\\");
                    if (slashPos != -1)
                    {
                        strUser = strUser.Substring(slashPos + 1);
                    }
                    c.Username = strUser;

                    CommentRepository.Instance.AddComment(c);
                }
                else
                {
                    c.Username = "Unknown user";
                }
                return RedirectToAction("Index");
            }
            else
            {
                ModelState.AddModelError("CommentText", "Comment text cannot be empty!");
                return Index();
            }
        }

        public ActionResult Date(int? id)
        {
            var result = CommentRepository.Instance.GetComments();
            var newResult = from d in result
                            select new
                            {
                                CommentDate = d.CommentDate.ToString(),
                                ID = d.ID,
                                CommentText = d.CommentText,
                                Username = d.Username
                            };
            return Json(newResult, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult AddComment(string commentText)
        {
            Comment c = new Comment();
            c.CommentText = commentText;

            return Json(c, JsonRequestBehavior.AllowGet);
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