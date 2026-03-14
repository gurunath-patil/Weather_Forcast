import React, { useEffect, useState } from "react";
import "./style.css"
import ReactApexChart from "react-apexcharts";
export default function BottomUi({ hourlyData, tempUnit }) {
    const [chartOptions, setChartOptions] = useState({
        series: [],
        options: {
            chart: {
                type: "area",
                toolbar: {
                    show: false
                },
                foreColor: "#F3F4F4",
                zoom: { enabled: false }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: "smooth",
                width: 2
            },
            colors: ["#FF8B5A"],
            fill: {
                type: "gradient",
                gradient: {
                    shadeIntensity: 1.2,
                    stops: [0, 90, 100]
                }
            },
            dataLabels: {
                enabled: false
            },
            xaxis: {
                type: "category",
                categories: [],
                labels: {
                    style: {
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                }
            },
            yaxis: {
                show: false
            },
            tooltip: {
                theme: "light",
                x: {
                    format: "HH:mm"
                },
                y: {
                    formatter: (val) => `${val}${tempUnit}`
                }
            },
            grid: {
                yaxis: {
                    lines: {
                        show: false
                    }
                },
                padding: {
                    left: 20,
                    right: 10
                }
            },
            markers: {
                size: 3,
                strokeWidth: 0
            },

            legend: {
                show: false
            }
        }
    })

    useEffect(() => {
        setChartOptions((prev) => ({
            ...prev,
            series: [{ name: 'Temperature', data: hourlyData?.series || [] }],
            options: {
                ...prev.options,
                xaxis: {
                    ...prev.options.xaxis,
                    categories: hourlyData?.category || []
                }
            }
        }));
    }, [hourlyData]);

    return (
        <>
            <ReactApexChart options={chartOptions.options} series={chartOptions.series} type={chartOptions.options.chart.type} width="100%" height="100%" />
        </>
    )
}