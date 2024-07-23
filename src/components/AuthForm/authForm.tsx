// components/AuthForm.tsx

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { AuthFormData, AuthFormProps } from "./authForm.interface";
import { loginSchema, signupSchema } from "./schema";
import style from "./authForm.module.scss";

const AuthForm: React.FC<AuthFormProps> = ({
  heading,
  mode,
  onSubmit,
  errorMessage,
  isProcessing,
}) => {
  const schema = mode === "signup" ? signupSchema : loginSchema;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: yupResolver(schema),
  });

  return (
    <div className={style["auth-form"]}>
      {heading && <h2 className="form-heading">{heading}</h2>}
      <form onSubmit={handleSubmit(onSubmit)}>
        {mode === "signup" && (
          <div className="form-section">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" {...register("name")} />
            {errors.name && <p>{errors.name.message}</p>}
          </div>
        )}
        <div className="form-section">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" {...register("email")} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div className="form-section">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" {...register("password")} />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <button className="submit-button" type="submit" disabled={isProcessing}>
          {mode === "signup" ? "Sign Up" : "Login"}
        </button>

        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </form>
    </div>
  );
};

export default AuthForm;
