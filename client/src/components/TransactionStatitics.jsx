import { mongo } from "mongoose";
import React from "react";

const TransactionStatitics = ({
  totalSale,
  totalNotSoldItem,
  totalSoldItem,
  month,
  categoriesFreq,
}) => {
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
  const toCapitalCase = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };
  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-col gap-4 mx-10 mt-10 mb-5 ">
        <div>
          <h1 className="font-serif text-black">
            <span className="text-xl font-bold">
              Statistics -{" "}
              {month > -1 ? `${months[month]}${" "}` : `${months[2]}${" "}`}
            </span>
            <sup>
              {month < 0 ? (
                <span className="text-sm">
                  (March selected as default month from dropdown)
                </span>
              ) : (
                <span className="text-sm">
                  (Selected month name from dropdown)
                </span>
              )}
            </sup>
          </h1>
        </div>
        <div className="w-96 bg-yellow-400 py-5 px-3 rounded-lg font-serif font-semibold">
          <div className="flex flex-row gap-4 justify-between">
            <span>Total Sale</span>
            <span>{month < 0 ? 1840.93 : Number(totalSale).toFixed(2)}</span>
          </div>
          <div className="flex flex-row gap-4 justify-between">
            <span>Total sold item</span>
            <span>{month < 0 ? 1 : totalSoldItem}</span>
          </div>
          <div className="flex flex-row gap-4 justify-between">
            <span>Total not sold item</span>
            <span>{month < 0 ? 2 : totalNotSoldItem}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 pt-6 mx-10 mt-10 border-2 font-serif font-semibold w-96 rounded-lg px-4 py-4">
        <h1 className="text-lg">
          {month > -1 ? `${months[month]} Item Count` : "All Item Count"} &nbsp;
          <sup className="text-xs">
            {mongo > -1 ? "(Selected month from dropdowm)" : "All month"}
          </sup>
        </h1>
        {categoriesFreq.map((category) => {
          return (
            <div key={category.category} className="flex justify-between bg-orange-300 rounded-lg py-1 px-1">
              <span>{toCapitalCase(category.category)}</span>
              <span>
                {category.count}&nbsp;<span className="text-xs">(items)</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TransactionStatitics;
