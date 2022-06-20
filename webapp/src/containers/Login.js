import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import LoginButton from "../components/LoginButton";
import { useRecoilState } from "recoil";
import { adminKey, reviewerInfo } from "./atoms";
const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [, setAdminCode] = useRecoilState(adminKey);
  const [, setReviewer] = useRecoilState(reviewerInfo);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let navigate = useNavigate();
  const onSubmit = (data) => {
    if (data.code === "L3Tz@admin") {
      setReviewer([]);
      setAdminCode(data.code);
      navigate("../config-questions", { replace: true });
    } else {
      setErrorMessage("Incorrect Code");
    }
  };

  return (
    <div className="text-center md:bg-blogging bg-contain bg-no-repeat bg-right-bottom h-screen">
      <div className="min-h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md bg-gray-50 w-full space-y-2 rounded-md md:border-2 md:p-12 p-6 md:shadow-lg">
          <div>
            <h2 className="text-center py-4 text-3xl font-extrabold text-gray-900">
              Admin Login
            </h2>
          </div>
          <form className="space-y-2 sm:px-0" onSubmit={handleSubmit(onSubmit)}>
            <div className="rounded-md ">
              <Input
                name="code"
                type="password"
                placeholder="Enter your code"
                className={`${
                  (errors.code && errors.code.message) ||
                  (errorMessage && "border-2 border-red-500")
                } text-center`}
                register={register}
                validation={{
                  required: {
                    value: true,
                    message: "Required Field",
                  },
                  min: 2,
                }}
                disable={false}
              />
            </div>
            <span className="text-red-700 text-xs">{errorMessage}</span>
            <div className="">
              <LoginButton buttonText={"Sign In"} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
