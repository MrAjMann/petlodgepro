"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQuery } from "@tanstack/react-query";
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

const formSchema = z.object({
	firstName: z.string().min(1, {
		message: "First name must not be empty min (1) char",
	}),
	lastName: z.string().min(1, {
		message: "Last name must not be empty min (1) char",
	}),
	email: z
		.string()
		.min(4, {
			message: "Email must not be empty min (4) char",
		})
		.email(),
});

export default function TenantProfile({ user }: any) {
	// const [editState, setEditState] = useState(true);
	// Must have super user admin privlidges
	const router = useRouter();
	// 1. Define your form.
	const email = user?.email;
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			email: `${email}`,
		},
	});

	const editClientInfo = useMutation({
		mutationFn: async (values: z.infer<typeof formSchema>) => {
			const { data, error, isSuccess, isStale } = useQuery({
				queryKey: ["clientInformation"],
				queryFn: async () => {
					const response = await axios.get(`/api/tenants/users/client`);
					return response.data;
				},
			});

			const response = await axios.post(`/api/tenants/users/client/edit`, {
				firstName: values.firstName,
				lastName: values.lastName,
				email: values.email,
				// phone: values.phone,
			});

			return response.data;
		},
	});

	// const editStaffInfo = useMutation({
	//   mutationFn: async (values: z.infer<typeof formSchema>) => {
	//     const response = await axios.post(`/api/tenant/users/staff/edit`, {
	//       name: values.name,
	//       email: values.email,
	//       // phone: values.phone,
	//     });
	//     return response.data;
	//   },
	// });

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.

		editClientInfo.mutate(values);
		// if (user.role === "CLIENT") {
		//   editClientInfo.mutate(values);
		// } else {
		//   editStaffInfo.mutate(values);
		// }

		// router.push(`/tenants/${users.tenantId}/profile`);
		router.refresh();
	}

	return (
		<section className='min-h-screen my-14'>
			<div className='flex flex-col justify-center items-start h-full '>
				<div className='w-96 mx-36 my-24'>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className='flex flex-col gap-4'
						>
							<FormField
								control={form.control}
								name='firstName'
								render={({ field }) => (
									<FormItem>
										<FormLabel className='text-gray-300 text-lg'>
											First Name
										</FormLabel>
										<FormControl>
											<Input
												placeholder={`${user?.firstName}` || ""}
												{...field}
												readOnly
											/>
										</FormControl>
										<FormDescription>
											To change your name please contact PetLodgePro support
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							></FormField>
							<FormField
								control={form.control}
								name='lastName'
								render={({ field }) => (
									<FormItem>
										<FormLabel className='text-gray-300 text-lg'>
											Last Name
										</FormLabel>
										<FormControl>
											<Input
												// readOnly={editState}
												readOnly
												placeholder={`${user?.lastName}`}
												{...field}
												className='border-slate-400'
											/>
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							></FormField>
							<FormField
								control={form.control}
								name='email'
								render={({ field }) => (
									<FormItem>
										<FormLabel className='text-gray-300 text-lg'>
											Email Address
										</FormLabel>
										<FormControl>
											<Input
												// readOnly={editState}
												placeholder={`${user?.email}`}
												{...field}
												className='border-slate-400'
											/>
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							></FormField>

							<Button type='submit' variant={"secondary"} className=''>
								Submit
							</Button>
						</form>
					</Form>
				</div>
			</div>
		</section>
	);
}
