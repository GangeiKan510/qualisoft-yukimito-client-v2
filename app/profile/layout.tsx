"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../components/helpers/config";
import { routes } from "../components/utils/routes/routes";
import { useUser } from "../components/config/user-context";
import Spinner from "../components/common/spinner";
import Header from "../components/common/header";
import Sidebar from "../components/common/user-sidebar";

const ProtectedRoutes = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();
  const { user } = useUser();

  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        startTransition(() => {
          router.push(routes.login);
        });
      } else {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (isLoading || isPending) {
    return (
      <div className="h-screen w-screen flex justify-center items-center space-x-1 text-sm bg-primary">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="flex">
        <Sidebar />
        {children}
      </main>
    </>
  );
};

export default ProtectedRoutes;
