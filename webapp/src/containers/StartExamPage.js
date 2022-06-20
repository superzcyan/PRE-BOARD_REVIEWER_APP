import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { examItems, examStarted, timerStarted } from "./atoms";
import { useNavigate } from "react-router-dom";
import { RadioGroup } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/outline";
import PrimaryButton from "../components/PrimaryButton";
import Instructions from "./Instructions";
const StartExamPage = () => {
  let navigate = useNavigate();
  const [openModal, setModalOpen] = useState(true);
  const [, setIsExamStarted] = useRecoilState(examStarted);
  const [, setIsTimerStarted] = useRecoilState(timerStarted);
  const [examCount, setExamCount] = useRecoilState(examItems);
  const examCounts = ["50", "100", "150", "ALL"];

  const startExam = () => {
    setIsExamStarted(true);
    setIsTimerStarted(true);
    navigate("../questions", { replace: true });
  };
  return (
    <div className="flex justify-center md:items-center items-start pt-8 md:pt-0 lg:items-center sm:bg-working_late bg-contain bg-no-repeat bg-left-bottom h-screen text-gray-800">
      <div className="flex flex-col items-center w-full p-6">
        <div className="py-4 lg:text-xl font-bold">Choose number of items</div>
        <div className="sm:w-1/4 w-full">
          <RadioGroup value={examCount} onChange={setExamCount}>
            <div className="space-y-3">
              {examCounts.map((exCount) => (
                <RadioGroup.Option
                  key={exCount}
                  value={exCount}
                  className={({ active, checked }) =>
                    `${
                      active
                        ? "ring-2 ring-white ring-opacity-40 ring-offset-2 ring-offset-sky-500 "
                        : ""
                    }
                  ${checked ? "bg-sky-500 text-white" : "bg-white"}
                    relative flex cursor-pointer rounded-md px-5 py-1 focus:outline-none shadow-sm  focus:shadow-lg`
                  }
                >
                  {({ active, checked }) => (
                    <div className="flex w-full items-center justify-between">
                      <div className="shrink-0 text-white">
                        <CheckIcon className={`rounded-full h-7 w-7`} />
                      </div>
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium text-lg ${
                              checked ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {exCount}
                          </RadioGroup.Label>
                        </div>
                      </div>
                      <div className="w-4"></div>
                    </div>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        </div>
        <div className="sm:w-1/4 w-full mt-6">
          <PrimaryButton
            className="sm:text-xl text-lg"
            buttonText="Start Exam"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
            onClick={() => startExam()}
          />
        </div>
        <div>
          <button
            className="py-4 text-sm underline underline-offset-4"
            onClick={() => setModalOpen(true)}
          >
            View Instructions
          </button>
        </div>
      </div>

      <Instructions openModal={openModal} setModalOpen={setModalOpen} />
    </div>
  );
};

export default StartExamPage;
