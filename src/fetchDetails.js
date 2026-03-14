import moment from "moment"
export async function fetchWeatherDetails(latitude, longitude, date, unit = "celsius") {
    let weatherDetails = undefined
    const baseUrl = "https://api.open-meteo.com/v1/forecast"
    const params = {
        "latitude": latitude,
        "longitude": longitude,
        "current": ["temperature_2m", "relative_humidity_2m", "wind_speed_10m", "cloud_cover", "pressure_msl", "rain", "showers", "snowfall"],
        "daily": ["temperature_2m_max", "temperature_2m_min", "wind_speed_10m_max", "sunrise", "sunset", "wind_direction_10m_dominant", "shortwave_radiation_sum"],
        "timezone": "auto",
        "hourly": "temperature_2m",
        "forecast_days": 3,
        "temperature_unit": unit
    }

    try {
        const response = await fetch(`${baseUrl}?${new URLSearchParams(params)}`)
        const data = await response.json()
        let tempArr = []
        for (let i = 0; i < data.hourly.time.length; i++) {
            tempArr.push({
                "time": data.hourly.time[i],
                "temperature": data.hourly.temperature_2m[i]
            })
        }
        data.hourly = tempArr
        weatherDetails = createWeatherObject(data)
        // console.log("debug", res) // remove once done
    } catch (error) {
        console.log(error)
    }
    return weatherDetails
}

function createWeatherObject(data) {
    const result = {
        today: { core: {}, hourly: { series: [], category: [] } },
        tomorrow: {
            core: {}, hourly: { series: [], category: [] }
        },
        dayAfterTomorrow: { core: {}, hourly: { series: [], category: [] } }
    }
    const availableDates = data.daily.time; // ["2026-03-01", "2026-03-02", "2026-03-03"]

    // Map daily core data
    availableDates.forEach((date, index) => {
        const coreData = {
            date,
            temperature: `${data.daily.temperature_2m_min[index]} / ${data.daily.temperature_2m_max[index]}`,
            temperatureUnit: data.daily_units.temperature_2m_min,
            weatherConditions: [
                {
                    "title": "Sunrise",
                    "value": moment(data.daily.sunrise[index]).format('HH:mm'),
                    "unit": ""
                },
                {
                    "title": "Sunset",
                    "value": moment(data.daily.sunset[index]).format('HH:mm'),
                    "unit": ""
                },
                {
                    "title": "Wind",
                    "value": data.daily.wind_speed_10m_max[index],
                    "unit": "%"
                },
                {
                    title: "Wind Direction",
                    value: data.daily.wind_direction_10m_dominant[index],
                    unit: "°"
                },
            ],
        };
        
        
        if (index === 0) {
            const tempObj = {
                "date": date,
                "temperature": data.current.temperature_2m,
                temperatureUnit: data.current_units.temperature_2m,
                "weatherConditions": [
                    {
                        "title": "Humidity",
                        "value": data.current.relative_humidity_2m,
                        "unit": "%"
                    },
                    {
                        "title": "Cloud Cover",
                        "value": data.current.cloud_cover,
                        "unit": "%"
                    },
                    {
                        "title": "Pressure",
                        "value": data.current.pressure_msl,
                        "unit": "hPa"
                    },
                    {
                        "title": "Wind",
                        "value": data.current.wind_speed_10m,
                        "unit": "km/h"
                    }
                ],
            }
            result.today.core = tempObj;
            result.today.hourly = prepareChartData(data.hourly, date);
        }
        if (index === 1) {
            result.tomorrow.core = coreData
            result.tomorrow.hourly = prepareChartData(data.hourly, date)
        };
        if (index === 2) {
            result.dayAfterTomorrow.core = coreData
            result.dayAfterTomorrow.hourly = prepareChartData(data.hourly, date)
        };
    });
    return result;
}

const prepareChartData = (hourlyArr, date) => {
    let result = {
        series: [],
        category: []
    }
    const filterVal = hourlyArr.filter((time) => date == moment(time.time).format('YYYY-MM-DD'))
    result.series = filterVal.map((item) => item.temperature)
    result.category = filterVal.map((item) => moment(item.time).format('HH:mm'))
    return result
}

export async function fetchLocationDetails(query) {
    let searchDetails = []
    const baseUrl = "https://nominatim.openstreetmap.org/search"
    const params = {
        "q": query,
        "format": "json",
        "limit": 10
    }
    try {
        const response = await fetch(`${baseUrl}?${new URLSearchParams(params)}`,{
            headers: {
                "User-Agent": "MyGeocodingApp/1.0 (gurunathpatil80999@gmail.com)"
            }
        })
        const data = await response.json()
        searchDetails = data
    } catch (error) {
        console.log(error)
    }
    return searchDetails
}