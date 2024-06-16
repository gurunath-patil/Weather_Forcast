import React, { useEffect, useState } from "react";
import weatherLogo from "./ImagesOrLogos/weather.png"
import moment from "moment";
import "./style.css"
import { Outlet, Link, useLocation } from "react-router-dom";
export default function NavBar() {
    const [currentTime, setCurrentTime] = useState(moment().format('LT'))
    const param = useLocation()
    let textElements = document.querySelectorAll(".nav-text")

    useEffect(() => {
        let interval = setInterval(() => {
            setCurrentTime(moment().format('LT'))
        }, 2000)
        return () => clearInterval(interval)
    }, [])
    textElements.forEach((e) => e.style.fontWeight = "lighter")

    try {
        if (param.pathname == "/") {
            textElements[0].style.fontWeight = "bold"
        } else if (param.pathname == "/tommorow") {
            textElements[1].style.fontWeight = "bold"
        } else if (param.pathname == "/dayaftertommorow") {
            textElements[2].style.fontWeight = "bold"
        }
    } catch (err) {
        console.log(err);
    }

    return (
        <>
            {/* main container */}
            <div className="row mt-3" id="nav-main-container">
                <div className="col-4 d-flex">
                    {/* weather title container */}
                    <div className="row m-0" id="weather-container">
                        <div className="col-7 p-0">
                            <img src={weatherLogo} alt="weather log" className="img-width" />
                            <h2 className="display-3 fw-bold p-0" id="weather-text">WeatherMe</h2></div>
                        <div className="col-3 d-flex align-items-end mb-1 fs-5 fw-bold text-light">{currentTime}</div>
                    </div>
                </div>
                <div className="col-3 d-flex align-items-center justify-content-end">
                    <Link to={'/'} className="fs-2 text-capitalize a-tag nav-text">today</Link>
                </div>
                <div className="col-2 d-flex align-items-center justify-content-center">
                    <Link to={'/tommorow'} className="fs-2 text-capitalize a-tag nav-text">tommorow</Link>
                </div>
                <div className="col-3 d-flex align-items-center justify-content-center">
                    <Link to={'/dayaftertommorow'} className="fs-3 text-capitalize a-tag nav-text">day after tommorow</Link>
                </div>
            </div>
            <Outlet />
        </>
    )
}