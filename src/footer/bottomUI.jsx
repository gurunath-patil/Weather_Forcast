import React from "react";
import "./style.css"
import moment from "moment";
import sunny from '../ImagesOrLogos/sunny.png'
import partly_cloudy_day from '../ImagesOrLogos/partly_cloudy_day.png'
import cloud from '../ImagesOrLogos/cloud.png'
import foggy from '../ImagesOrLogos/foggy.png'
import rainy_light from '../ImagesOrLogos/rainy_light.png'
import thunderstorm from '../ImagesOrLogos/thunderstorm.png'
import snowing from '../ImagesOrLogos/snowing.png'

export default function BootomUi(props) {
    const weatherIconobj = {
        "1000": sunny,
        "1003": partly_cloudy_day,
        "1006": cloud,
        "1153": cloud,
        "1009": foggy,
        "1030": foggy,
        "1135": foggy,
        "1063": rainy_light,
        "1273": rainy_light,
        "1189": rainy_light,
        "1240": rainy_light,
        "1150": rainy_light,
        "1183": rainy_light,
        "1243": rainy_light,
        "1195": rainy_light,
        "1087": thunderstorm,
        "1276": thunderstorm,
        "1114": snowing,
        "1225": snowing
    }
    let forcastArray = props.forecast
    function checkOffset() {
        const items = document.getElementById("prediction-display-container");
        items.scrollBy({ left: -150, behavior: 'smooth' })

    }
    function moveForward() {
        const items = document.getElementById("prediction-display-container");
        items.scrollBy({ left: 150, behavior: 'smooth' })

    }

    return (
        <>
            <div className="row container-fluid mt-4">
                <div className="col-1 arrow-container justify-content-end">
                    <button className="button" onClick={checkOffset}>
                        <span className="material-icons fs-2 text-light">
                            arrow_back_ios
                        </span>
                    </button>
                </div>
                <div className="col-10 d-flex justify-content-between p-2 overflow-scroll h-75" id="prediction-display-container">
                    {forcastArray && forcastArray.map((item) => {

                        return (
                            <div className="border border-dark p-2 d-flex flex-column flex-wrap text-light h-75" id="details-container">
                                <p className="mb-0 text-center">{moment(item.time, 'YYYY-MM-DD HH:mm').format('HH:mm')}</p>
                                <img src={weatherIconobj[item.condition.code]} alt={item.condition.text}
                                    className="align-self-center set-image-size" />
                                <p className="align-self-center fs-4 mb-0 position-relative">{item.temp_c}<b id="bold-tag">o</b></p>
                            </div>
                        )
                    })}

                </div>
                <div className="col-1 arrow-container" id="moveForward-btn">
                    <button className="button" onClick={moveForward}>
                        <span className="material-icons fs-2 text-light">
                            arrow_forward_ios
                        </span>
                    </button>

                </div>
            </div>

        </>
    )
}