import Provider from "@/components/Providers";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import Header from "./components/navigation/header";
import { Session } from "@auth/core/types";
import NavMenu from "./components/navigation/navbar";
import { Sidebar } from "../components/sidebar";
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
  return (
    <html lang="en">
      <Provider session={session}>
        <body className="bg-gradient-to-r from-gray-700 via-gray-900 to-black">
          {/* <Header /> */}
          <section className="flex min-h-screen">
            <aside className="w-[300px] overflow-y-auto bg-gray-800">
              <Sidebar />
            </aside>
            <main className="flex-1 p-4 ml-4 ">
              {children}
              <Toaster />
            </main>
          </section>
        </body>
      </Provider>
    </html>
  );
}
