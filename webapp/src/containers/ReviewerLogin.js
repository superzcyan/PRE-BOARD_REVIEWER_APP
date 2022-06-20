import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import LoginButton from "../components/LoginButton";
import { adminKey, reviewerInfo } from "./atoms";
import { useRecoilState } from "recoil";

const ReviewerLogin = () => {
  let navigate = useNavigate();
  const [reviewee, setReviewerInfos] = useRecoilState(reviewerInfo);
  const [, setAdminCode] = useRecoilState(adminKey);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (reviewee.name) {
      navigate("../start-exam", { replace: true });
    }
  }, [navigate, reviewee.name]);

  const onSubmit = (data) => {
    setAdminCode();
    setReviewerInfos({ name: data.name, institution: data.institution });
    navigate("../start-exam", { replace: true });
  };

  return (
    <div className="text-center md:bg-student_reading bg-contain bg-no-repeat bg-left-bottom h-screen">
      <div className="min-h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md bg-gray-50 w-full space-y-2 rounded-md md:border-2 md:p-12 p-6 md:shadow-lg">
          <div>
            <h2 className="text-center py-4 text-2xl font-extrabold text-gray-900">
              Reviewee Information
            </h2>
          </div>
          <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
            <div className="rounded-sm space-y-2">
              {errors.name && (
                <span className="text-red-500 italic text-xs px-2">
                  {errors.name.message}
                </span>
              )}
              <Input
                name="name"
                type="text"
                placeholder="Name"
                disable={false}
                register={register}
                className={
                  errors.name &&
                  errors.name.message &&
                  "border-2 border-red-500 "
                }
                validation={{
                  required: {
                    value: true,
                    message: "Required Field",
                  },
                  min: {
                    value: 2,
                    message: "Please enter a valid name",
                  },
                }}
              />

              <Input
                name="institution"
                type="text"
                placeholder="Institution"
                disable={false}
                register={register}
              />
            </div>
            <div>
              <LoginButton buttonText={"Continue"} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewerLogin;
