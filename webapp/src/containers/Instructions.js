import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";

import PrimaryButton from "../components/PrimaryButton";

const Instructions = ({ openModal, setModalOpen }) => {
  let completeButtonRef = useRef(null);

  return (
    <Transition.Root show={openModal} as={Fragment}>
      <Dialog
        initialFocus={completeButtonRef}
        as="div"
        className="relative z-10"
        onClose={() => setModalOpen(true)}
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
              <Dialog.Panel className="relative bg-white  rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-xl sm:w-lg sm:w-full">
                <div className="bg-white w-full px-4 pt-8 pb-4 sm:p-6 sm:pb-4 text-xs ">
                  <h6 className="text-center font-medium leading-tight text-2xl md:text-3xl mt-0 mb-4 text-maroon">
                    Instructions
                  </h6>
                  <p className=" text-justify font-light leading-relaxed mt-0 mb-4 ">
                    This web application employs a multiple choice type of exam,
                    the same method used in taking a board examination. One
                    fundamental objective is to familiarize you with taking the
                    actual board review and exam. General instruction is to
                    select the best answer that suits the question/item. Just
                    click the bar of your chosen answer and tick the “submit”
                    button to proceed to the next question/item.
                  </p>
                  <p className=" text-justify font-light leading-relaxed mt-0 mb-4 ">
                    You can take the review at your own pace. There are no
                    limitations on how many items you would like to take as long
                    as you will able to finish the review. As the unified spaced
                    repetition and hypercorrection are integrated into this
                    application, you will swiftly receive feedback if your
                    answer is incorrect, and you will encounter the same
                    items/questions after a specific set of intervals. In this
                    case, the two techniques work in the sense that you will be
                    corrected the time you got a wrong answer, and you are
                    expected to get a correct answer when you encounter the same
                    items/questions again. You will not finish the review unless
                    you got all the correct answers.
                  </p>

                  <p className=" text-justify font-light leading-relaxed mt-0 mb-4 ">
                    A summary of the result may be viewed at the end of the
                    review. This contains the category of easy, moderate, and
                    hard items based on the time you spent answering a
                    particular question/statement. The result will show the
                    shortest and longest time taken in each category, as well as
                    the average time consumed by the reviewee. Time spent and
                    the number of attempts in every item are recorded and can be
                    seen in the result. The graph and percentage of your
                    completed review items will also be reflected.
                  </p>
                  <p className=" text-justify font-light leading-relaxed mt-0 mb-4 ">
                    Good luck and enjoy your review!
                  </p>
                </div>
                <div className="px-4 py-3 pb-4 sm:px-6 ">
                  <PrimaryButton
                    buttonText="OK"
                    type="button"
                    onClick={() => setModalOpen(false)}
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

export default Instructions;
