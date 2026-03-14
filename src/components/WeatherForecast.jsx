import React, { useEffect, useState } from "react";
import { fetchWeatherDetails } from "@/fetchDetails";
import WeatherUI from "@/components/weatherdisplayUi";
import { useOutletContext } from "react-router-dom";
import BottomUi from "@/components/bottomUI";
import { WeatherCardSkeleton, ChartSkeleton } from "@/components/Skeletons";
export default function WeatherForecast({ day }) {
    let [isLoading, setLoadingStatus] = useState(true)
    const { selectedLocation, tempUnit } = useOutletContext();
    const [weatherDetails, setWeatherDetails] = useState(undefined);
    const date = {
        "today": new Date(),
        "tomorrow": new Date(new Date().setDate(new Date().getDate() + 1)),
        "dayAfterTomorrow": new Date(new Date().setDate(new Date().getDate() + 2))
    }
    const loadWeather = async () => {
        try {
            setLoadingStatus(true)
            const res = await fetchWeatherDetails(
                selectedLocation.lat,
                selectedLocation.lon,
                date[day],
                tempUnit
            );
            setWeatherDetails(res);
        } catch (error) {
            console.log(error)
        } finally {
            setTimeout(() => setLoadingStatus(false), 1000)
        }
    };

    useEffect(() => {
        if (!selectedLocation) return;
        loadWeather();
    }, [selectedLocation, tempUnit])

    return (
        <>
            <div className="pt-3 d-flex justify-content-center">
                {
                    isLoading ?
                        <WeatherCardSkeleton />
                        :
                        <WeatherUI weatherDetails={weatherDetails[day]?.core} locationDetails={selectedLocation} selectedDate={date[day]} />

                }
            </div>
            <div className="pt-5 ps-3">
                {
                    isLoading ?
                        <ChartSkeleton />
                        :
                        <BottomUi hourlyData={weatherDetails[day]?.hourly} tempUnit={weatherDetails[day]?.core?.temperatureUnit} />
                }
            </div>
        </>
    )
}