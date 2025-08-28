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

export interface IPolitical {
  _id: string;
  user: IUser;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  bio?: string;
  profilePicture?: string;
  socialLinks?: {
    facebook?: string;
    youtube?: string;
    instagram?: string;
    twitter?: string;
  };
  domain: string;
  position: string;
  address: string;
  emailJs?: {
    serviceId?: string;
    templateId?: string;
    publicKey?: string;
    toEmail?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface IPoliticalUpdateData {
  name?: string;
  email?: string;
  phone?: string;
  dateOfBirth?: string;
  bio?: string;
  profilePicture?: string;
  socialLinks?: {
    facebook?: string;
    youtube?: string;
    instagram?: string;
    twitter?: string;
  };
  domain?: string;
  position?: string;
  address?: string;
  emailJs?: {
    serviceId?: string;
    templateId?: string;
    publicKey?: string;
    toEmail?: string;
  };
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