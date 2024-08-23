"use client";

import { auth } from "@/app/components/helpers/config";
import { useEffect, useState } from "react";
import { useUser } from "@/app/components/config/user-context";
import "react-phone-number-input/style.css";
import toast, { Toaster } from "react-hot-toast";
import Spinner from "@/app/components/common/spinner";

function Page() {
  const { user } = useUser();
  const [saveLabel, setSaveLabel] = useState<any>("Save");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isEditing, setIsEditing] = useState({
    name: false,
    phone: false,
    address: false,
  });
  const [formData, setFormData] = useState<any>({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (user?.userInfo) {
      setFormData({
        name: user.userInfo.name || "",
        email: user.userInfo.email || auth.currentUser?.email || "",
        phone: user.userInfo.phone || "",
        address: user.userInfo.address || "",
      });
    }

    if (auth.currentUser) {
      setIsEmailVerified(auth.currentUser.emailVerified);
    }
  }, [user]);

  const handleEditClick = (field: string) => {
    setIsEditing({ ...isEditing, [field]: true });
  };

  const handleInputChange = (e: { target: { name: string; value: any } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setSaveLabel(<Spinner />);
    setIsEditing({
      name: false,
      phone: false,
      address: false,
    });
    console.log(formData);
    setSaveLabel("Save");
    toast.success("Successfully updated!");

    // Add your save logic here (e.g., API call to update user details)
  };

  const getButtonLabel = (field: string) => {
    return formData[field] ? "Edit" : "Add";
  };

  if (!user?.userInfo) {
    return <Spinner type="secondary" />;
  }

  return (
    <div className="flex flex-col gap-5 p-4 md:p-6 lg:p-8">
      <Toaster />
      <div className="text-[24px] font-semibold text-primary-dark">
        Your Personal Information
      </div>
      {/* Name */}
      <div className="w-full lg:w-[950px] h-auto md:h-[103px] flex flex-col md:flex-row items-center bg-[#D2EAE7] rounded-[16px] shadow hover:shadow-lg">
        <div className="w-full p-5 flex gap-4 items-center">
          <div className="hidden lg:flex items-center justify-center text-[24px] text-white !w-[50px] !h-[50px] bg-primary-dark rounded-full leading-none">
            {auth.currentUser?.email?.charAt(0).toUpperCase()}
          </div>
          <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <div className="font-semibold">Name</div>
              {isEditing.name ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-[250px] mt-2 border-[2px] border-primary-dark rounded px-2 py-1"
                />
              ) : (
                <div>{formData.name}</div>
              )}
            </div>
            <div
              className="mt-3 md:mt-0 flex items-center font-semibold cursor-pointer"
              onClick={() => handleEditClick("name")}
            >
              {getButtonLabel("name")}
            </div>
          </div>
        </div>
      </div>
      {/* Email */}
      <div className="w-full lg:w-[950px] h-auto md:h-[103px] flex flex-col md:flex-row items-center bg-white rounded-[16px] shadow hover:shadow-lg">
        <div className="w-full p-5 flex gap-4 items-center">
          <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <div className="font-semibold">Email</div>
              <div className="flex items-center gap-3">
                <div>{formData.email}</div>
                <div>
                  {isEmailVerified ? (
                    <div className="bg-secondary text-white text-[12px] p-2 rounded-[8px]">
                      VERIFIED
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Phone Number */}
      <div className="w-full lg:w-[950px] h-auto md:h-[103px] flex flex-col md:flex-row items-center bg-white rounded-[16px] shadow hover:shadow-lg">
        <div className="w-full p-5 flex gap-4 items-center">
          <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <div className="font-semibold">Phone number</div>
              {isEditing.phone ? (
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-[250px] mt-2 border-[2px] border-primary-dark rounded px-2 py-1"
                />
              ) : (
                <div>{formData.phone}</div>
              )}
            </div>
            <div
              className="mt-3 md:mt-0 flex items-center font-semibold cursor-pointer"
              onClick={() => handleEditClick("phone")}
            >
              {getButtonLabel("phone")}
            </div>
          </div>
        </div>
      </div>
      {/* Address */}
      <div className="w-full lg:w-[950px] h-auto md:h-[103px] flex flex-col md:flex-row items-center bg-white rounded-[16px] shadow hover:shadow-lg">
        <div className="w-full p-5 flex gap-4 items-center">
          <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <div className="font-semibold">Address</div>
              {isEditing.address ? (
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-[250px] mt-2 border-[2px] border-primary-dark rounded px-2 py-1"
                />
              ) : (
                <div>{formData.address}</div>
              )}
            </div>
            <div
              className="mt-3 md:mt-0 flex items-center font-semibold cursor-pointer"
              onClick={() => handleEditClick("address")}
            >
              {getButtonLabel("address")}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-[950px] h-auto md:h-[103px] flex items-center justify-end">
        <button
          onClick={handleSave}
          className="h-[40px] border border-primary-dark bg-primary-dark text-white px-8 rounded-full flex items-center justify-center"
        >
          {saveLabel}
        </button>
      </div>
      {/* TODO: Change Password */}
    </div>
  );
}

export default Page;
