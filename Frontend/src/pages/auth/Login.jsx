import { loginFromControls } from "./../../config/index.js";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CommonFrom from "./../../components/common/From";
import { useDispatch } from "react-redux";
import { loginUser } from "@/api/auth/login.js";
import { toast } from "sonner";
const initialState = {
  email: "",
  password: "",
};

const AuthLogin = () => {
  const [form, setForm] = useState(initialState);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleSubmit = (fromData) => {
    fromData.preventDefault();
    dispatch(loginUser(form)).then((data) => {
      if (data.payload.success) {
        toast.success(data?.payload?.message);
        navigate(location?.state?.from?.pathname || "/");
      } else {
        toast.warning(data?.payload?.message, { duration: 2000 });
      }
    });
    setForm(initialState);
  };
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
