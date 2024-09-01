"use client";

import React, { useState } from "react";
import Image from "next/image";

interface SortDropdownProps {
  options: string[];
  onSortChange: (criteria: string) => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({
  options,
  onSortChange,
}) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  return (
    <div className="relative">
      <div
        className="flex gap-1 text-primary-dark cursor-pointer"
        onClick={() => setDropdownVisible(!isDropdownVisible)}
      >
        <Image
          width={24}
          height={24}
          src="/svg/filter-icon.svg"
          alt="preview-icon"
          className="max-w-full h-auto rounded-lg cursor-pointer"
        />
        Sort
      </div>

      {isDropdownVisible && (
        <div className="absolute mt-2 w-48 text-primary-dark bg-white border border-primary-dark rounded shadow-md z-10">
          <ul>
            {options.map((option) => (
              <li
                key={option}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100 hover:bg-primary-dark hover:text-white"
                onClick={() => {
                  onSortChange(option);
                  setDropdownVisible(false); // Hide dropdown after selecting an option
                }}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
