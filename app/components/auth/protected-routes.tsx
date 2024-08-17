"use client";

import { useEffect, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../helpers/config";
import { routes } from "../utils/routes/routes";
import { useConfig } from "../config/app-context";
import { useUser } from "../config/user-context";
import Spinner from "../common/spinner";

const ProtectedRoutes = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [guestRoutes, setGuestRoutes] = useState<string[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        startTransition(() => {
          router.push(routes.home);
        });
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (isLoading || isPending) {
    return (
      <div className="h-screen w-screen flex justify-center items-center space-x-1 text-sm bg-primary">
        <div>
          <Spinner />
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoutes;
