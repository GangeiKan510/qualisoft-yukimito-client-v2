"use client";

import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast, { Toaster } from "react-hot-toast";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

function Page() {
  const [service, setService] = useState("Home Care");
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [numberOfPets, setNumberOfPets] = useState(1);
  const [activePetIndex, setActivePetIndex] = useState(0);
  const [petsDetails, setPetsDetails] = useState(
    Array(3).fill({
      name: "",
      breed: "",
      size: "",
      birth_date: "",
      vaccine_photo: null,
    }),
  );
  const [isFormValid, setIsFormValid] = useState<boolean | null | "">(false);
  const [value, setValue] = useState<any>();
  const [ownerName, setOwnerName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const isFormValid =
      ownerName &&
      email &&
      address &&
      value &&
      service &&
      checkInDate &&
      petsDetails.every(
        (pet) =>
          pet.name !== "" &&
          pet.breed !== "" &&
          pet.size !== "" &&
          pet.birth_date !== "" &&
          pet.vaccine_photo !== null,
      );
    setIsFormValid(isFormValid);
  }, [ownerName, email, address, value, service, checkInDate, petsDetails]);

  const today = new Date();
  const minTime =
    checkInDate && checkInDate.toDateString() === today.toDateString()
      ? new Date(today.setHours(7, 30))
      : new Date(0, 0, 0, 7, 30); // 7:30 AM
  const maxTime = new Date(0, 0, 0, 19, 0); // 7:00 PM

  const handlePetDetailChange = (index: number, field: string, value: any) => {
    const updatedPets = [...petsDetails];
    updatedPets[index] = { ...updatedPets[index], [field]: value };
    setPetsDetails(updatedPets);
  };

  const handlePetNavigation = (direction: string) => {
    if (direction === "prev" && activePetIndex > 0) {
      setActivePetIndex(activePetIndex - 1);
    } else if (direction === "next" && activePetIndex < numberOfPets - 1) {
      setActivePetIndex(activePetIndex + 1);
    }
  };

  const handleSubmit = () => {
    if (!ownerName) {
      toast.error("Please enter your name.");
      return;
    }
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }
    if (!address) {
      toast.error("Please enter your home address.");
      return;
    }
    if (!value) {
      toast.error("Please enter your phone number.");
      return;
    }
    if (!service) {
      toast.error("Please select a service.");
      return;
    }
    if (!checkInDate) {
      toast.error("Please select a check-in date and time.");
      return;
    }
    for (let i = 0; i < petsDetails.length; i++) {
      const pet = petsDetails[i];
      if (!pet.name) {
        toast.error(`Please enter the name for pet ${i + 1}.`);
        return;
      }
      if (!pet.breed) {
        toast.error(`Please enter the breed for pet ${i + 1}.`);
        return;
      }
      if (!pet.size) {
        toast.error(`Please enter the size for pet ${i + 1}.`);
        return;
      }
      if (!pet.birth_date) {
        toast.error(`Please enter the birth date for pet ${i + 1}.`);
        return;
      }
      if (!pet.vaccine_photo) {
        toast.error(`Please upload the vaccination photo for pet ${i + 1}.`);
        return;
      }
    }

    if (isFormValid) {
      toast.success("Form submitted!");
    } else {
      toast.error("Please fill in all required fields.");
    }
  };

  return (
    <div className="flex flex-col gap-3 items-center justify-center h-full min-h-[80vh] px-4 pb-4">
      <div className="w-full max-w-[90%] lg:max-w-[70%] h-auto shadow-lg rounded-[16px] bg-white relative">
        <Toaster />
        <div className="p-6 lg:px-6 h-auto">
          <div className="text-[20px] sm:text-[24px] text-center text-primary-dark font-bold">
            Book your pet&apos;s stay!
          </div>
          <div className="text-[12px] text-primary-dark pb-5 border-b border-gray border-opacity-25 text-center">
            We&apos;ll prepare an all-in dream vacation for your best friend.
          </div>

          {/* Personal Details Section */}
          <div className="my-5 flex flex-col gap-5">
            <div className="text-[24px] text-center lg:text-start font-bold text-primary-dark">
              Personal Details
            </div>
            <div className="flex flex-col lg:flex-row justify-between gap-4">
              <div className="w-full">
                <div className="mb-1 text-primary-dark font-semibold">
                  Pet Owner Name <span className="text-red">*</span>
                </div>
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full text-primary-dark h-[40px] border border-primary-dark ps-2 rounded-[8px]"
                />
              </div>
              <div className="w-full">
                <div className="mb-1 text-primary-dark font-semibold">
                  Phone Number <span className="text-red">*</span>
                </div>
                <PhoneInput
                  defaultCountry="PH"
                  placeholder="Enter phone number"
                  value={value}
                  onChange={setValue}
                  className="w-full text-primary-dark h-[40px] border border-primary-dark ps-2 rounded-[8px]"
                />
              </div>
            </div>
          </div>

          {/* Service and Check-In Details Section */}
          <div className="my-5 flex flex-col gap-5">
            <div className="text-[24px] text-center lg:text-start font-bold text-primary-dark">
              Service and Check-In | Out Date and Time
            </div>
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
                <div className="text-primary-dark font-semibold mb-1">
                  Check In Time <span className="text-red">*</span>
                </div>
                <DatePicker
                  wrapperClassName="w-full"
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
          </div>

          {/* Pet Details Section */}
          <div className="my-5 flex flex-col gap-5">
            <div className="text-[24px] text-center lg:text-start font-bold text-primary-dark">
              Pet Details
            </div>
            <div className="flex flex-col lg:flex-row justify-between gap-4">
              <div className="w-full">
                <div className="mb-1 text-primary-dark font-semibold">
                  Number of Pets
                </div>
                <select
                  name="numberOfPets"
                  id="numberOfPets"
                  value={numberOfPets}
                  onChange={(e) => setNumberOfPets(parseInt(e.target.value))}
                  className="w-full text-primary-dark h-[40px] border border-primary-dark ps-2 rounded-[8px]"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
            </div>
            <div className="w-full">
              <div className="flex justify-between text-primary-dark font-bold pb-2 border-b mb-2 border-gray">
                Pet number {activePetIndex + 1}&apos;s Details
                <div className="flex gap-3">
                  <span
                    onClick={() => handlePetNavigation("prev")}
                    className={`cursor-pointer ${
                      activePetIndex === 0 ? "text-gray-300" : ""
                    }`}
                  >
                    {"<"}
                  </span>
                  <span
                    onClick={() => handlePetNavigation("next")}
                    className={`cursor-pointer ${
                      activePetIndex === numberOfPets - 1 ? "text-gray-300" : ""
                    }`}
                  >
                    {">"}
                  </span>
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
                    value={petsDetails[activePetIndex].name}
                    onChange={(e) =>
                      handlePetDetailChange(
                        activePetIndex,
                        "name",
                        e.target.value,
                      )
                    }
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
                    value={petsDetails[activePetIndex].breed}
                    onChange={(e) =>
                      handlePetDetailChange(
                        activePetIndex,
                        "breed",
                        e.target.value,
                      )
                    }
                    className="w-full text-primary-dark h-[40px] border border-primary-dark ps-2 rounded-[8px]"
                  />
                </div>
                <div>
                  <div className="mb-1 text-primary-dark font-semibold">
                    Size <span className="text-red">*</span>
                  </div>
                  <select
                    name="numberOfPets"
                    id="numberOfPets"
                    value={numberOfPets}
                    onChange={(e) => setNumberOfPets(parseInt(e.target.value))}
                    className="w-full text-primary-dark h-[40px] border border-primary-dark ps-2 rounded-[8px]"
                  >
                    <option value="1">Small</option>
                    <option value="2">Medium</option>
                    <option value="3">Large</option>
                  </select>
                </div>
                <div>
                  <div className="mb-1 text-primary-dark font-semibold">
                    Birth Date <span className="text-red">*</span>
                  </div>
                  <DatePicker
                    wrapperClassName="w-full"
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
                <div>
                  <div className="mb-1 text-primary-dark font-semibold">
                    Vaccination Photo <span className="text-red">*</span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handlePetDetailChange(
                        activePetIndex,
                        "vaccine_photo",
                        e.target.files ? e.target.files[0] : null,
                      )
                    }
                    className="w-full text-primary-dark h-[40px] rounded-[8px] file:border-0 file:bg-primary-light file:rounded-[8px]"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button
              onClick={handleSubmit}
              disabled={!isFormValid}
              className={`flex items-center justify-center h-[40px] px-5 border border-primary-dark bg-primary-dark text-white rounded-full cursor-pointer font-semibold ${
                !isFormValid ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Submit Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
