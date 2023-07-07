$(document).ready(function() {
    const apiKey = "9bc9380a770719c0b6d6795368251f9e";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=";

    function getWeatherData(city) {
        $.ajax({
            url: apiUrl + city + `&appid=${apiKey}`,
            method: "GET",
            success: function(response) {
                $("#city").text(response.name);
                $("#temp").text("Temperature: " + Math.round(response.main.temp) + "°F");
                $("#windSpeed").text("Wind Speed: " + Math.round(response.wind.speed) + " mph");
                $("#pressure").text("Pressure: " + Math.round(response.main.pressure) + " hpa");
                $("#humidity").text("Humidity: " + Math.round(response.main.humidity) + "%");
            },
            error: function() {
                $("#city").empty().text("Error retrieving weather data.");
                $("#temp").empty().text("Error retrieving weather data.");
                $("#windSpeed").empty().text("Error retrieving weather data.");
                $("#pressure").empty().text("Error retrieving weather data.");
                $("#humidity").empty().text("Error retrieving weather data");
            }
        });
    }

    $("#searchBtn").click(function(e) {
        e.preventDefault();
        const location = $("#cityInput").val();
        getWeatherData(location);
    });
});