using MvcKnockoutTest.Model;
using System.Collections.Generic;

namespace MvcKnockoutTest.Web.FakeImplementations
{
    public class FakeBacklogRepository : IBacklogRepository
    {
        private string sessionKey = "BacklogItems";
        
        public IList<BacklogItem> Get()
        {
            return (System.Web.HttpContext.Current.Session[sessionKey] as List<BacklogItem>) ?? new List<BacklogItem>();
        }

        public void Save(IList<BacklogItem> items)
        {
            System.Web.HttpContext.Current.Session[sessionKey] = items;
        }
    }
}