import React from "react";

export function WeatherCardSkeleton() {
    return (
        <div className="card p-3 bg-transparent text-white border-0" style={{ width: '60%' }}>
            <div className="placeholder-glow">
                <span className="placeholder col-12 rounded-4" style={{ height: '250px' }}></span>
            </div>
        </div>
    )
}

export function ChartSkeleton() {
    return (
        <div className="p-3 text-white">
            <div className="placeholder-wave">
                <span className="placeholder col-12 rounded mb-2" style={{ height: "20px" }}></span>
                <span className="placeholder col-10 rounded mb-2" style={{ height: "20px" }}></span>
                <span className="placeholder col-8 rounded mb-2" style={{ height: "20px" }}></span>
                <span className="placeholder col-9 rounded mb-2" style={{ height: "20px" }}></span>
            </div>
        </div>
    )
}