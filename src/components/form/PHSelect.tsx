"use client"

import { useFormContext } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FormMessage } from "@/components/ui/form"

interface IProps {
  name: string
  label: string
  options: { key: string; label: string }[]
  disabled?: boolean
  onChange?: (value: string) => void
}

export default function PHSelect({ options, name, label, disabled, onChange }: IProps) {
  const {
    formState: { errors },
    setValue,
    watch,
  } = useFormContext()

  const errorMessage = errors[name]?.message as string | undefined
  const value = watch(name) || ""

  // Handle change event
  const handleChange = (value: string) => {
    setValue(name, value)
    if (onChange) {
      onChange(value)
    }
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Select value={value} onValueChange={handleChange} disabled={disabled}>
        <SelectTrigger>
          <SelectValue placeholder={`Select ${label}`} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.key} value={option.key}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {errorMessage && <FormMessage>{errorMessage}</FormMessage>}
    </div>
  )
}
