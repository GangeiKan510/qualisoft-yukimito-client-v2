"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../helpers/config";
import toast, { Toaster } from "react-hot-toast";
import { routes } from "../utils/routes/routes";
import Spinner from "../common/spinner";

function SignUpForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signUpButton, setSignUpButton] = useState<any>("Sign Up");

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setSignUpButton(<Spinner />);
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Account created successfully!");
      router.replace(routes.home);
    } catch (error: any) {
      toast.error("Please check your credentials and try again!");
      setSignUpButton("Sign Up");
    }
  };

  return (
    <div className="min-h-screen flex items-center px-4">
      <Toaster />
      <div className="w-full lg:w-[80%] lg:h-[80%] m-auto flex flex-col lg:flex-row justify-between items-center lg:items-stretch">
        <div className="h-full w-full lg:w-1/2">
          <div className="flex flex-col gap-6 lg:gap-10 text-[18px]">
            {/* Sign In Redirect */}
            <div className="flex gap-2 justify-center lg:justify-start">
              <div className="text-gray">Already have an account?</div>
              <div
                className="font-semibold underline cursor-pointer text-secondary"
                onClick={() => {
                  router.replace(routes.login);
                }}
              >
                Sign In
              </div>
            </div>
            {/* Welcome Text */}
            <div className="text-center lg:text-left">
              <div className="text-[28px] lg:text-[36px] font-bold text-primary-dark">
                Welcome to YUKIMITO!
              </div>
              <div className="text-[20px] lg:text-[24px] text-gray">
                Create an account
              </div>
            </div>
            {/* Email Input */}
            <div className="flex flex-col gap-2 text-primary-dark">
              <div>Email</div>
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full max-w-[400px] h-[50px] border border-gray rounded-[8px] px-5"
                />
              </div>
            </div>
            {/* Password Input */}
            <div className="flex flex-col gap-2 text-primary-dark">
              <div>Password</div>
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full max-w-[400px] h-[50px] border border-gray rounded-[8px] px-5"
                />
              </div>
            </div>
            {/* Confirm Password Input */}
            <div className="flex flex-col gap-2 text-primary-dark">
              <div>Confirm Password</div>
              <div>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full max-w-[400px] h-[50px] border border-gray rounded-[8px] px-5"
                />
              </div>
            </div>
            {/* Sign Up Button */}
            <div
              onClick={handleSignUp}
              className="w-full max-w-[150px] h-[40px] bg-primary-dark flex items-center justify-center rounded-full cursor-pointer mt-6 lg:mt-10 mx-auto lg:mx-0"
            >
              <div className="text-white">{signUpButton}</div>
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

export default SignUpForm;
