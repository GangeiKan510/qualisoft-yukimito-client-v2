"use client";

import { auth } from "@/components/helpers/config";
import { useEffect, useState } from "react";
import { useUser } from "@/components/config/user-context";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import toast, { Toaster } from "react-hot-toast";
import Spinner from "@/components/common/spinner";
import { updateUserByEmail, deleteUserAccount } from "@/network/network/user";
import Image from "next/image";
import DeleteAccountModal from "@/components/modals/delete-account-modal-confirmation";
import { useRouter } from "next/navigation";
import { routes } from "@/utils/routes/routes";

type FormData = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

function Page() {
  const router = useRouter();
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

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [confirmationEmail, setConfirmationEmail] = useState("");

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

  const handleDeleteAccount = async () => {
    setDeleteLoading(true);
    try {
      if (confirmationEmail !== formData.email) {
        toast.error("Email confirmation does not match.");
        return;
      }

      await deleteUserAccount(user?.userInfo.id as string);
      toast.success("Account deleted successfully.");

      await auth.signOut();
      router.push(routes.login);
    } catch (error) {
      console.error("Failed to delete account:", error);
      toast.error("Failed to delete account.");
    } finally {
      setDeleteLoading(false);
      setIsDeleteModalOpen(false);
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
              <div className="flex gap-2 font-semibold text-primary-dark">
                <Image
                  width={24}
                  height={24}
                  src="/svg/email-icon.svg"
                  alt="preview-icon"
                  className="max-w-full h-auto rounded-lg"
                />
                Email
              </div>
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
              <div className="flex gap-2 font-semibold text-primary-dark mb-1">
                <Image
                  width={24}
                  height={24}
                  src="/svg/phone-icon.svg"
                  alt="preview-icon"
                  className="max-w-full h-auto rounded-lg"
                />
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
              <div className="flex gap-2 font-semibold text-primary-dark mb-1">
                <Image
                  width={24}
                  height={24}
                  src="/svg/location-icon.svg"
                  alt="preview-icon"
                  className="max-w-full h-auto rounded-lg"
                />
                Address
              </div>
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
      <div className="w-full lg:w-[950px] h-auto md:h-[103px] flex items-center justify-between">
        {/* <button
          onClick={() => setIsDeleteModalOpen(true)}
          className="h-[40px] border border-red bg-red text-white px-8 rounded-full flex items-center justify-center hover:bg-[#e44545]"
        >
          Delete Account
        </button> */}
        <button
          onClick={handleSave}
          className="h-[40px] border border-primary-dark bg-primary-dark text-white px-8 rounded-full flex items-center justify-center ml-auto"
        >
          {saveLabel}
        </button>
      </div>

      <DeleteAccountModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteAccount}
        loading={deleteLoading}
        email={formData.email}
        confirmationEmail={confirmationEmail}
        setConfirmationEmail={setConfirmationEmail}
      />
    </div>
  );
}

export default Page;
