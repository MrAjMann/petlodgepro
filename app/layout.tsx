import Provider from "@/components/Providers";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import Header from "./components/navigation/header";
import { Session } from "@auth/core/types";
export const metadata: Metadata = {
  title: "PetLodgePro",
  description:
    "PetLodgePro is a modern pet managemnet system for pet boarding kennels",
};

export default function RootLayout({
  children,
  session,
}: {
  session: Session;
  children: React.ReactNode;
}) {
  // console.log("layout", session);
  return (
    <html lang="en">
      <Provider session={session}>
        <body className="bg-gradient-to-r from-gray-700 via-gray-900 to-black">
          <Header />
          {children}
          <Toaster />
        </body>
      </Provider>
    </html>
  );
}
