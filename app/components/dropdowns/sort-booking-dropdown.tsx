"use client";

import React, { useState, useEffect, useRef } from "react";
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
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="flex gap-1 text-primary-dark cursor-pointer"
        onClick={() => setDropdownVisible(!isDropdownVisible)}
      >
        <Image
          width={24}
          height={24}
          src="/svg/sort-icon.svg"
          alt="sort-icon"
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
                  setDropdownVisible(false);
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
