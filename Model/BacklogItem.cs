using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MvcKnockoutTest.Model
{
	public class BacklogItem
	{
		public int BugTrackerCaseId { get; set; }
		public string Name { get; set; }
		public int Ordinal { get; set; }
	}
}
