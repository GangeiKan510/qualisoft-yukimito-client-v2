"use client";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast, { Toaster } from "react-hot-toast";

function Page() {
  const [activeTab, setActiveTab] = useState(1);
  const [service, setService] = useState("Home Care");
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [numberOfPets, setNumberOfPets] = useState("1");

  const today = new Date();
  const minTime =
    checkInDate && checkInDate.toDateString() === today.toDateString()
      ? new Date(today.setHours(7, 30))
      : new Date(0, 0, 0, 7, 30); // 7:30 AM
  const maxTime = new Date(0, 0, 0, 19, 0); // 7:00 PM

  const handleNext = () => {
    if (activeTab === 1 && !service) {
      toast.error("Please select a service.");
      return;
    }
    if (activeTab === 2 && !checkInDate) {
      toast.error("Please select a check-in date.");
      return;
    }
    setActiveTab(activeTab + 1);
  };

  const handlePrevious = () => {
    setActiveTab(activeTab - 1);
  };

  return (
    <div className="flex flex-col gap-3 items-center justify-center h-full min-h-[80vh] p-4">
      <div className="flex gap-5">
        <div
          className={`${
            activeTab === 1 ? "text-primary-dark font-bold" : "text-gray"
          } cursor-pointer`}
          onClick={() => setActiveTab(1)}
        >
          1
        </div>
        <div
          className={`${
            activeTab === 2 ? "text-primary-dark font-bold" : "text-gray"
          } cursor-pointer`}
          onClick={() => setActiveTab(2)}
        >
          2
        </div>
        <div
          className={`${
            activeTab === 3 ? "text-primary-dark font-bold" : "text-gray"
          } cursor-pointer`}
          onClick={() => setActiveTab(3)}
        >
          3
        </div>
      </div>
      <div className="w-full max-w-[70%] h-auto lg:h-[700px] shadow-lg rounded-[16px] bg-white relative">
        <Toaster />
        <div className="p-6 lg:p-8">
          <div className="text-[20px] sm:text-[24px] text-center text-primary-dark font-bold">
            Book your pet&apos;s stay!
          </div>
          <div className="text-[12px] text-primary-dark pb-5 border-b border-gray border-opacity-25 text-center">
            We&apos;ll prepare an all-in dream vacation for your best friend.
          </div>
          <div className="my-5 flex flex-col gap-5">
            {activeTab === 1 && (
              <div className="flex flex-col gap-5">
                <div className="flex flex-col lg:flex-row justify-between gap-4">
                  <div className="w-full">
                    <div className="mb-1 text-primary-dark font-semibold">
                      Pet Owner Name <span className="text-red">*</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Enter Your Name"
                      className="w-full text-primary-dark h-[40px] border border-primary-dark ps-2 rounded-[8px]"
                    />
                  </div>
                  <div className="w-full">
                    <div className="mb-1 text-primary-dark font-semibold">
                      Email Address <span className="text-red">*</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Enter Your Email"
                      className="w-full text-primary-dark h-[40px] border border-primary-dark ps-2 rounded-[8px]"
                    />
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row justify-between gap-4">
                  <div className="w-full">
                    <div className="mb-1 text-primary-dark font-semibold">
                      Home Address <span className="text-red">*</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Enter Your Address"
                      className="w-full text-primary-dark h-[40px] border border-primary-dark ps-2 rounded-[8px]"
                    />
                  </div>
                  <div className="w-full">
                    <div className="mb-1 text-primary-dark font-semibold">
                      Phone Number <span className="text-red">*</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Enter Your Phone Number"
                      className="w-full text-primary-dark h-[40px] border border-primary-dark ps-2 rounded-[8px]"
                    />
                  </div>
                </div>
              </div>
            )}
            {activeTab === 2 && (
              <div className="flex flex-col lg:flex-row justify-between gap-4">
                <div className="w-full">
                  <div className="mb-1 text-primary-dark font-semibold">
                    Select a Service <span className="text-red">*</span>
                  </div>
                  <select
                    name="service"
                    id="service"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full text-secondary-dark h-[40px] border border-primary-dark text-primary-dark ps-2 rounded-[8px]"
                  >
                    <option value="Home Care">Home Care</option>
                    <option value="Errand Care">Errand Care</option>
                    <option value="Day Care">Day Care</option>
                  </select>
                </div>
                <div className="w-full">
                  <div className="mb-1 text-primary-dark font-semibold">
                    Check In Time <span className="text-red">*</span>
                  </div>
                  <DatePicker
                    selected={checkInDate}
                    onChange={(date) => setCheckInDate(date)}
                    showTimeSelect
                    minDate={new Date()} // Disable past dates
                    minTime={minTime} // Earliest time selectable
                    maxTime={maxTime} // Latest time selectable
                    dateFormat="Pp"
                    placeholderText="Select a Check-in Time"
                    className="w-full text-primary-dark h-[40px] border border-primary-dark ps-2 rounded-[8px]"
                  />
                </div>
              </div>
            )}
            {activeTab === 3 && (
              <div className="flex flex-col lg:flex-row justify-between gap-4">
                <div className="w-full">
                  <div className="mb-1 text-primary-dark font-semibold">
                    Number of Pets
                  </div>
                  <select
                    name="numberOfPets"
                    id="numberOfPets"
                    value={numberOfPets}
                    onChange={(e) => setNumberOfPets(e.target.value)}
                    className="w-full text-primary-dark h-[40px] border border-primary-dark ps-2 rounded-[8px]"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div>
                <div className="w-full">
                  <div className="flex justify-between text-primary-dark font-bold pb-2 border-b mb-2 border-gray">
                    1st Pet&apos;s Details
                    <div className="flex gap-3">
                      <span>{"<"}</span>
                      <span>{">"}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div>
                      <div className="mb-1 text-primary-dark font-semibold">
                        Name <span className="text-red">*</span>
                      </div>
                      <input
                        type="text"
                        placeholder="Enter Your Pet's Name"
                        className="w-full text-primary-dark h-[40px] border border-primary-dark ps-2 rounded-[8px]"
                      />
                    </div>
                    <div>
                      <div className="mb-1 text-primary-dark font-semibold">
                        Breed <span className="text-red">*</span>
                      </div>
                      <input
                        type="text"
                        placeholder="Enter Your Pet's Breed"
                        className="w-full text-primary-dark h-[40px] border border-primary-dark ps-2 rounded-[8px]"
                      />
                    </div>
                    <div>
                      <div className="mb-1 text-primary-dark font-semibold">
                        Size <span className="text-red">*</span>
                      </div>
                      <input
                        type="text"
                        placeholder="Enter Your Pet's Size"
                        className="w-full text-primary-dark h-[40px] border border-primary-dark ps-2 rounded-[8px]"
                      />
                    </div>
                    <div>
                      <div className="mb-1 text-primary-dark font-semibold">
                        Birth Date <span className="text-red">*</span>
                      </div>
                      <input
                        type="text"
                        placeholder="Enter Your Pet's Birth Date"
                        className="w-full text-primary-dark h-[40px] border border-primary-dark ps-2 rounded-[8px]"
                      />
                    </div>
                    <div>
                      <div className="mb-1 text-primary-dark font-semibold">
                        Vaccination Photo <span className="text-red">*</span>
                      </div>
                      <input
                        type="text"
                        placeholder="Enter Vaccination Photo URL"
                        className="w-full text-primary-dark h-[40px] border border-primary-dark ps-2 rounded-[8px]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
          <div className="flex justify-center">
            <div className="flex gap-5">
              {activeTab > 1 && (
                <div
                  onClick={handlePrevious}
                  className="flex items-center justify-center h-[40px] px-5 border border-primary-dark text-primary-dark rounded-full cursor-pointer font-semibold"
                >
                  Previous
                </div>
              )}
              {activeTab < 3 && (
                <div
                  onClick={handleNext}
                  className="flex items-center justify-center h-[40px] px-5 border border-primary-dark bg-primary-dark text-white rounded-full cursor-pointer font-semibold"
                >
                  Next
                </div>
              )}
              {activeTab === 3 && (
                <div
                  onClick={() => toast.success("Form submitted!")}
                  className="flex items-center justify-center h-[40px] px-5 border border-primary-dark bg-primary-dark text-white rounded-full cursor-pointer font-semibold ml-auto"
                >
                  Submit
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
