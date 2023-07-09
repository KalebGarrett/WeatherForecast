using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using WeatherForecast.Web.Models;

namespace WeatherForecast.Web.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        ViewData["Title"] = "Weather Forecast";
        var model = new IndexViewModel();
        var monthName = model.Month.ToString("MMMM");
        ViewData["Month"] = monthName;
        var hour = model.Time.ToString("t");
        ViewData["Time"] = hour;
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel {RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier});
    }
}