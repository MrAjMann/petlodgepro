"use client";

import { useState } from "react";
import TabBar from "./tabBar";
import CustomerForm from "./CustomerForm";
import RatesForm from "./RatesForm";
import ServicesForm from "./ServicesForm";
import SummaryView from "./SummaryView";
import CheckAvailability from "./checkAvailability";

import { Heading } from "@/components/ui/heading";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
type Props = {};

export const bookingFormSchema = z.object({
  // Define your customer fields and validations
  serviceValue: z.string().min(1),
  numPets: z.number().min(0),

  // Add other fields as necessary
});

function BookingContainer({}: Props) {
  const initialActiveTab = "Check Availability";
  const [activeTab, setActiveTab] = useState<string>(initialActiveTab);
  const [serviceValue, setServiceValue] = useState(null);
  const [loading, setLoading] = useState(false);

  type bookingFormData = z.infer<typeof bookingFormSchema>;

  const form = useForm<z.infer<typeof bookingFormSchema>>({
    resolver: zodResolver(bookingFormSchema),

    defaultValues: {
      serviceValue: "Boarding",
      numPets: 1,
    },
  });

  // Function to handle tab click events
  const handleTabClick = (tab: string) => {
    // Check if the tab clicked is not already the active tab
    if (tab !== activeTab) {
      // Update the active tab state
      setActiveTab(tab);
      // Perform any additional actions for tab change, like data fetching
      // fetchDataForTab(tab); // Example function call
    }
  };
  const onSubmit = (data: bookingFormData) => {
    // handle form submission
    console.log(data);
    // Perform submission actions...
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "Check Availability":
        return <CheckAvailability form={form} />;
      case "Customer":
        return <CustomerForm />; // Replace with actual customer form component
      case "Set Rates":
        return <RatesForm />; // Replace with actual rates form component
      case "Services":
        return <ServicesForm />; // Replace with actual services form component
      case "Summary":
        return <SummaryView />; // Replace with actual summary view component
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center flex-grow gap-8 w-4/5 max-w-screen-2xl mx-auto text-gray-700">
      <div className=" rounded-xl w-full max-w-screen-2xl">
        {/* Tabs */}
        <TabBar activeTab={activeTab} onTabClick={handleTabClick} />
      </div>
      <div className="flex justify-center gap-4 w-full ">
        <div className="shadow-lg rounded-xl w-full 2xl:min-h-[600px] bg-white px-8 py-2">
          {/* Main content */}
          <div className="flex flex-col  gap-4">
            {/* Main section for input fields */}
            <div className="items-center w-full justify-around border-b ">
              <Heading
                title={"New Booking"}
                description={""}
                className="my-2 text-gray-500 font-medium tracking-wide"
              />
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex-1">{renderTabContent()}</div>
              </form>
            </Form>
          </div>
        </div>
        {/* Summary Panel */}
        <div className="max-h-1/3 flex flex-col  min-w-[200px] p-4 bg-gray-50 rounded-lg ">
          {/* Summary information goes here */}
          <h4 className="text-gray-700">Summary </h4>
        </div>
      </div>
    </div>
  );
}
export default BookingContainer;
