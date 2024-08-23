"use client";

import { auth } from "@/app/components/helpers/config";
import { useEffect, useState } from "react";

function Page() {
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  useEffect(() => {
    if (auth.currentUser) {
      setIsEmailVerified(auth.currentUser.emailVerified);
    }
  }, []);

  return (
    <div className="flex flex-col gap-5 p-4 md:p-6 lg:p-8">
      <div className="text-[24px] font-semibold text-primary-dark">
        Your Personal Information
      </div>

      {/* Name */}
      <div className="w-full lg:w-[950px] h-auto md:h-[103px] flex flex-col md:flex-row items-center bg-[#D2EAE7] rounded-[16px] shadow hover:shadow-lg">
        <div className="w-full p-5 flex gap-4 items-center">
          <div className="hidden lg:flex items-center justify-center text-white !w-[50px] !h-[50px] bg-primary-dark rounded-full leading-none">
            {auth.currentUser?.email?.charAt(0).toUpperCase()}
          </div>
          <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <div className="font-semibold">Name</div>
              <div>Sean Patrick Paguntalan Namo</div>
            </div>
            <div className="mt-3 md:mt-0 flex items-center font-semibold cursor-pointer">
              Edit
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
                <div>{auth.currentUser?.email}</div>
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
              <div>+639497097025</div>
            </div>
            <div className="mt-3 md:mt-0 flex items-center font-semibold cursor-pointer">
              Edit
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
              <div>{auth.currentUser?.email}</div>
            </div>
            <div className="mt-3 md:mt-0 flex items-center font-semibold cursor-pointer">
              Edit
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-[950px] h-auto md:h-[103px] flex items-center justify-end">
        <button className="h-[40px] border border-primary-dark bg-primary-dark text-white px-8 rounded-full flex items-center justify-center">
          Save
        </button>
      </div>

      {/* TODO: Change Password */}
    </div>
  );
}

export default Page;
