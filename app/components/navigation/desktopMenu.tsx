"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import SignOut from "../ui/signout";
const DektopMenu = () => {
  const router = useRouter();
  const { data: session, status, update } = useSession();

  return (
    <div className=" my-8  hidden md:w-full md:flex md:justify-between md:items-center max-h-[8rem] 2xl:mx-auto">
      <a href="/" className="flex items-center text-3xl font-semibold">
        PetLodgePro
      </a>
      <ul className="flex items-center  gap-8">
        <li>
          {" "}
          <a href="/services" className="text-white font-normal text-xl ">
            Product{" "}
          </a>
        </li>
        <li>
          {" "}
          <a href="/about" className="text-white font-normal text-xl ">
            Pricing
          </a>
        </li>
        {!session?.user && (
          <>
            <li>
              <a
                className="cursor-pointer gap-x-1 flex text-white font-normal text-xl"
                href="/signin"
              >
                SignIn
              </a>
            </li>
            <li>
              <Button
                className="font-normal text-white bg-blue-700 rounded-md px-6 py-2 text-xl"
                type="button"
                onClick={() => router.push("/signup")}
              >
                Register
              </Button>
            </li>
          </>
        )}
        {session?.user && (
          <div className="">
            <SignOut />
          </div>
        )}
      </ul>
    </div>
  );
};
export default DektopMenu;
