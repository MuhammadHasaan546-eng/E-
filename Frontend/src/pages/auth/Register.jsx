import { registerFromControls } from "./../../config/index.js";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CommonFrom from "./../../components/common/From";
import { useDispatch } from "react-redux";
import { registerUser } from "@/store/auth-slice/index.js";
import { toast } from "sonner";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

const AuthRegister = () => {
  const [form, setForm] = useState(initialState);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (data) => {
    data.preventDefault();
    dispatch(registerUser(form)).then((data) => {
      if (data?.payload?.success) {
        toast.success(data?.payload?.message);
        navigate("/auth/login");
      }
      console.log(data);
    });

    setForm(initialState);
  };

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
