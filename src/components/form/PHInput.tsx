"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormMessage } from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import clsx from "clsx";

interface IProps {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
}

export default function PHInput({
  name,
  label,
  type = "text",
  required = false,
  placeholder = "",
  className = "",
}: IProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <div className={clsx("space-y-2", className)}>
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        type={type}
        {...register(name)}
        placeholder={placeholder}
        required={required}
        className={clsx(
          "w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
          errorMessage ? "border-red-500" : "border-gray-300"
        )}
      />
      {errorMessage && <FormMessage>{errorMessage}</FormMessage>}
    </div>
  );
}
