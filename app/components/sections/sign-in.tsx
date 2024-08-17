"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import StyledFirebaseAuth from "../auth/styled-firebase-auth";
import {
  FEATURE_OAUTH_EMAIL,
  FEATURE_OAUTH_GOOGLE,
  FEATURE_OAUTH_PHONE,
  useFeatureFlags,
} from "../utils/feature-flags";
import {
  EmailAuthProvider,
  GoogleAuthProvider,
  PhoneAuthProvider,
} from "firebase/auth";
import { routes } from "../utils/routes/routes";
import { useUser } from "../config/user-context";
import { useConfig } from "../config/app-context";
import { useRouter } from "next/navigation";
import useSignOut from "../helpers/use-sign-out";
import { auth } from "../helpers/config";
import Spinner from "../common/spinner";

function SignIn() {
  const { user, updateUser } = useUser();
  const router = useRouter();
  const { featureFlags, isFeatureEnabled } = useFeatureFlags();
  const configs = useConfig();

  const [signOut, loading, error] = useSignOut(auth);
  const [loadingUser, setLoadingUser] = useState(true);
  const [jwtToken, setJwtToken] = useState<string | null>(null);

  const confirmSignOut = async () => {
    const isSignoutSuccessful = await signOut();
    if (isSignoutSuccessful) {
      setJwtToken(null);
      router.push(routes.home);
    }
  };

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
        console.error(error);
        setJwtToken(null);
        setLoadingUser(false);
      }
    };

    getToken();
  }, [configs]);

  const uiConfig: firebaseui.auth.Config = useMemo(() => {
    const signInOptions = [];

    if (isFeatureEnabled(FEATURE_OAUTH_EMAIL)) {
      signInOptions.push(EmailAuthProvider.PROVIDER_ID);
    }
    if (isFeatureEnabled(FEATURE_OAUTH_GOOGLE)) {
      signInOptions.push(GoogleAuthProvider.PROVIDER_ID);
    }
    if (isFeatureEnabled(FEATURE_OAUTH_PHONE)) {
      signInOptions.push({
        provider: PhoneAuthProvider.PROVIDER_ID,
        recaptchaParameters: {
          type: "image",
          size: "normal",
          badge: "bottomleft",
        },
        defaultCountry: "HK",
      });
    }

    return {
      signInOptions,
      signInSuccessUrl: routes.dashboard,
      signInFlow: "popup",
      popupMode: true,
      callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
          const user = authResult.user;
          updateUser(user);
          return true;
        },
      },
    };
  }, [isFeatureEnabled, updateUser]);

  return (
    <>
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8  lg:gap-80 px-4 lg:px-52 my-12 lg:my-24">
        <div className="lg:text-left">
          <div className="text-4xl text-center lg:text-[64px] font-lilita text-secondary">
            YUKIMITO
          </div>
          <div className="text-lg text-center lg:text-[24px] font-bold">
            Pet Hotel & Boarding Services
          </div>
          <Image
            width={429.594}
            height={220.367}
            src="/images/hero.jpeg"
            alt="hero-img"
            className="mt-4 lg:mt-0"
          />
        </div>
        <div className="flex flex-col items-center justify-center h-full">
          <div className="w-full max-w-[500px] border border-secondary rounded-[16px] bg-white p-6">
            {loadingUser ? (
              <Spinner type="secondary" />
            ) : jwtToken ? (
              <div className="text-center">
                <div id="firebaseui-auth-container">
                  <div>Welcome Back,</div>
                  <div className="text-[28px] font-bold">
                    {auth.currentUser && auth.currentUser?.displayName}
                  </div>
                </div>
                <div className="w-full rounded-xl flex flex-col items-center">
                  <div
                    className="flex gap-2 cursor-pointer border border-secondary p-3 px-5 rounded-full text-white bg-secondary items-center justify-center"
                    onClick={() => router.push(routes.dashboard)}
                  >
                    <div>Go to Dashboard</div>
                    <Image
                      width={24}
                      height={24}
                      src="/svg/go-to.svg"
                      alt="go-to-svg"
                    />
                  </div>
                  <div
                    className="mt-3 underline cursor-pointer"
                    onClick={confirmSignOut}
                  >
                    Sign Out
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="text-[22px] font-bold text-center">Sign In</div>
                <div>
                  <StyledFirebaseAuth uiConfig={uiConfig}></StyledFirebaseAuth>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;
