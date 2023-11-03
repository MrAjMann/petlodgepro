"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Clock as ClockIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { TimePickerUI } from './ui/time-picker-ui';

export function TimePicker({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [time, setTime] = useState<string | undefined>("06:00 AM"); // Default to 6 AM

  // Define the time options (6 AM to 6 PM in this example)
  const times = [];
  for (let hour = 6; hour <= 18; hour++) {
    let hourFormatted = hour % 12 === 0 ? 12 : hour % 12;
    let suffix = hour < 12 ? "AM" : "PM";
    times.push(`${hourFormatted}:00 ${suffix}`);
    times.push(`${hourFormatted}:30 ${suffix}`);
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id="time"
          variant={"outline"}
          className={cn(
            "w-[300px] text-black justify-start text-left font-normal",
            !time && "text-muted-foreground"
          )}
        >
          <ClockIcon className="mr-2 h-4 w-4" />
          {time ? <span>{time}</span> : <span>Select time</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <TimePickerUI selected={time} onSelect={setTime} times={times} />
      </PopoverContent>
    </Popover>
  );
}
