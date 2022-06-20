import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  CogIcon,
  LightningBoltIcon,
  LogoutIcon,
} from "@heroicons/react/outline";
import PrimaryButton from "../components/PrimaryButton";
import { adminKey } from "./atoms";
import { useRecoilState } from "recoil";
const Main = () => {
  const [adminCode, setAdminCode] = useRecoilState(adminKey);

  let navigate = useNavigate();
  const getStarted = () => {
    navigate("../reviewer-info", { replace: true });
  };

  const adminLogOut = () => {
    setAdminCode("");
    navigate("/", { replace: true });
  };
  return (
    <section
      className="h-full w-full md:bg-detailed_exam 
      md:bg-right-bottom lg:bg-contain bg-no-repeat bg-bottom bg-right-bottom"
    >
      <div className="flex justify-end items-center md:pr-16 p-4">
        <Menu as="div" className="ml-3 relative">
          <div>
            <Menu.Button className="flex text-sm rounded-md hover:bg-gray-900 hover:bg-opacity-25  p-2">
              <CogIcon
                className="h-6 w-6 stroke-gray-900 hover:text-white"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-max rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                <div className="block px-4 py-2 text-xs text-maroon">
                  {adminCode ? (
                    <div className="space-y-3 divide-y">
                      <div className="space-y-2">
                        <div className="flex flex-row justify-start items-center space-x-2 ">
                          <LightningBoltIcon className="text-gray-600 h-5 w-5" />
                          <div>Admin</div>
                        </div>
                      </div>
                      <div
                        className="flex flex-row justify-start items-center 
                                hover:text-amber-500 hover:font-medium cursor-pointer space-x-2 pt-2"
                        onClick={() => adminLogOut()}
                      >
                        <LogoutIcon className="h-5 w-5 " />
                        <div>Log Out</div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      to="/login"
                      className="hover:text-amber-500 hover:font-medium "
                    >
                      Switch as Admin
                    </Link>
                  )}
                </div>
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      <div
        className="flex justify-start py-2 
         lg:items-center md:px-6 px-5 text-gray-900 container "
      >
        <div className="flex flex-col justify-center lg:w-2/3 xl:w-2/3 xl:pl-52">
          <div className="py-6">
            <div className="md:text-7xl text-5xl font-bold lg:tracking-wider text-logo">
              <div className="">Welcome to</div>
              <div className="text-maroon">
                LET<span className="text-gray-900">'s</span> Review in MAPEH
              </div>
            </div>
            <div className="md:text-xl text-md font-bold lg:tracking-wide ">
              A Board Examination Reviewer Web Application
            </div>
          </div>
          <div className="space-y-4 text-sm sm:text-md xl:pr-28">
            <p className="md:text-justify leading-relaxed">
              This electronic reviewer applies spaced repetition and
              hypercorrection, a technique that helps students to easily learn
              their review materials and acquire better information by
              immediately getting feedback on the correct and incorrect answers.
              The aim was set to augment the latest concepts of MAPEH in the
              board licensure examination for professional teachers. The
              database of this application is provided at the end of the
              examination.
            </p>

            <p>Enjoy your review and happy learning!</p>
            <div className="flex sm:pt-12 pt-4 w-full">
              <div className="sm:w-1/2 w-full">
                <PrimaryButton
                  className="w-full sm:h-14 sm:text-lg sm:text-2xl text-lg"
                  buttonText={"Get Started"}
                  onClick={() => getStarted()}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Main;
