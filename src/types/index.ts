export interface IUser {
  id: string;
  email: string;
  role: string;
  name: string;
  img: string;
  domain: string;
  iat?: number;
  exp?: number;
}

export interface IInput {
  variant?: "flat" | "bordered" | "faded" | "underlined";
  size?: "sm" | "md" | "lg";
  required?: boolean;
  type?: string;
  label?: string;
  name: string;
  disabled?: boolean;
}