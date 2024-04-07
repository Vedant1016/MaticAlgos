import { createChart } from "lightweight-charts";
import React, { useEffect, useRef, useState } from "react";

const Chart = ({ data }) => {
  const chartContainerRef = useRef();

  
  useEffect(() => {
    if (chartContainerRef.current) {
      const chartOptions = {
        layout: {
          background: { type: "solid", color: "transparent" },
        },
        leftPriceScale: {
          visible: true,
          scaleMargins: {
            top: 0.1,
            bottom: 0.1,
          },
        },
        rightPriceScale: {
          visible: false,
        },
        width: 700,
        height: 300,
      };
      console.log("Data:",data)
      const chart = createChart(chartContainerRef.current, chartOptions);

      const newSeries = chart.addAreaSeries({
        lineColor: "lightgrey",
        topColor: "white",
      });


      const periods = [
        { startDate: "2024-01-08", endDate: "2024-01-11" },
        { startDate: "2024-01-11", endDate: "2024-01-17" },
        { startDate: "2024-01-31", endDate: "2024-02-08" },
        { startDate: "2024-02-14", endDate: "2024-02-16" },
        { startDate: "2024-02-21", endDate: "2024-02-28" },
        { startDate: "2024-02-28", endDate: "2024-03-14" },
      ];

      const chartData = data.map((item) => {
        // Check if time falls within any of the defined periods
        const isInPeriod = periods.some((period) => {
          return item.date >= period.startDate && item.date <= period.endDate;
        });
      
        if (isInPeriod) {
          return { time: item.date, value: item.cumsum,  lineColor: "#ff0400",  topColor: "#f36361", bottomColor: "rgba(255, 41, 41, 0.052)",
        };
        } else {
          return { time: item.date, value: item.cumsum , bottomColor: "white"};
        }
      });

      newSeries.setData(chartData);


      const watermark = document.createElement("div");
      watermark.style.position = "absolute";
      watermark.style.zIndex = "1";
      watermark.style.top = "80%";
      watermark.style.left = "100%";
      watermark.style.transform = "translate(-50%, -50%)";
      watermark.style.width = "200px";
      watermark.style.height = "100px";
      watermark.style.backgroundImage = `url("/logo_white.png")`;
      watermark.style.backgroundRepeat = "no-repeat";
      watermark.style.backgroundSize = "contain";
      watermark.style.opacity = "0.3";
      chartContainerRef.current.style.position = "relative";
      chartContainerRef.current.appendChild(watermark);

      return () => {
        chart.remove();
      };
    }
  }, [data]);

  return <div ref={chartContainerRef}></div>;
};

export default Chart;