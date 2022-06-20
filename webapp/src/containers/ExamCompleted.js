import React from "react";
import PrimaryButton from "../components/PrimaryButton";
import { useNavigate } from "react-router-dom";

const ExamCompleted = () => {
  let navigate = useNavigate();

  return (
    <div className="flex items-center flex-col justify-center lg:bg-partying bg-no-repeat bg-contain bg-right-bottom h-full px-4">
      <div className="">
        <div className={`text-center text-3xl sm:text-5xl py-8 text-bold`}>
          EXAM COMPLETED
        </div>
        <div className="w-full px-4">
          <PrimaryButton
            buttonText="VIEW SUMMARY"
            type="button"
            onClick={() => navigate("../exam-summary", { replace: true })}
          />
        </div>
      </div>
    </div>
  );
};

export default ExamCompleted;
