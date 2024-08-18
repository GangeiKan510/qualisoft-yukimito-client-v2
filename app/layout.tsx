"use client";

import { usePathname } from "next/navigation";
import Footer from "./components/common/footer";
import Header from "./components/common/header";
import { AppProvider } from "./components/config/app-context";
import "./globals.css";
import { routes } from "./components/utils/routes/routes";
import { UserProvider } from "./components/config/user-context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const routesWithFooter = [routes.home];
  const routesWithHeader = [routes.home, routes.createBooking];

  return (
    <html lang="en">
      <head>
        <title>YUKIMITO | Pet Hotel and Boarding Services</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lilita+One&family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans">
        <AppProvider>
          <UserProvider>
            {routesWithHeader.includes(pathname) && <Header />}
            <div>{children}</div>
            {/* Conditionally render the footer */}
            {routesWithFooter.includes(pathname) && <Footer />}
          </UserProvider>
        </AppProvider>
      </body>
    </html>
  );
}
