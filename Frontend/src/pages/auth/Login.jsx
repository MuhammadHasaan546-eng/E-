import { loginFromControls } from "./../../config/index.js";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import CommonFrom from "./../../components/common/From";
const initialState = {
  email: "",
  password: "",
};

const handleSubmit = (data) => {};

const AuthLogin = () => {
  const [form, setForm] = useState(initialState);
  return (
    <div className="mx-auto w-full max-w-sm space-y-6  ">
      <div className="text-center ">
        <h1 className="font-bold text-3xl tracking-tight  text-foreground ">
          Sing In your account
        </h1>
        <p className="mt-2 ">
          Don't have an account?
          <Link
            to={"/auth/register"}
            className="text-primary ml-2 font-medium  underline-offset-4 hover:underline  "
          >
            Register
          </Link>
        </p>
      </div>
      <CommonFrom
        fromControls={loginFromControls}
        buttonText=" Sign in"
        formData={form}
        setFromData={setForm}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default AuthLogin;
