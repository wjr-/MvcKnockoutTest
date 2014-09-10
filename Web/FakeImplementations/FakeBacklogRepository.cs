using MvcKnockoutTest.Model;
using System.Collections.Generic;

namespace MvcKnockoutTest.Web.FakeImplementations
{
    public class FakeBacklogRepository : IBacklogRepository
    {
        private string sessionKey = "BacklogItems";
        
        public IList<BacklogItem> Get()
        {            
            return new List<BacklogItem>();
        }

        public void Save(IList<BacklogItem> items)
        {
            
        }
    }
}