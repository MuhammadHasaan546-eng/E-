import { registerFromControls } from "./../../config/index.js";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import CommonFrom from "./../../components/common/From";
const initialState = {
  userName: "",
  email: "",
  password: "",
};

const handleSubmit = (data) => {};

const AuthRegister = () => {
  const [form, setForm] = useState(initialState);
  return (
    <div className="mx-auto w-full max-w-sm space-y-6  ">
      <div className="text-center ">
        <h1 className="font-bold text-3xl tracking-tight  text-foreground ">
          Create new account
        </h1>
        <p className="mt-2 ">
          Already have an account?
          <Link
            to={"/auth/login"}
            className="text-primary ml-2 font-medium  underline-offset-4 hover:underline  "
          >
            Login
          </Link>
        </p>
      </div>
      <CommonFrom
        fromControls={registerFromControls}
        buttonText="Sign up"
        formData={form}
        setFromData={setForm}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default AuthRegister;
