"use client";

import { Button } from "@/components/ui/button";

import { signOut } from "next-auth/react";

type Props = {};
const SignOut = (props: Props) => {
  return (
    <Button
      className=" text-xl rounded-lg flex flex-col justify-center items-center px-8 py-6 border-2 border-gray-500 text-gray-200 hover:rounded-lg font-semibold focus:bg-slate-400 focus:text-white  hover:text-white transition-all duration-300 hover:border-green-500 hover:scale-105 hover:animate-pulse"
      type="button"
      variant={"default"}
      onClick={() => signOut()}
    >
      Sign Out
    </Button>
  );
};
export default SignOut;
