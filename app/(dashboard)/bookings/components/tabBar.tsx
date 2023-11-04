"use client";

import { ChevronRightIcon } from "lucide-react";
import React from "react";

interface TabBarProps {
  activeTab: string;
}

const TabBar: React.FC<TabBarProps> = ({ activeTab }) => {
  const tabs = [
    "Check Availability",
    "Customer",
    "Set Rates",
    "Services",
    "Summary",
  ];

  return (
    <div className="bg-white rounded-xl shadow-md flex flex-row items-center w-full justify-around border-b p-8">
      {tabs.map((tab, index) => (
        <React.Fragment key={index}>
          {/* Render the tab button */}
          <div
            className={`text-center py-3 px-4 text-lg font-medium ${
              activeTab === tab
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500"
            } focus:outline-none`}
            style={{ userSelect: "none", height: "3rem" }} // Increased height for tabs
          >
            {tab}
          </div>

          {/* Render the chevron if it's not the last item */}
          {index < tabs.length - 1 && (
            <ChevronRightIcon className="w-6 h-6 text-gray-400" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default TabBar;
