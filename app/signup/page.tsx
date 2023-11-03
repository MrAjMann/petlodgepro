"use client";

import { useToast } from "@/components/ui/use-toast";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
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
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

import { db } from "@/lib/db";

// import bcrypt from "bcrypt";

const formSchema = z.object({
  firstName: z.string().min(1, {
    message: "Tenant Name must not be empty min (1) char",
  }),
  email: z
    .string()
    .min(4, {
      message: "Tenant Email must not be empty min (4) char",
    })
    .email(),
  password: z
    .string()
    .min(8, { message: "Password length needs to be at least 8 characters" }),
});

type Props = {};
const SignUp = (props: Props) => {
  const { toast } = useToast();
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      email: "",
      password: "",
    },
  });
  const newUser = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const { firstName, email, password } = values;

      const checkUser = await axios.post(`/api/user/view`, {
        email,
      });

      if (checkUser.data !== null) {
        toast({
          title: "User already exists",
          description: "This account already exists please sign in",
          variant: "destructive",
        });
        // router.push("/signin");
        throw new Error("User already exists pleae try again");
      }

      const newUser = await axios.post(`/api/user/create`, {
        name: firstName,
        email: email,
        password: password,
      });

      router.push("/dashboard");

      return newUser;
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    newUser.mutate(values);

    // router.push("/dashboard");
  }
  return (
    <section className="min-h-screen my-14">
      <div>
        <h1 className="text-4xl text-primary-foreground ">Sign Up</h1>
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
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300 text-lg">
                      First Name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Tenant Name" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the user's first name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
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
                        placeholder="User Email"
                        {...field}
                        className="border-slate-400"
                      />
                    </FormControl>
                    <FormDescription>This is the user email.</FormDescription>
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
                      <Input
                        placeholder="********"
                        {...field}
                        type="password"
                        className="border-slate-400"
                      />
                    </FormControl>
                    <FormDescription>Password.</FormDescription>
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
export default SignUp;
