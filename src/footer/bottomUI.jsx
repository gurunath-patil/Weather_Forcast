import React from "react";
import "./style.css"
import moment from "moment";

export default function BootomUi(props) {
    const weatherIconobj = {
        "1000": "src/ImagesOrLogos/sunny.png",
        "1003": "src/ImagesOrLogos/partly_cloudy_day.png",
        "1006": "src/ImagesOrLogos/cloud.png",
        "1153": "src/ImagesOrLogos/cloud.png",
        "1009": "src/ImagesOrLogos/foggy.png",
        "1030": "src/ImagesOrLogos/foggy.png",
        "1135": "src/ImagesOrLogos/foggy.png",
        "1063": "src/ImagesOrLogos/rainy_light.png",
        "1273": "src/ImagesOrLogos/rainy_light.png",
        "1189": "src/ImagesOrLogos/rainy_light.png",
        "1240": "src/ImagesOrLogos/rainy_light.png",
        "1150": "src/ImagesOrLogos/rainy_light.png",
        "1183": "src/ImagesOrLogos/rainy_light.png",
        "1243": "src/ImagesOrLogos/rainy_light.png",
        "1195": "src/ImagesOrLogos/rainy_light.png",
        "1087": "src/ImagesOrLogos/thunderstorm.png",
        "1276": "src/ImagesOrLogos/thunderstorm.png",
        "1114": "src/ImagesOrLogos/snowing.png",
        "1225": "src/ImagesOrLogos/snowing.png"
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