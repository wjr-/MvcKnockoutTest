using System;

namespace MvcKnockoutTest.Model
{
	public interface IBugTrackerClient
	{
		string GetCaseTitle(string caseId);
	}
}
