"use client";

import { auth } from "@/app/components/helpers/config";
import { useEffect, useState } from "react";
import { useUser } from "@/app/components/config/user-context";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import toast, { Toaster } from "react-hot-toast";
import Spinner from "@/app/components/common/spinner";
import { updateUserByEmail } from "@/app/api/network/user";

type FormData = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

function Page() {
  const { user, updateUser, refetchMe } = useUser();
  const [saveLabel, setSaveLabel] = useState<any>("Save");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isEditing, setIsEditing] = useState({
    name: false,
    phone: false,
    address: false,
  });

  const [formData, setFormData] = useState<FormData>({
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

  const handleEditClick = (field: keyof FormData) => {
    setIsEditing({ ...isEditing, [field]: true });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePhoneChange = (value: string | undefined) => {
    setFormData((prevData) => ({
      ...prevData,
      phone: value || "",
    }));
  };

  const handleSave = async () => {
    setSaveLabel(<Spinner />);
    setIsEditing({
      name: false,
      phone: false,
      address: false,
    });

    try {
      const updatedUser = await updateUserByEmail(formData);
      console.log("Updated User:", updatedUser);

      if (updatedUser && updatedUser.email === formData.email) {
        updateUser({
          ...user,
          userInfo: updatedUser,
          displayName: user?.displayName ?? null,
          email: user?.email ?? null,
          refreshToken: user?.refreshToken ?? "",
          uid: user?.uid ?? "",
        });
        toast.success("Successfully updated!");
        refetchMe();
      } else {
        console.warn("Unexpected response data:", updatedUser);
        throw new Error("Update failed or returned unexpected data");
      }
    } catch (error) {
      console.error("Failed to update user:", error);
      toast.success("Successfully updated!");
    } finally {
      setSaveLabel("Save");
    }
  };

  const getButtonLabel = (field: keyof FormData) => {
    return formData[field] ? "Edit" : "Add";
  };

  if (!user?.userInfo) {
    return <Spinner type="secondary" />;
  }

  return (
    <div className="flex flex-col gap-5 p-4 md:p-6 lg:p-8">
      <Toaster />
      <div className="text-[24px] font-semibold text-primary-dark">
        User Details
      </div>
      {/* Name */}
      <div className="w-full lg:w-[950px] h-auto md:h-[103px] flex flex-col md:flex-row items-center bg-[#D2EAE7] rounded-[16px] shadow hover:shadow-lg">
        <div className="w-full p-5 flex gap-4 items-center">
          <div className="hidden lg:flex items-center justify-center text-[24px] text-white !w-[50px] !h-[44.234px] bg-primary-dark rounded-full leading-none">
            {auth.currentUser?.email?.charAt(0).toUpperCase()}
          </div>
          <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <div className="font-semibold text-primary-dark">Name</div>
              {isEditing.name ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-[250px] mt-2 border-[2px] border-primary-dark rounded px-2 py-1"
                />
              ) : (
                <div className="text-gray">{formData.name}</div>
              )}
            </div>
            <div
              className="mt-3 md:mt-0 flex items-center font-semibold cursor-pointer text-primary-dark"
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
              <div className="font-semibold text-primary-dark">Email</div>
              <div className="flex items-center gap-3">
                <div className="text-gray">{formData.email}</div>
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
              <div className="font-semibold text-primary-dark">
                Phone number
              </div>
              {isEditing.phone ? (
                <PhoneInput
                  defaultCountry="PH"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  className="w-[250px] mt-2 border-[2px] border-primary-dark rounded px-2 py-1"
                />
              ) : (
                <div className="text-gray">{formData.phone}</div>
              )}
            </div>
            <div
              className="mt-3 md:mt-0 flex items-center font-semibold cursor-pointer text-secondary"
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
              <div className="font-semibold text-primary-dark">Address</div>
              {isEditing.address ? (
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-[350px] lg:w-[450px] mt-2 border-[2px] border-primary-dark rounded px-2 py-1"
                />
              ) : (
                <div className="text-gray">{formData.address}</div>
              )}
            </div>
            <div
              className="mt-3 md:mt-0 flex items-center font-semibold cursor-pointer text-secondary"
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
