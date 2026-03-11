import { registerFromControls } from "./../../config/index.js";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CommonFrom from "./../../components/common/From";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { registerUser } from "@/api/auth/register.js";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

const AuthRegister = () => {
  const [form, setForm] = useState(initialState);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  const handleSubmit = (submittedForm) => {
    dispatch(registerUser(submittedForm)).then((data) => {
      if (data?.payload?.success) {
        toast.success(data?.payload?.message || "Registration Successful!");

        // Form ko reset sirf success par karein
        setForm(initialState);

        // Redirect to login
        navigate("/auth/login", { replace: true });
      } else {
        // Agar error aaye toh navigate karne ki zaroorat nahi, sirf toast dikhayein
        toast.error(data?.payload?.message || "Something went wrong", {
          duration: 2000,
        });
      }
    });
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
        isLoading={isLoading}
      />
    </div>
  );
};

export default AuthRegister;
