"use state";

import { DatePickerWithRange } from "@/components/DatePicker";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { bookingFormSchema } from "./bookingContainer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { TimePicker } from "@/components/timePicker";
type availabilityFormData = z.infer<typeof bookingFormSchema>;

type availabilityFormProps = {
  form: UseFormReturn<availabilityFormData>;
};

const services = [
  { label: "Boarding", value: "Boarding" },
  { label: "Daycare", value: "Daycare" },
] as const;

export default function CheckAvailability({ form }: availabilityFormProps) {
  return (
    <div>
      <div className="space-y-4 py-2 pb-4">
        <FormField
          control={form.control}
          name="serviceValue"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-gray-600 font-medium text-lg ">
                Service
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        " text-sm justify-between text-gray-600 font-medium tracking-wider",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? services.find(
                            (Service) => Service.value === field.value
                          )?.label
                        : "Select Service"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className=" p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search service..."
                      className="h-12"
                    />

                    <CommandGroup>
                      {services.map((Service) => (
                        <CommandItem
                          className="text-gray-700 font-medium tracking-wider"
                          value={Service.label}
                          key={Service.value}
                          onSelect={() => {
                            form.setValue("serviceValue", Service.value);
                          }}
                        >
                          <span className="">{Service.value}</span>
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4 ",
                              Service.value === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                This is the Service that will be used in the dashboard.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-6">
          <DatePickerWithRange />
          <div className="flex gap-8">
            <div className="flex flex-col gap-2">
              <FormLabel>Check-In Time</FormLabel>
              <TimePicker />
            </div>
            <div className="flex flex-col gap-2">
              <FormLabel>Check-Out Time</FormLabel>
              <TimePicker />
            </div>
          </div>
        </div>
        <FormField
          control={form.control}
          name={"numPets"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Pets</FormLabel>
              <FormControl>
                <Input
                  // disabled={loading}
                  placeholder="0"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
