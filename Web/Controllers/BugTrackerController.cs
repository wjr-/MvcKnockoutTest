using System.Web.Mvc;
using MvcKnockoutTest.Model;

namespace MvcKnockoutTest.Web.Controllers
{
	public partial class BugTrackerController : Controller
    {
		private IBugTrackerClient bugTrackerClient;

		public BugTrackerController(IBugTrackerClient bugTrackerClient)
		{
			this.bugTrackerClient = bugTrackerClient;
		}
		
		public virtual ContentResult GetCaseName(string id)
		{
			return Content(this.bugTrackerClient.GetCaseTitle(id));
		}
    }
}
