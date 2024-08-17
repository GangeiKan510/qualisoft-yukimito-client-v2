import InstantBookingForm from "./components/forms/instant-booking-form";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="mt-10">
        <div className="w-[90%] flex flex-col lg:flex-row h-auto lg:h-[577px] bg-primary mx-auto rounded-[16px] shadow-lg">
          <div className="w-full lg:w-[50%] p-6 lg:p-10">
            <div className="text-[32px] sm:text-[48px] lg:text-[64px] text-white leading-tight lg:leading-none mb-6 lg:mb-10 font-bold">
              Give your pet a dream vacation!
            </div>
            <div className="text-[16px] sm:text-[18px] lg:text-[22px] text-white mb-6 lg:mb-10">
              Our pet hotel is the ideal place to stay for your furry friend!
              We&apos;ll make sure their vacation will be just as great as
              yours!
            </div>
            <Image
              width={40}
              height={40}
              src="/svg/logo-light.svg"
              alt="logo-img"
            />
          </div>
          <div className="w-full lg:w-[50%] p-6 lg:p-10">
            <InstantBookingForm />
          </div>
        </div>
      </div>
    </>
  );
}
