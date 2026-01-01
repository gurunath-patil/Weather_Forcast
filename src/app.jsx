import React, { useEffect, useState } from "react";
import NavBar from "./topNavBar"
import WeatherUI from "./weatherDisplayBox/weatherdisplayUi";
import BootomUi from './footer/bottomUI'
import searchLogo from "./ImagesOrLogos/searchlogo.png"
import "./style.css"
import { useLocation } from "react-router-dom";
import { Loader } from './loader'
import { weatherDetail } from './context.js'


let result;

export default function AppUI() {
    let [weatherDetailsAvailable, setWeatherDetailsAvailable] = useState(false)
    let [loaderRun, setLoadeRun] = useState(false)
    const [location, setLocation] = useState("")
    const [centerData, setCenterData] = useState({
        "location": "",
        "cuurentTemprature": "",
        "Humidity": "",
        "Visiblity": "",
        "AirPressure": "",
        "Wind": "",
        "weatherCode": ""
    })

    const [temprature_status, setTempratureStatus] = useState(true)             // for chacking temprature state c or  f & for c is true 
    const [forecastDays, setForecastDays] = useState()

    function handleChanges(e) {
        setLocation(e.target.value)
    }

    let param = useLocation();
    // use effect function 
    useEffect(() => {
        try {
            if (location.length == 0) throw new Error("location not provided");
            sendData(result)
        } catch (err) {
            console.log(err);
        }
    }, [param, temprature_status])

    // get data from api 
    async function FetchData() {
        setLoadeRun(true)
        const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${location}&days=3&aqi=yes&alerts=yes`
        const options = {
            method: "GET",
            headers: {
                "x-rapidapi-key": `${import.meta.env.VITE_API_KEY}`,
                "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
                "Content-type": "application/json",
            },
        }

        try {
            const response = await fetch(url, options)
            result = await response.json()
            // send data to center field
            sendData(result)
            setLoadeRun(false)
            setWeatherDetailsAvailable(true)
        } catch (error) {
            console.error(error)
            alert('someting went wrong!')
            setLoadeRun(false)
        }
    }

    // this function assign data as per routing path such as todays weather data 
    function sendData(result) {
        if (param.pathname == '/') {
            setCenterData({
                "location": result.location.name,
                "cuurentTemprature": temprature_status == true ? result.current.temp_c : result.current.temp_f,
                "Humidity": result.current.humidity,
                "Visiblity": result.current.vis_km,
                "AirPressure": result.current.pressure_mb,
                "Wind": result.current.wind_kph,
                "weatherCode": result.current.condition.code
            });
            setForecastDays(result.forecast.forecastday[0].hour)
        } else if (param.pathname == '/tommorow') {
            setCenterData({
                "location": result.location.name,
                "cuurentTemprature": temprature_status == true ? result.forecast.forecastday[1].day.avgtemp_c : result.forecast.forecastday[1].day.avgtemp_f,
                "Humidity": result.forecast.forecastday[1].day.avghumidity,
                "Visiblity": result.forecast.forecastday[1].day.avgvis_km,
                "AirPressure": result.current.pressure_mb,
                "Wind": result.forecast.forecastday[1].day.maxwind_mph,
                "weatherCode": result.forecast.forecastday[1].day.condition.code
            });
            setForecastDays(result.forecast.forecastday[1].hour)
        } else if (param.pathname == '/dayaftertommorow') {
            setCenterData({
                "location": result.location.name,
                "cuurentTemprature": temprature_status == true ? result.forecast.forecastday[2].day.avgtemp_c : result.forecast.forecastday[1].day.avgtemp_f,
                "Humidity": result.forecast.forecastday[2].day.avghumidity,
                "Visiblity": result.forecast.forecastday[2].day.avgvis_km,
                "AirPressure": result.current.pressure_mb,
                "Wind": result.forecast.forecastday[2].day.maxwind_mph,
                "weatherCode": result.forecast.forecastday[2].day.condition.code
            });
            setForecastDays(result.forecast.forecastday[2].hour)
        }
    }

    return (
        <>
            {loaderRun && <Loader />}
            <div className="row container-fluid">
                <div className="col-12">
                    <NavBar />
                </div>
                <div className="col-12 mb-3">
                    <div className="row">
                        {/* temprature indicater */}
                        <div className="col-2 d-flex">
                            <div className="d-flex justify-content-around ms-2">
                                <div className="d-flex align-items-end me-3">
                                    <p className="fs-3 p-0 m-0 fw-bold text-light">C</p>
                                </div>
                                <div className="">
                                    <input type="checkbox" id="switch" />
                                    <label htmlFor="switch" onClick={(e) => {
                                        if (e.target.control.checked == false) {                // changing the temprature state 
                                            setTempratureStatus(false)
                                        } else {
                                            setTempratureStatus(true)
                                        }
                                    }
                                    } />
                                </div>
                                <div className="d-flex align-items-end ms-3">
                                    <p className="fs-3 p-0 m-0 fw-bold text-light">F</p>
                                </div>
                            </div>
                        </div>
                        {/* search bar */}
                        <div className="col-9 d-flex justify-content-center">
                            <div className="row border border-dark container main-container">
                                <div className="col-2 d-flex justify-content-center">
                                    <img src={searchLogo} alt="searchLOGO" id="searchlogoImg" />
                                </div>
                                <div className="col-10 d-flex align-items-center p-0">
                                    <input type="text" name="search" id="searchBox" placeholder="search any location here"
                                        onChange={handleChanges}
                                        onKeyUp={(e) => {
                                            if (e.key == "Enter") {
                                                FetchData()             // this function call when user hit enter btn 
                                            }
                                        }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    weatherDetailsAvailable ?
                        <>
                            <div className="col-12 d-flex justify-content-center p-4">
                                <weatherDetail.Provider value={{ centerData }}>
                                    <WeatherUI />
                                </weatherDetail.Provider>
                            </div>
                            <div className="col-12">
                                <BootomUi forecast={forecastDays} />
                            </div>)
                        </> : null
                }
            </div>
        </>
    )
}

