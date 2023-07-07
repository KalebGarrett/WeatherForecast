$(document).ready(function () {
    const apiKey = "9bc9380a770719c0b6d6795368251f9e";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=";
    
    function getWeatherData(city) {
        $.ajax({
            url: apiUrl + city + `&appid=${apiKey}`,
            method: "GET",
            success: function (response) {
                $(".infoBox").show();
                $(".weatherIcon img").remove();
                $(".weatherIcon").empty();

                switch (response.weather[0].main) {
                    case "Clear":
                        $(".weatherIcon").prepend($("<img>", {
                            id: 'clear',
                            src: "img/forecast/clear.png",
                            alt: "Clear"
                        }));
                        break;
                    case "Clouds":
                        $(".weatherIcon").prepend($("<img>", {
                            id: 'clouds',
                            src: "img/forecast/clouds.png",
                            alt: "Clouds"
                        }));
                        break;
                    case "Rain":
                        $(".weatherIcon").prepend($("<img>", {id: 'rain', src: "img/forecast/rain.png", alt: "Rain"}));
                        break;
                    case "Drizzle":
                        $(".weatherIcon").prepend($("<img>", {
                            id: 'drizzle',
                            src: "img/forecast/drizzle.png",
                            alt: "Drizzle"
                        }));
                        break;
                    case "Mist":
                        $(".weatherIcon").prepend($("<img>", {id: 'mist', src: "img/forecast/mist.png", alt: "Mist"}));
                        break;
                    default:
                        $(".weatherIcon").text("No image data available.")
                        break;
                }

                $("#location").text(`${response.sys.country}, ${response.name}`);
                $("#temp").text("Temperature: " + Math.round(response.main.temp) + "°F");
                $("#windSpeed").text("Wind Speed: " + Math.round(response.wind.speed) + " mph");
                $("#humidity").text("Humidity: " + Math.round(response.main.humidity) + "%");

                let convertToInHg = response.main.pressure / 33.864;
                $("#pressure").text("Pressure: " + Math.round(convertToInHg * 100) / 100 + " inHg");
            },
            error: function () {
                $(".infoBox").show();
                $(".weatherIcon img").remove();
                $(".weatherIcon").empty().text("Error retrieving weather data.")
                $("#location").empty().text("Error retrieving weather data.");
                $("#temp").empty().text("Error retrieving weather data.");
                $("#windSpeed").empty().text("Error retrieving weather data.");
                $("#humidity").empty().text("Error retrieving weather data");
                $("#pressure").empty().text("Error retrieving weather data.");
            }
        });
    }

    $("#searchBtn").click(function (e) {
        e.preventDefault();
        const location = $("#locationInput").val();
        getWeatherData(location);
    });
});