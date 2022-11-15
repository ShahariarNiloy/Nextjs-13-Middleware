"use client";
import axios from "axios";
import React, { useState } from "react";
import { setCookies } from "cookies-next";

const Login = () => {
  const [emailState, setEmailState] = useState<string>("");
  const [passwordState, setPasswordState] = useState<string>("");

  async function loginUser(email: string, password: string) {
    console.log({ email, password });

    const body = { email, password };
    await axios
      .post("http://127.0.0.1:5000/auth/login", { email, password })
      .then((res: any) => {
        setCookies("accessToken", res.data.accessToken),
          setCookies("refreshToken", res.data.refreshToken);
      });
  }
  return (
    <div>
      <h1>Login Page</h1>
      Email:
      <input type="text" onChange={(e: any) => setEmailState(e.target.value)} />
      Password:
      <input
        type="password"
        onChange={(e: any) => setPasswordState(e.target.value)}
      />
      <button
        type="button"
        onClick={() => loginUser(emailState, passwordState)}
      >
        Submit
      </button>
    </div>
  );
};

export default Login;
