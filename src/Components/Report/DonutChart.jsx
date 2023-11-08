import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import { useGetWeeklySaleReportQuery } from "../../Feature/API/reportSaleApi";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
ChartJS.register(...registerables);

const DonutChart = () => {
  const token = Cookies.get("token");
  const {dataType} = useSelector((state) => state.reportSaleSlice);

  const weeklyData = useGetWeeklySaleReportQuery({token,type:dataType});
  const brandSales = weeklyData?.data?.brand_sales;
  // console.log(brandSales);
  const brandPercentage = brandSales?.map((value) => {
    return parseFloat(value?.percentage.replace("%", ""));
  });
  // console.log(brandPercentage);
  const brandName = brandSales?.map((item) => {
    const maxLength = 3; // Set the maximum length for labels
    const truncatedName =
      item?.brand_name.length > maxLength
        ? item?.brand_name.substring(0, maxLength) 
        : item?.brand_name.capitalize();
    return truncatedName;
  });
  // console.log(brandName);

  let data = null; 

  if (brandName && brandName.length > 0) {
    data = {
      labels: [...brandName],
      datasets: [
        {
          data: [...brandPercentage], // Example data
          backgroundColor: [
            "#8AB4B8",
            "#6A88b8",
            "#36A2EB",
            "#e8eaed",
            "#404d64",
          ],
          borderColor: "rgba(0, 0, 0, 0)", // Set the border color to transparent
          borderWidth: 0,
        },
      ],
    };
  }

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          const dataset = data.datasets[tooltipItem.datasetIndex];
          const total = dataset.data.reduce(
            (previousValue, currentValue) => previousValue + currentValue
          );
          const currentValue = dataset.data[tooltipItem.index];
          const percentage = ((currentValue / total) * 100).toFixed(2) + "%";
          return `${
            data.labels[tooltipItem.index]
          }: ${currentValue} (${percentage})`;
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          usePointStyle: true,
          fontSize: 14,
          fontColor: "black",
        },
      },
    },
  };

  // Conditionally render the chart if brandName is available
  return (
    <div
      className="py-3 mx-auto"
      style={{
        width: brandName && brandName.length > 0 ? "280px" : "auto",
        height: brandName && brandName.length > 0 ? "280px" : "auto",
      }}
    >
      {brandName && brandName.length > 0 ? (
        <Doughnut data={data} options={options} />
      ) : (
        <div className=" text-center my-16">{weeklyData?.data?.message}</div>
      )}
    </div>
  );
};

export default DonutChart;
