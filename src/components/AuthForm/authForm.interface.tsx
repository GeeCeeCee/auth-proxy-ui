import { SubmitHandler } from "react-hook-form";

export interface AuthFormData {
  name?: string;
  email: string;
  password: string;
}

export interface AuthFormProps {
  heading?: string;
  mode: "signup" | "login";
  errorMessage: string | null;
  onSubmit: SubmitHandler<AuthFormData>;
  isProcessing: boolean;
}
