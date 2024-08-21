"use client";

import { usePathname } from "next/navigation";
import Sidebar from "../components/common/sidebar";
import ProtectedRoutes from "../dashboard/layout";
import { routes } from "../components/utils/routes/routes";
import Header from "../components/common/header";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoutes>
      <Header />
      <main className="flex">
        <Sidebar />
        {children}
      </main>
    </ProtectedRoutes>
  );
}
