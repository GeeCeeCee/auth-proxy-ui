"use client";
import React from "react";
import style from "./dashboard.module.scss";
import { FaUser } from "react-icons/fa";
import HTTP from "@/utils/http";
import { useRouter } from "next/navigation";
import { ThreeDots } from "react-loader-spinner";

const SignupPage: React.FC = () => {
  const [userDetails, setUserDetails] = React.useState<{
    name: string;
    email: string;
  } | null>(null);
  const router = useRouter();
  const [isEmpty, setEmpty] = React.useState(true);

  React.useEffect(() => {
    const email = localStorage.getItem("email");
    const token = localStorage.getItem("accessToken");

    if (
      email == null ||
      email.length === 0 ||
      token == null ||
      token.length === 0
    ) {
      router.push("/login");
      return;
    }

    console.log({ email, token });
    const http = HTTP().get(
      "/api/details",
      {
        email,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    http
      .then((response) => {
        console.log(response);
        setUserDetails(response.data.data);
      })
      .finally(() => setEmpty(false));
  }, []);

  const handleLogout = () => {
    localStorage.setItem("accessToken", "");
    localStorage.setItem("email", "");

    router.push("/login");
  };

  return (
    <section className={style["auth-page"]}>
      <div className="auth-page-design">
        <div className="rectangle">
          <div className="half top-left"></div>
          <div className="half bottom-right"></div>
        </div>
      </div>

      {isEmpty ? (
        <div style={{ margin: "auto" }}>
          <ThreeDots color="#00BFFF" height={80} width={80} />
        </div>
      ) : (
        <div className="user-details">
          <section className="title">Welcome to the Application</section>
          <div className="user-box">
            {!isEmpty && userDetails?.name && userDetails?.email ? (
              <>
                <FaUser className="icon" />
                <div className="name">{userDetails.name}</div>
                <div className="email">{userDetails.email}</div>
                <div className="logout" onClick={handleLogout}>
                  Logout
                </div>
              </>
            ) : (
              <>No User Found</>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default SignupPage;
