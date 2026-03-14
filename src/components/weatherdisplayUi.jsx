import React from "react";
import "./style.css"
import moment from "moment";
export default function WeatherUI({ weatherDetails, locationDetails, selectedDate }) {
    return (
        <>
            <div className="row p-4" style={{width:'60%'}} id="main-container">
                <div className="col-12">
                    <h3 className="d-flex align-items-center">{locationDetails.name}<span className="material-icons fs-2 ms-2">
                        location_on
                    </span></h3>
                </div>
                <div className="col-12">
                    <div className="row">
                        <div className="col-4 d-flex align-items-end fw-bold text-decoration-underline fs-5">
                            {moment(selectedDate).format("ddd, DD MMM")}
                        </div>
                        <div className="col-8">
                            <h2 className="d-flex align-items-center display-3 fw-bold" id="temprature-number">
                                <span className="material-icons" id="thermostat-logo">
                                    device_thermostat
                                </span>
                                {weatherDetails?.temperature}
                                <span className="ms-3">{weatherDetails?.temperatureUnit}</span>
                            </h2>
                        </div>
                    </div>
                </div>
                <div className="col-12 mt-4">
                    <table className="w-100 mt-3">
                        <thead>
                            <tr className="">
                                {
                                    weatherDetails?.weatherConditions.map((item) => (
                                        <th key={item.title}>{item.title}</th>
                                    ))
                                }
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {
                                    weatherDetails?.weatherConditions.map((item) => (
                                        <td key={item.title} className="ps-2">{item.value} {item.unit}</td>
                                    ))
                                }
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}