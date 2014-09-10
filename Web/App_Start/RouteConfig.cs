using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace MvcKnockoutTest.Web
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Backlog",
                url: "Backlog/{action}/{id}",
                defaults: new { controller = "Backlog", action = "Main", id = UrlParameter.Optional }
            );

			routes.MapRoute(
				name: "Bug Tracker",
				url: "BugTracker/{action}/{id}",
				defaults: new { controller = "BugTracker", action = "", id = UrlParameter.Optional }
			);

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}