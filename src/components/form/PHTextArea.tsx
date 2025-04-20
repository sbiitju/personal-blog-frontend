"use client";

import { useFormContext, useWatch } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormMessage } from "@/components/ui/form";

interface IProps {
  name: string;
  label: string;
}

export default function PHTextarea({ name, label }: IProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const currentValue = useWatch({ name });
  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Textarea
        id={name}
        {...register(name)}
       
        value={currentValue || ""}
        className={errorMessage ? "border-red-500" : ""}
      />
      {errorMessage && <FormMessage>{errorMessage}</FormMessage>}
    </div>
  );
}
