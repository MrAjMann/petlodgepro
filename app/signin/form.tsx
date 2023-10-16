"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import bcrypt from "bcrypt";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { FormEvent } from "react";
import { error } from "console";

const formSchema = z.object({
  email: z
    .string()
    .min(4, {
      message: "Email must not be empty min (4) char",
    })
    .email(),
  password: z.string().min(8, {
    message: "Password must not be empty min (8) char",
  }),
});

type Props = {};
const SignIn = (props: Props) => {
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const user = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: true,
      });

      return user;
    } catch (err) {
      router.push("/signin");
      return new Error("Error user not found");
      // router.refresh();
    }
  }
  return (
    <section className="min-h-screen my-14">
      <div>
        <h1 className="text-4xl text-primary-foreground ">SignUp</h1>
      </div>
      <div className="seperator"></div>

      <div className="flex flex-col absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
        <div className="w-96 mx-36 my-24">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300 text-lg">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="email"
                        {...field}
                        className="border-slate-400"
                      />
                    </FormControl>
                    <FormDescription>Enter your email address.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300 text-lg">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="********" {...field} />
                    </FormControl>
                    <FormDescription>Your password</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <Button type="submit" variant={"secondary"} className="">
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};
export default SignIn;
