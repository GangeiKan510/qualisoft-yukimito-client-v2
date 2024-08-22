"use client";

import React, { useEffect, useState } from "react";
import InstantBookingForm from "./components/forms/instant-booking-form";
import Image from "next/image";
import { auth } from "./components/helpers/config";
import Spinner from "./components/common/spinner";
import Typewriter from "typewriter-effect";
import { useRouter } from "next/navigation";
import { routes } from "./components/utils/routes/routes";

export default function Home() {
  const router = useRouter();

  const [jwtToken, setJwtToken] = useState<string | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const getToken = async () => {
      setLoadingUser(true);
      try {
        auth.onAuthStateChanged(async (user) => {
          if (user) {
            const idToken = await user.getIdToken(true);
            setJwtToken(idToken);
          } else {
            setJwtToken(null);
          }
          setLoadingUser(false);
        });
      } catch (error) {
        console.error("Error getting JWT:", error);
        setJwtToken(null);
        setLoadingUser(false);
      }
    };

    getToken();
  }, []);

  if (loadingUser) {
    return (
      <div className="flex justify-center items-center h-[577px]">
        <Spinner type="secondary" />
      </div>
    );
  }

  return (
    <div className="mt-10">
      <div className="w-[90%] flex flex-col lg:flex-row h-auto lg:h-[577px] bg-primary mx-auto rounded-[16px] shadow-lg">
        <div className="w-full lg:w-[50%] p-6 lg:p-10">
          <div className="text-[32px] sm:text-[48px] lg:text-[64px] text-white leading-tight lg:leading-none mb-6 lg:mb-10 font-bold">
            Give your pet a dream vacation!
          </div>
          <div className="text-[16px] sm:text-[18px] lg:text-[22px] text-white mb-2 lg:mb-10">
            Our pet hotel is the ideal place to stay for your furry friend!
            We&apos;ll make sure their vacation will be just as great as yours!
          </div>
          <Image
            className="hidden lg:block"
            width={400}
            height={40}
            src="/svg/landing-hero.svg"
            alt="logo-img"
          />
        </div>
        <div className="w-full lg:w-[50%] p-6 lg:p-10 flex items-center justify-center">
          {jwtToken ? (
            <div className="text-center text-white">
              <div className="text-[24px] lg:text-[32px] font-bold">
                <Typewriter
                  options={{
                    strings: [
                      "Welcome back!",
                      "Best place for your pet.",
                      "Your pet is in good hands!",
                      "Ready for another adventure?",
                      "We're thrilled to see you again!",
                    ],
                    autoStart: true,
                    loop: true,
                    delay: 50,
                  }}
                />
              </div>
              <div className="flex items-center justify-center mt-6">
                <div
                  onClick={() => router.replace(routes.userCreateBooking)}
                  className="h-[50px] text-[24px] flex items-center relative cursor-pointer bg-secondary text-white p-5 rounded-full font-semibold relative z-10 transition-transform duration-300 hover:-rotate-3"
                >
                  Book Now!
                </div>
              </div>
            </div>
          ) : (
            <InstantBookingForm />
          )}
        </div>
      </div>
    </div>
  );
}
