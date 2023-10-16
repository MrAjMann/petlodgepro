"use client";

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
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { useSession } from "next-auth/react";

const formSchema = z.object({
  firstName: z.string().min(1, {
    message: "Tenant Name must not be empty min (1) char",
  }),
  lastName: z.string().min(1, {
    message: "Tenant Name must not be empty min (1) char",
  }),
  staffPermisions: z.boolean().default(false).optional(),
  email: z
    .string()
    .min(4, {
      message: "Tenant Email must not be empty min (4) char",
    })
    .email(),
  password: z.string().min(1, {
    message: "Required",
  }),
});

export default function NewTenantPage() {
  const { data: session, status } = useSession();
  const tenantId = session?.user.tenantId;
  // Must have super user admin privlidges
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      staffPermisions: false,
    },
  });

  const newStaffMember = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const response = await axios.post(`/api/staff/create`, {
        tenantId: tenantId,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        staffPermsions: values.staffPermisions,
      });
      return response.data;
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    newStaffMember.mutate(values);
    router.push(`/tenants/${tenantId}/staff`);
  }

  return (
    <section className="min-h-screen my-14">
      <div>
        <h1 className="text-4xl text-primary-foreground ">
          Add a new Staff Member
        </h1>
      </div>
      <div className="seperator"></div>

      <div className="flex flex-col justify-center items-start h-full ">
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
                      <Input placeholder="First Name" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300 text-lg">
                      Last Name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Last Name" {...field} />
                    </FormControl>

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
                        placeholder="Email"
                        {...field}
                        className="border-slate-400"
                      />
                    </FormControl>
                    <FormDescription>
                      Please use a company email address
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name="staffPermisions"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-start items-center align-middle">
                      <FormLabel className="text-gray-300 text-xl">
                        Admin Privledges
                      </FormLabel>
                      <FormControl>
                        <Checkbox
                          className="border-slate-100 ml-4 w-6 h-6"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </div>
                    <FormDescription>
                      Give user admin privledges
                    </FormDescription>
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
                        type="password"
                        placeholder="password"
                        {...field}
                        className="border-slate-400"
                      />
                    </FormControl>

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
}
