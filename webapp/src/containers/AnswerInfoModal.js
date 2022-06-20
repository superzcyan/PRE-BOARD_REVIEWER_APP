import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";
import { ReactComponent as CheckSVG } from "../assets/checked-svg.svg";
import { ReactComponent as CancelSVG } from "../assets/cancel-svg.svg";

import PrimaryButton from "../components/PrimaryButton";

const AnswerInfoModal = ({
  selectedChoice,
  correctChoice,
  onClickAnsModal,
  answerModal,
  setAnswerModal,
}) => {
  let completeButtonRef = useRef(null);
  return (
    <Transition.Root show={answerModal} as={Fragment}>
      <Dialog
        initialFocus={completeButtonRef}
        as="div"
        className="relative z-10"
        onClose={() => setAnswerModal(true)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className="relative bg-white text-gray-800 rounded-lg text-left
               overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-xl sm:w-lg w-full"
              >
                <div className="bg-white w-full px-4 pt-8 pb-4 sm:p-6 sm:pb-4 ">
                  {selectedChoice.isCorrect ? (
                    <div className="flex flex-col justify-center items-center w-full space-y-2">
                      <CheckSVG className="h-32 w-32" />
                      <div className="text-2xl font-medium">Correct!</div>
                    </div>
                  ) : (
                    <div className="flex flex-col justify-start items-center w-full space-y-2">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <CancelSVG className="h-32 w-32" />
                        <div className="text-xl font-medium">Incorrect</div>
                      </div>

                      <div className="flex  w-full items-center">
                        <p>
                          Correct answer is
                          <span className="text-lg text-cyan-500 ml-1 font-medium">
                            {correctChoice.choice}
                          </span>
                        </p>
                      </div>
                      <div className="w-full pt-4">
                        {correctChoice.description}
                      </div>
                    </div>
                  )}
                </div>
                <div className="px-4 py-3 pb-4 sm:px-6 ">
                  <PrimaryButton
                    buttonText="OK"
                    type="button"
                    onClick={() => onClickAnsModal()}
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default AnswerInfoModal;
