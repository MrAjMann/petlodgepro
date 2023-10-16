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
import Link from "next/link";

const formSchema = z.object({
  petName: z.string().min(1, {
    message: "Tenant Name must not be empty min (1) char",
  }),
  petType: z.string().min(1, {
    message: "Type of pet is required",
  }),
  petVaxStatus: z.boolean().default(false).optional(),
  petAge: z.string().optional(),
  petBreed: z.string().min(1, {
    message: "Type of pet is required",
  }),
  petTemperament: z.string().optional(),
  petMedicalConditions: z.string().optional(),
});

export default function NewPetPage() {
  const { data: session, status } = useSession();
  const tenantId = session?.user.tenantId;

  // Must have super user admin privlidges
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      petName: "",
      petType: "",
      petBreed: "",
      petVaxStatus: false,
      petTemperament: "Playful",
      petMedicalConditions: "NONE",
    },
  });

  const newPet = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const response = await axios.post(`/api/client/pet/create`, {
        tenantId: tenantId,
        ownerId: session?.user.id,
        petName: values.petName,
        petType: values.petType,
        petBreed: values.petBreed,
        petAge: values.petAge,
        petVaxStatus: values.petVaxStatus,
        petTemperament: values.petTemperament,
        petMedicalConditions: values.petMedicalConditions,
      });
      return response.data;
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    newPet.mutate(values);
    router.push(`/tenants/${tenantId}/pets`);
  }

  return (
    <section className="min-h-screen my-14">
      <div>
        <h1 className="text-4xl text-primary-foreground ">Add a new Pet</h1>
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
                name="petName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300 text-lg">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name="petType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300 text-lg">
                      Type
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Type" {...field} />
                    </FormControl>
                    <FormDescription>
                      Please add the type of animal e.g. Dog, Cat, Bird
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name="petBreed"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300 text-lg">
                      Breed
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Labrador" {...field} />
                    </FormControl>
                    <FormDescription>
                      Please add the breed of your animal
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name="petAge"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300 text-lg">Age</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        className="border-slate-400"
                      />
                    </FormControl>
                    <FormDescription>
                      If unsure of age, please estimate in months
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>

              <FormField
                control={form.control}
                name="petVaxStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300 text-lg">
                      Is your pet vaccinated
                    </FormLabel>
                    <FormControl>
                      <Checkbox
                        className="border-slate-100 ml-4 w-6 h-6"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormDescription>
                      Ror more information on required vaccinations for your pet
                      <Link href="/" className="text-blue-300 font-bold italic">
                        {" "}
                        read here
                      </Link>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name="petTemperament"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300 text-lg">
                      Temperament
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Playfull"
                        {...field}
                        className="border-slate-400"
                      />
                    </FormControl>
                    <FormDescription>
                      What is the temperament of you pet?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name="petMedicalConditions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300 text-lg">
                      Medical Conditions
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Medical conditons"
                        {...field}
                        className="border-slate-400"
                      />
                    </FormControl>
                    <FormDescription>
                      What is the temperament of you pet?
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
