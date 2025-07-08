"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { ReactNode } from "react";

interface SelectDropdownProps<T> {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  open: boolean | undefined;
  onOpenChange: (open: boolean) => void;
  items: T[];
  itemKey: keyof T;
  itemLabel: keyof T;
  placeholder: string;
  disabled?: boolean;
  id?: string;
  className?: string;
  children?: ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function SelectDropdown<T extends Record<string, any>>({
  label,
  value,
  onValueChange,
  open,
  onOpenChange,
  items,
  itemKey,
  itemLabel,
  placeholder,
  disabled = false,
  id,
  className,
}: SelectDropdownProps<T>) {
  return (
    <>
      <Label htmlFor={id}>{label}</Label>
      <Popover open={open} onOpenChange={onOpenChange}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn("w-full justify-between mb-2", className)}
            id={id}
            disabled={disabled}
          >
            {value || placeholder}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput
              placeholder={`Search ${label.toLowerCase()}...`}
              className="h-9"
            />
            <CommandList>
              <CommandEmpty>No {label.toLowerCase()} found.</CommandEmpty>
              <CommandGroup>
                {items.map((item) => (
                  <CommandItem
                    key={item[itemKey]}
                    value={item[itemLabel]}
                    onSelect={(currentValue) => {
                      onValueChange(currentValue === value ? "" : currentValue);
                      onOpenChange(false);
                    }}
                  >
                    {item[itemLabel]}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === item[itemLabel] ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
}
