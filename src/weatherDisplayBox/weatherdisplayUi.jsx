import React, { useContext } from "react";
import moment from "moment";
import "./style.css"
import { useLocation } from "react-router-dom";
import { weatherDetail } from "../context";

export default function WeatherUI(prop) {

    // const {  } = prop.
    let param = useLocation()
    let getDate;
    const { centerData } = useContext(weatherDetail)
    let location = centerData.location;
    let cuurentTemprature = centerData.cuurentTemprature;
    let Humidity = centerData.Humidity;
    let Visiblity = centerData.Visiblity;
    let AirPressure = centerData.AirPressure;
    let Wind = centerData.Wind;
    let weatherCode = centerData.weatherCode
    if (param.pathname == "/") {
        getDate = moment().format('MMM D, ddd')
    } else if (param.pathname == "/tommorow") {
        getDate = moment().add(1, 'day').format('MMM D, ddd')
    } else if (param.pathname == "/dayaftertommorow") {
        getDate = moment().add(2, 'day').format('MMM D, ddd')
    }

    const weatherIconobj = {
        "1000": "sunny",
        "1003": "partly_cloudy_day",
        "1189": "partly_cloudy_day",
        "1006": "cloud",
        "1153": "cloud",
        "1009": "foggy",
        "1030": "foggy",
        "1135": "foggy",
        "1063": "rainy",
        "1195": "rainy",
        "1240": "rainy",
        "1150": "rainy",
        "1183": "rainy",
        "1273": "rainy",
        "1087": "thunderstorm",
        "1276": "thunderstorm",
        "1114": "snowing",
        "1225": "snowing"
    }
    return (
        <>
            <div className="row p-4" id="main-container">
                <div className="col-12">
                    <h3 className="d-flex align-items-center">{location}<span class="material-icons fs-2 ms-2">
                        location_on
                    </span></h3>
                </div>
                <div className="col-12">
                    <div className="row">
                        <div className="col-4 d-flex align-items-end fw-bold text-decoration-underline fs-5">
                            {getDate}
                        </div>
                        <div className="col-3">
                            <h2 className="d-flex align-items-center display-3 fw-bold" id="temprature-number">
                                <span class="material-icons" id="thermostat-logo">
                                    device_thermostat
                                </span>
                                {cuurentTemprature}
                                <span className="ms-3">{cuurentTemprature > 50 ? "F" : "C"}</span>
                            </h2>
                        </div>
                        {/* <div className="col-3 d-flex align-items-center">
                            <span class="material-icons" id="cloud-logo">
                                {weatherIconobj[weatherCode]}
                            </span>
                        </div> */}
                    </div>
                </div>
                <div className="col-12 mt-4">
                    <table className="w-100 mt-3">
                        <tr className="">
                            <th>Humidity</th>
                            <th className="ms-5">Visiblity</th>
                            <th className="ms-5">Air Pressure</th>
                            <th className="ms-5">Wind</th>
                        </tr>
                        <tr>
                            <td className="ps-2">{Humidity}%</td>
                            <td className="ps-2">{Visiblity}km</td>
                            <td className="ps-2">{AirPressure}hPa</td>
                            <td className="ps-2">{Wind}mph</td>
                        </tr>
                    </table>
                </div>
            </div>
        </>
    )
}