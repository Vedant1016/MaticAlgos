import { createChart } from "lightweight-charts";
import React, { useEffect, useRef } from "react";
import companyLogoFilePath from "../logo_MA.png"; // Correct import statement

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
        const isInPeriod = periods.some((period) => {
          return item.date >= period.startDate && item.date <= period.endDate;
        });

        if (isInPeriod) {
          return {
            time: item.date,
            value: item.cumsum,
            lineColor: "#ff0400",
            topColor: "#f36361",
            bottomColor: "rgba(255, 41, 41, 0.052)",
          };
        } else {
          return { time: item.date, value: item.cumsum, bottomColor: "white" };
        }
      });

      newSeries.setData(chartData);

      const logoElement = document.createElement("img");
      logoElement.src = companyLogoFilePath; // Use the imported file path directly
      logoElement.alt = "Company Logo";
      logoElement.style.position = "absolute";
      logoElement.style.zIndex = "999"; // Decreased zIndex

      logoElement.style.zIndex = "2";
      logoElement.style.top = "42%";
      logoElement.style.left = "40%";
      logoElement.style.width = "100px";
      logoElement.style.height = "50px";
      logoElement.style.opacity = "0.7"; // Adjust opacity as needed (0.7 means 70% opacity)

      chartContainerRef.current.appendChild(logoElement);

      return () => {
        chart.remove();
      };
    }
  }, [data]);

  return <div ref={chartContainerRef}></div>;
};

export default Chart;