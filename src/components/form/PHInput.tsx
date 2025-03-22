"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormMessage } from "@/components/ui/form";
import { useFormContext } from "react-hook-form";

interface IProps {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}

export default function PHInput({
  name,
  label,
  type = "text",
  required = false,
  placeholder = "",
}: IProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        type={type}
        {...register(name)}
        placeholder={placeholder}
        required={required}
        className={errorMessage ? "border-red-500" : ""}
      />
      {errorMessage && <FormMessage>{errorMessage}</FormMessage>}
    </div>
  );
}
