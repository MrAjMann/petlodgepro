"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type TimePickerProps = {
  selected?: string;
  onSelect: (time: string) => void;
  times: string[];
  className?: React.ReactNode;
};

function TimePickerUI({
  selected,
  onSelect,
  times,
  className,
  ...props
}: TimePickerProps) {
  return (
    <div className={cn("overflow-y-auto h-64", className)} {...props}>
      <ul className="flex flex-col">
        {times.map((time) => (
          <li
            key={time}
            className={cn(
              "text-center cursor-pointer select-none p-2 hover:bg-gray-200",
              {
                "bg-blue-200": selected === time,
              }
            )}
            onClick={() => onSelect(time)}
          >
            {time}
          </li>
        ))}
      </ul>
    </div>
  );
}
TimePickerUI.displayName = "TimePickerUI";

export { TimePickerUI };
