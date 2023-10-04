import Provider from "@/components/Providers";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PetLodgePro",
  description:
    "PetLodgePro is a modern pet managemnet system for pet boarding kennels",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Provider>
        <body className="bg-gradient-to-r from-gray-700 via-gray-900 to-black">
          {children}
        </body>
      </Provider>
    </html>
  );
}
