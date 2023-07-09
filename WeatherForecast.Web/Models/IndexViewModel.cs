namespace WeatherForecast.Web.Models;

public class IndexViewModel
{
    public DateTime Month { get; set; } = DateTime.Now;
    public DateTime Time { get; set; } = DateTime.Now;
}