"use client";

// Components are typically PascalCase and hooks start with 'use'
import { useState } from "react";

import CustomerForm from "./CustomerForm";
import RatesForm from "./RatesForm";
import ServicesForm from "./ServicesForm";
import SummaryView from "./SummaryView";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useRouter } from "next/navigation";
import CheckAvailability from "./checkAvailability";
import { Heading } from "@/components/ui/heading";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import TabBar from "./tabBar";

// Constants and types are defined outside the component
const initialActiveTab = "Check Availability";
const tabOrder = [
  "Check Availability",
  "Customer",
  "Set Rates",
  "Services",
  "Summary",
];

export const bookingFormSchema = z.object({
  serviceValue: z.string().nonempty(),
  numPets: z.number().min(0),
  // Add other fields as necessary
});

type TabName =
  | "Check Availability"
  | "Customer"
  | "Set Rates"
  | "Services"
  | "Summary";

function getNextTab(currentTab: TabName, offset: number): TabName {
  const currentIndex = tabOrder.indexOf(currentTab);
  const nextIndex = (currentIndex + offset + tabOrder.length) % tabOrder.length;
  return tabOrder[nextIndex] as TabName;
}

function BookingContainer() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabName>(initialActiveTab);
  const [isModalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      serviceValue: "",
      numPets: 1, 
    },
  });
  const advanceToNextTab = () => setActiveTab(getNextTab(activeTab, 1));
  const handleTabBack = () => setActiveTab(getNextTab(activeTab, -1));
  const handleFinalAction = () => setModalOpen(true);

  type BookingFormData = z.infer<typeof bookingFormSchema>;

  const onSubmit = (data: BookingFormData) => {
    console.log("booking data");
    // Perform submission actions...
  };

  const isLastTab = activeTab === tabOrder[tabOrder.length - 1];

  const renderTabContent = () => {
    switch (activeTab) {
      case "Check Availability":
        return <CheckAvailability form={form} />;
      case "Customer":
        return <CustomerForm />;
      case "Set Rates":
        return <RatesForm />;
      case "Services":
        return <ServicesForm />;
      case "Summary":
        return <SummaryView />;
      default:
        return null;
    }
  };

  const renderButtons = () => (
    <div className="pt-6 space-x-4 flex items-center justify-end w-full">
      <Button
        disabled={loading}
        variant="outline"
        onClick={() => router.push("/")}
      >
        Cancel
      </Button>
      {activeTab !== "Check Availability" && (
        <Button disabled={loading} onClick={handleTabBack}>
          Back
        </Button>
      )}
      <Button
        disabled={loading}
        onClick={isLastTab ? handleFinalAction : advanceToNextTab}
      >
        {isLastTab ? "Create Booking" : "Continue"}
      </Button>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center flex-grow gap-8 w-4/5 max-w-screen-2xl mx-auto text-gray-700">
      <div className=" rounded-xl w-full max-w-screen-2xl">
        {/* Tabs */}
        <TabBar activeTab={activeTab} />
      </div>
      <div className="flex justify-center gap-4 w-full m-auto">
        <div className="shadow-lg rounded-xl w-full 2xl:min-h-fit bg-white px-8 py-8">
          {/* Main content */}
          <div className="flex flex-col  gap-8">
            {/* Main section for input fields */}
            <div className="items-center w-full justify-around border-b py-4">
              <Heading
                title={"New Booking"}
                description={""}
                className="my-2 text-gray-500 font-medium tracking-wide"
              />
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex-1">{renderTabContent()}</div>
                {renderButtons()}
              </form>
            </Form>
          </div>
        </div>
        {/* Summary Panel */}
        <div className=" flex flex-col  min-w-[300px] p-4 bg-gray-50 rounded-lg ">
          {/* Summary information goes here */}
          <h4 className="text-gray-700">Summary </h4>
        </div>
      </div>
    </div>
  );
}
export default BookingContainer;
