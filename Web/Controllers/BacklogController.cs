using System.Collections.Generic;
using System.Web.Mvc;
using MvcKnockoutTest.Model;


namespace MvcKnockoutTest.Web.Controllers
{
    public partial class BacklogController : Controller
    {
        private IBacklogRepository backlogRepository;

        public BacklogController(IBacklogRepository backlogRepository)
        {
            this.backlogRepository = backlogRepository;
        }

		public virtual ActionResult Main()
        {
			return View();
        }

		[HttpPost]
		public virtual JsonResult GetItems()
		{
			var model = this.backlogRepository.Get();

			return Json(model);
		}

		[HttpPost]
		public virtual EmptyResult Save(IList<Model.BacklogItem> model)
		{
			this.backlogRepository.Save(model);

			return new EmptyResult();
		}
    }
}