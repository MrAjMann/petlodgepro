"use client";

import { DatePickerWithRange } from "@/components/DatePicker";
import { Heading } from "@/components/ui/heading";
import { getTodaysDate } from "@/lib/utils/getTodaysDate";
import { useState } from "react";
import TabBar from "./components/tabBar";
import BookingContainer from "./components/bookingContainer";

interface BookingsPageProps {
  initialActiveTab: string;
}

const BookingsPage: React.FC<BookingsPageProps> = ({ initialActiveTab }) => {
  const todaysDate = getTodaysDate();

  return (
    <div className="flex flex-col min-h-screen space-y-12 p-8">
      <div className="flex justify-start space-y-6">
        {/* Heading should remain in place at the top left */}
        <Heading title="Bookings" description={`${todaysDate}`} />
      </div>

      {/* Only change from this */}
      <BookingContainer />
    </div>
  );
};

export default BookingsPage;
