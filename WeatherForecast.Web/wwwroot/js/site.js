﻿$(document).ready(function () {
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=";
    
    function getWeatherData(city) {
        $.ajax({
            url: apiUrl + city + `&appid=${apiKey}`,
            method: "GET",
            success: function (response) {
                $(".infoBox").show();
                $(".weatherIcon img").remove();
                $(".weatherIconText").empty();
                $(".description").empty();

                function getCityTime(time) {
                    const date = new Date();
                    const localOffset = date.getTimezoneOffset() * 60000;
                    time = new Date(date.getTime() + (response.timezone * 1000) + localOffset);
                    return time;
                }

                function getCityHour() {
                    return getCityTime().getHours();
                }

                function displayCityTime() {
                    const day = getCityTime().getDate();
                    const month = getCityTime().toLocaleDateString('en-US', {month: 'long'});
                    const year = getCityTime().getFullYear();
                    let hour = getCityTime().getHours();
                    const minute = getCityTime().getMinutes();
                    const period = hour >= 12 ? 'PM' : 'AM';
                    hour = hour % 12 || 12;
                    return `${month} ${day}, ${year}: ${hour}:${minute.toString().padStart(2, '0')} ${period}`;
                }

                switch (response.weather[0].main) {
                    case "Clear":
                        if (getCityHour() >= 6 && getCityHour() < 18) {
                            $(".weatherIcon").prepend($("<img>", {
                                id: 'clear',
                                src: "img/forecast/clear.png",
                                alt: "Clear"
                            }));
                            break;
                        } else if (getCityHour() >= 18 || getCityHour() < 6) {
                            $(".weatherIcon").prepend($("<img>", {
                                id: 'nightClear',
                                src: "img/forecast/night-clear.png",
                                alt: "Clear Night"
                            }));
                            break;
                        }
                    case "Clouds":
                        if (getCityHour() >= 6 && getCityHour() < 18) {
                            $(".weatherIcon").prepend($("<img>", {
                                id: 'clouds',
                                src: "img/forecast/clouds.png",
                                alt: "Clouds"
                            }));
                        } else if (getCityHour() >= 18 || getCityHour() < 6) {
                            $(".weatherIcon").prepend($("<img>", {
                                id: 'clouds',
                                src: "img/forecast/night-clouds.png",
                                alt: "Clouds"
                            }));
                        }
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
                    case "Thunderstorm":
                        $(".weatherIcon").prepend($("<img>", {
                            id: 'thunderstorm',
                            src: "img/forecast/thunderstorm.png",
                            alt: "Thunderstorm"
                        }));
                        break;
                    case "Mist":
                        if (getCityHour() >= 6 && getCityHour() < 18) {
                            $(".weatherIcon").prepend($("<img>", {
                                id: 'mist',
                                src: "img/forecast/mist-haze-fog.png",
                                alt: "Mist"
                            }));
                        } else if (getCityHour() >= 18 || getCityHour() < 6) {
                            $(".weatherIcon").prepend($("<img>", {
                                id: 'mist',
                                src: "img/forecast/night-mist-haze-fog.png",
                                alt: "Mist"
                            }));
                        }
                        break;
                    case "Haze":
                        if (getCityHour() >= 6 && getCityHour() < 18) {
                            $(".weatherIcon").prepend($("<img>", {
                                id: 'haze',
                                src: "img/forecast/mist-haze-fog.png",
                                alt: "Haze"
                            }));
                        } else if (CityHour() >= 18 || CityHour() < 6) {
                            $(".weatherIcon").prepend($("<img>", {
                                id: 'haze',
                                src: "img/forecast/night-mist-haze-fog.png",
                                alt: "Haze"
                            }));
                        }
                        break;
                    case "Fog":
                        if (getCityHour() >= 6 && getCityHour() < 18) {
                            $(".weatherIcon").prepend($("<img>", {
                                id: 'fog',
                                src: "img/forecast/mist-haze-fog.png",
                                alt: "Fog"
                            }));
                        } else if (getCityHour() >= 18 || getCityHour() < 6) {
                            $(".weatherIcon").prepend($("<img>", {
                                id: 'fog',
                                src: "img/forecast/night-mist-haze-fog.png",
                                alt: "Fog"
                            }));
                        }
                        break;
                    case "Snow":
                        $(".weatherIcon").prepend($("<img>", {
                            id: 'snow',
                            src: "img/forecast/snow.png",
                            alt: "Snow"
                        }));
                        break;
                    case "Tornado":
                        $(".weatherIcon").prepend($("<img>", {
                            id: 'tornado',
                            src: "img/forecast/tornado.png",
                            alt: "Tornado"
                        }));
                        break;
                    default:
                        $(".weatherIconText").text("No image data available.")
                        break;
                }

                response.weather[0].description = response.weather[0].description.toLowerCase()
                    .split(" ").map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                    .join(" ");
                $(".description").text(response.weather[0].description);

                $("#location").text(`${response.sys.country}, ${response.name}`);
                $("#cityDate").text(displayCityTime());
                $("#temp").text("Temperature: " + Math.round(response.main.temp) + "°F");
                $("#humidity").text("Air Humidity: " + Math.round(response.main.humidity) + "%");
                $("#windSpeed").text("Wind Speed: " + Math.round(response.wind.speed) + " mph");

                let convertToInHg = response.main.pressure / 33.864;
                $("#pressure").text("Pressure: " + Math.round(convertToInHg * 100) / 100 + " inHg");
            },
            error: function () {
                $(".infoBox").show();
                $(".weatherIcon img").remove();
                $(".weatherIconText").empty().text("Error retrieving weather data.");
                $(".description").empty().text("Error retrieving weather data.");
                $("#location").empty().text("Error retrieving weather data.");
                $("#cityDate").empty().text("Error retrieving weather data.");
                $("#temp").empty().text("Error retrieving weather data.");
                $("#humidity").empty().text("Error retrieving weather data.");
                $("#windSpeed").empty().text("Error retrieving weather data.");
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