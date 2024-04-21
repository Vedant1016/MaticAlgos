import { createChart } from "lightweight-charts";
import React, { useEffect, useRef } from "react";
import companyLogoFilePath from "../logo_MA.png"; // Correct import statement
import { formControlClasses } from "@mui/material";

const Chart = ({ data }) => {
  const chartContainerRef = useRef();
  console.log("data:", data);

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

      chart.applyOptions({
        // Apply chart options like crosshair, grid lines, etc.
        // Your chart configuration code goes here...
        crosshair: {
          // hide the horizontal crosshair line
          horzLine: {
            visible: true,
            labelVisible: true,
          },
          // hide the vertical crosshair label
          vertLine: {
            labelVisible: true,
          },
        },
      });

      const newSeries = chart.addAreaSeries({
        lineColor: "lightgrey",
        topColor: "white",
      });

      const periods = [
        { startDate: "2024-01-08", endDate: "2024-01-11" },
        { startDate: "2024-01-11", endDate: "2024-01-16" },
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

      //-------------------------- tooltip logic starts here -------------------------//
      const container = chartContainerRef.current;
      const tooltipWidth = 150;
      const tooltipHeight = 80;
      const tooltipMargin = 15;

      const tooltip = document.createElement("div");
      tooltip.className = "custom-tooltip";
      tooltip.style.width = `${tooltipWidth}px`;
      tooltip.style.height = `${tooltipHeight}px`;
      tooltip.style.position = "absolute";
      tooltip.style.display = "none";
      tooltip.style.background = "white";
      tooltip.style.border = "2px solid red";
      tooltip.style.padding = "8px";
      tooltip.style.fontSize = "16px";
      tooltip.style.zIndex = "1000";
      tooltip.style.pointerEvents = 'none';

      container.appendChild(tooltip);

      // Tooltip Updation code
      chart.subscribeCrosshairMove((param) => {
        if (
          param.point === undefined ||
          !param.time ||
          param.point.x < 0 ||
          param.point.x > container.clientWidth ||
          param.point.y < 0 ||
          param.point.y > container.clientHeight
        ) {
          tooltip.style.display = "none";
        } else {
          const dateStr = param.time;
          tooltip.style.display = "block";
          const data = param.seriesData.get(newSeries);
          const price = data.value !== undefined ? data.value : data.close;
          tooltip.innerHTML = `<div style="color: ${"#2962FF"}">Matics Algos Inc.</div><div style="font-size: 24px; margin: 4px 0px; color: ${"black"}">
                ${Math.round(100 * price) / 100}
                </div><div style="color: ${"black"}">
                ${dateStr}
                </div>`;

          const coordinate = newSeries.priceToCoordinate(price);
          let shiftedCoordinate = param.point.x - 50;
          if (coordinate === null) {
            return;
          }
          shiftedCoordinate = Math.max(
            0,
            Math.min(container.clientWidth - tooltipWidth, shiftedCoordinate)
          );
          const tooltipPosition = coordinate - tooltipHeight - tooltipMargin;
          const coordinateY =
            tooltipPosition > 0
              ? tooltipPosition
              : Math.max(0, coordinate + tooltipMargin);
          tooltip.style.left = shiftedCoordinate + "px";
          tooltip.style.top = coordinateY + "px";
        }
      });

      chart.timeScale().fitContent();
      // -------------------------- tooltip logic Ends here ----------------------------- //

      // ----------------------- LOGO --------------------//
      const logoElement = document.createElement("img");
      logoElement.src = companyLogoFilePath;
      logoElement.alt = "Company Logo";
      logoElement.style.position = "absolute";
      logoElement.style.zIndex = "1";
      logoElement.style.top = "66%";
      logoElement.style.left = "83%";
      logoElement.style.width = "100px";
      logoElement.style.height = "50px";
      logoElement.style.opacity = "0.7";
      chartContainerRef.current.appendChild(logoElement);
      // ----------------------- LOGO --------------------//

      return () => {
        chart.remove();
      };
    }
  }, [data]);

  return <div ref={chartContainerRef} style={{ position: "relative" }}></div>;
};

export default Chart;