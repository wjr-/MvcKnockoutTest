using System.Collections.Generic;

namespace MvcKnockoutTest.Model
{
    public interface IBacklogRepository
    {
        IList<BacklogItem> Get();
        void Save(IList<BacklogItem> items);
    }
}
