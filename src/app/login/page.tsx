"use client";
import { AuthForm } from "@/components/AuthForm";
import React from "react";
import style from "../signup/signup.module.scss";

const SignupPage: React.FC = () => {
  const handleSignup = async (data: {
    name?: string;
    email: string;
    password: string;
  }) => {
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Handle successful signup (e.g., redirect to login page or show a success message)
        console.log("User signed up successfully!");
      } else {
        // Handle error response
        console.error("Signup failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <section className={style["auth-page"]}>
      <div className="auth-page-form">
        <AuthForm heading="Log In" mode="login" onSubmit={handleSignup} />
      </div>

      <div className="auth-page-design">
        <div className="rectangle">
          <div className="half top-left"></div>
          <div className="half bottom-right"></div>
          {/* <div className="half title">Awesome Application</div> */}
        </div>
      </div>
    </section>
  );
};

export default SignupPage;
