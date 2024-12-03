"use client";
import { AuthForm } from "@/components/AuthForm";
import React from "react";
import style from "./signup.module.scss";
import HTTP from "@/utils/http";
import { useRouter } from "next/navigation";

const SignupPage: React.FC = () => {
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [isProcessing, setProcessing] = React.useState(false);
  const router = useRouter();

  const handleSignup = async (data: {
    name?: string;
    email: string;
    password: string;
  }) => {
    try {
      setProcessing(true);
      const response = await HTTP().post("/api/signup", data);

      if (response.status !== 201 || response.data.status !== 201) {
        setErrorMessage("User could not be created.");
        setProcessing(false);
        return;
      }
      const { accessToken } = response.data.data;
      localStorage.setItem("accessToken", accessToken);
      setErrorMessage(null);
      router.push("/login");
    } catch (error) {
      console.error("An error occurred:", error);
      setErrorMessage("Unknown error. Please try after some time");
      setProcessing(false);
    }
  };

  return (
    <section className={style["auth-page"]}>
      <div className="auth-page-form">
        <AuthForm
          heading="Sign Up"
          mode="signup"
          onSubmit={handleSignup}
          errorMessage={errorMessage}
          isProcessing={isProcessing}
        />
      </div>

      <div className="auth-page-design">
        <div className="rectangle">
          <div className="half top-left"></div>
          <div className="half bottom-right"></div>
        </div>
      </div>
    </section>
  );
};

export default SignupPage;
