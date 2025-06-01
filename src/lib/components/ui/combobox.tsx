"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "./button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

type ComboboxProps = {
  options: Option[];
  placeholder?: string;
  selected?: string;
  onChange?: (value: string) => void;
};

export const Combobox: React.FC<ComboboxProps> = ({
  options,
  placeholder = "Select option...",
  selected = "",
  onChange,
}) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(selected);

  const handleSelect = (currentValue: string) => {
    const newValue = currentValue === value ? "" : currentValue;
    onChange?.(newValue);
    setValue(newValue);
    // const newValue = currentValue === value ? "" : currentValue;
    // setValue(newValue);
    // setOpen(false);

    // if (newValue !== "123") {
    //   const itemId = options.find((option) => option.label === newValue)?.value;
    //   onChange?.(itemId);
    // } else {
    //   onChange?.(newValue);
    // }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between"
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          {/* <CommandInput placeholder="Search..." className="h-9" /> */}
          <CommandList>
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={handleSelect}
                >
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
