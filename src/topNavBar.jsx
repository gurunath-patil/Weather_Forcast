import React, { useEffect, useState } from "react";
import weatherLogo from "../public/assets/weather.png"
import moment from "moment";
import "./style.css"
import { NavLink } from "react-router-dom";
export default function NavBar() {
    const [currentTime, setCurrentTime] = useState(moment().format('LT'))

    useEffect(() => {
        let interval = setInterval(() => {
            setCurrentTime(moment().format('LT'))
        }, 2000)
        return () => clearInterval(interval)
    }, [])


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
                <div className="col-8 d-flex justify-content-end align-items-center gap-5">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `fs-2 text-capitalize a-tag nav-text ${isActive ? "active-nav" : ""}`
                        }
                    >
                        today
                    </NavLink>

                    <NavLink
                        to="/tomorrow"
                        className={({ isActive }) =>
                            `fs-2 text-capitalize a-tag nav-text ${isActive ? "active-nav" : ""}`
                        }
                    >
                        tomorrow
                    </NavLink>

                    <NavLink
                        to="/dayAfterTomorrow"
                        className={({ isActive }) =>
                            `fs-3 text-capitalize a-tag nav-text ${isActive ? "active-nav" : ""}`
                        }
                    >
                        {moment().add(2, "day").format("dddd")}
                    </NavLink>
                </div>
            </div>
        </>
    )
}