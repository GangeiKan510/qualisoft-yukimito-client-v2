import InstantBookingForm from "./components/forms/instant-booking-form";
import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* <SignIn />
      <About />
      <BoardingRequirements />
      <PricingTable /> */}

      <div className="mt-10">
        <div className="w-[90%] h-[577px] flex bg-primary mx-auto rounded-[16px] shadow-lg">
          <div className="w-[750px] p-10">
            <div className="text-[64px] text-white leading-none mb-10 font-bold">
              Give your pet a dream vacation!
            </div>
            <div className="text-[22px] text-white mb-10">
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
          <div className="w-[750px] p-10">
            <InstantBookingForm />
          </div>
        </div>
      </div>
    </>
  );
}
