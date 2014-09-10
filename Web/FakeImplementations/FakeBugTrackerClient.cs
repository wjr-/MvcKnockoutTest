using MvcKnockoutTest.Model;
using System.Threading;

namespace MvcKnockoutTest.Web.FakeImplementations
{
    public class FakeBugTrackerClient : IBugTrackerClient
    {
        public string GetCaseTitle(string caseId)
        {
            // This is slow business!
            Thread.Sleep(500);

            return "Case Number " + caseId;
        }
    }
}