"use client";

import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Select, SelectItem } from "@/components/ui/select";
import { FormMessage } from "@/components/ui/form";

interface IProps {
  name: string;
  label: string;
  options: { key: string; label: string }[];
  disabled?: boolean;
}

export default function PHSelect({ options, name, label, disabled }: IProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Select {...register(name)} disabled={disabled}>
        {options.map((option) => (
          <SelectItem key={option.key} value={option.key}>
            {option.label}
          </SelectItem>
        ))}
      </Select>
      {errorMessage && <FormMessage>{errorMessage}</FormMessage>}
    </div>
  );
}
