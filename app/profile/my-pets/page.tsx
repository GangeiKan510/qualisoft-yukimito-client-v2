import React from "react";
import { Toaster } from "react-hot-toast";

function Page() {
  return (
    <div className="w-full flex flex-col gap-5 p-4 md:p-6 lg:p-8">
      <Toaster />
      <div className="w-full lg:w-[950px] flex justify-between">
        <div className="text-[24px] font-semibold text-primary-dark">
          Your Pets
        </div>
        <div>Add pet</div>
      </div>
    </div>
  );
}

export default Page;
