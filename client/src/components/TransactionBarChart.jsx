import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
const TransactionBarChart = ({ month, dataOfBarCharts}) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <div className="flex flex-col mx-auto my-8">
      <div className="text-black font-serif my-4">
        <span className="font-bold text-2xl">
          Bar Chart Stats - &nbsp;{month > -1 ? months[month] : " All Months"}
        </span>
        <sup>{month > -1 && " (Selected month name from dropdown)"}</sup>
      </div>
      <div>
        <BarChart
          width={1000}
          height={500}
          data={dataOfBarCharts}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis
            dataKey="range"
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="count" fill="#8884d8" background={{ fill: "#eee" }} />
        </BarChart>
      </div>
    </div>
  );
};

export default TransactionBarChart;
