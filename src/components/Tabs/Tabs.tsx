import React, { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { tabTitles } from "./types";

const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number | null>(null);

  const handleTabClick = (index: number) => {
    setActiveTab(activeTab === index ? null : index); // Toggle the active tab
  };

  return (
    <div className="container mt-5">
      <div className="border-b border-gray-300 flex  overflow-x-auto ">
        {tabTitles.map((tab, index) => (
          <div
            key={index}
            className={`hover:bg-gray-200 m-3 whitespace-nowrap ${
              activeTab === index ? "font-bold" : ""
            }`}
            onClick={() => handleTabClick(index)}
          >
            <div className="m-2 flex hover:cursor-pointer">
              <div className="flex justify-center items-center">
                {activeTab === index ? (
                  <ArrowDropUpIcon />
                ) : (
                  <ArrowDropDownIcon />
                )}
              </div>
              <span>{tab.name}</span>
            </div>
          </div>
        ))}
      </div>
      {activeTab !== null && (
        <div className="p-4 border-t border-gray-300 w-full text-right">
          <textarea
            className="w-full p-2 resize-none text-right"
            value={tabTitles[activeTab].content}
            readOnly
          />
        </div>
      )}
    </div>
  );
};

export default Tabs;
