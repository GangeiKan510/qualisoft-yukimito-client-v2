"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { routes } from "../utils/routes/routes";

function SignInForm() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex items-center px-4">
      <div className="w-full lg:w-[80%] lg:h-[80%] m-auto flex flex-col lg:flex-row justify-between items-center lg:items-stretch">
        <div className="h-full w-full lg:w-1/2">
          <div className="flex flex-col gap-6 lg:gap-5text-[18px]">
            <div className="flex gap-2 justify-center lg:justify-start">
              <div className="text-gray">Don't have an account?</div>
              <div
                className="font-semibold underline cursor-pointer text-secondary"
                onClick={() => {
                  router.replace(routes.register);
                }}
              >
                Sign Up
              </div>
            </div>
            <div className="text-center lg:text-left">
              <div className="text-[28px] lg:text-[36px] font-bold text-primary-dark">
                Welcome to YUKIMITO!
              </div>
              <div className="text-[20px] lg:text-[24px] text-gray">
                Log in to continue
              </div>
            </div>
            <div className="flex flex-col gap-2 text-primary-dark">
              <div>Email</div>
              <div>
                <input
                  type="email"
                  className="w-full max-w-[400px] h-[50px] border border-gray rounded-[8px] px-5"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 text-primary-dark">
              <div>Password</div>
              <div>
                <input
                  type="password"
                  className="w-full max-w-[400px] h-[50px] border border-gray rounded-[8px] px-5"
                />
              </div>
            </div>
            <div className="w-full max-w-[150px] h-[40px] bg-primary-dark flex items-center justify-center rounded-full cursor-pointer mt-6 lg:mt-10 mx-auto lg:mx-0">
              <div className="text-white">Sign In</div>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex items-center justify-center lg:w-1/2">
          <Image
            width={700}
            height={400}
            src="/svg/register-hero.svg"
            alt="register-hero"
          />
        </div>
      </div>
    </div>
  );
}

export default SignInForm;
