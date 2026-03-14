import React, { useState } from "react";
import NavBar from "./topNavBar"
import "./style.css"
import SearchComponent from "@/searchUI";
import { Outlet } from "react-router-dom";
export default function AppUI() {
    const [location, setLocation] = useState("")
    const [temperature_status, setTemperatureStatus] = useState('celsius')

    return (
        <>
            <div className="row container-fluid">
                <div className="col-12">
                    <NavBar />
                </div>
                <div className="col-12 mb-3">
                    <div className="row d-flex align-items-center">
                        {/* temprature indicater */}
                        <div className="col-5 d-flex">
                            <div className="d-flex justify-content-around ms-2">
                                <div className="d-flex align-items-end me-3">
                                    <p className="fs-3 p-0 m-0 fw-bold text-light">C</p>
                                </div>
                                <div className="">
                                    <input type="checkbox" id="switch" />
                                    <label htmlFor="switch" onClick={(e) => {
                                        if (e.target.control.checked == false) {
                                            setTemperatureStatus('fahrenheit')
                                        } else {
                                            setTemperatureStatus('celsius')
                                        }
                                    }
                                    } />
                                </div>
                                <div className="d-flex align-items-end ms-3">
                                    <p className="fs-3 p-0 m-0 fw-bold text-light">F</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-7 d-flex align-items-center">
                            <SearchComponent setSelectedItem={setLocation} />
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <Outlet context={{
                        selectedLocation: location,
                        tempUnit: temperature_status
                    }} />
                </div>
            </div>
        </>
    )
}

