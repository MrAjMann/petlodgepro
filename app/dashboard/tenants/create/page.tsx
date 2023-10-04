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
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { $tenants } from "@/lib/db/schema";

const formSchema = z.object({
  tenantName: z.string().min(1, {
    message: "Tenant Name must not be empty min (1) char",
  }),
  tenantEmail: z
    .string()
    .min(4, {
      message: "Tenant Email must not be empty min (4) char",
    })
    .email(),
});

export default function NewTenantPage() {
  // Must have super user admin privlidges
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tenantName: "",
      tenantEmail: "",
    },
  });

  const newTenant = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const response = await axios.post(`/api/tenant/create`, {
        tenantName: values.tenantName,
        tenantEmail: values.tenantEmail,
      });
      return response.data;
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    newTenant.mutate(values);
    router.push("/dashboard");
    console.log(values);
  }

  return (
    <section className="min-h-screen my-14">
      <div>
        <h1 className="text-4xl text-primary-foreground ">
          Create a new Tenant
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
                name="tenantName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300 text-lg">
                      Tenant Name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Tenant Name" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the company/tenant name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name="tenantEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300 text-lg">
                      Tenant Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Tenant Email"
                        {...field}
                        className="border-slate-400"
                      />
                    </FormControl>
                    <FormDescription>
                      This is the company/tenant email.
                    </FormDescription>
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
