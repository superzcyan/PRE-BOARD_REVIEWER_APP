/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  CogIcon,
  LibraryIcon,
  LightningBoltIcon,
  LogoutIcon,
  MenuIcon,
  UserCircleIcon,
} from "@heroicons/react/outline";
import { Link, NavLink } from "react-router-dom";
import { adminKey, examStarted, reviewerInfo } from "./atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import bped_logo from "../assets/bpedlogo.png";

const dummyNavigation = [
  { name: "Home", to: "/" },
  { name: "About", to: "/about" },
  { name: "Contact Us", to: "/contactus" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar() {
  let navigate = useNavigate();
  const [examHasStarted, setExamHasStarted] = useRecoilState(examStarted);
  const [reviewer, setReviewer] = useRecoilState(reviewerInfo);
  const [adminCode, setAdminCode] = useRecoilState(adminKey);
  const navItems = dummyNavigation;
  const logOut = () => {
    setExamHasStarted(false);
    setReviewer([]);
    setAdminCode("");
    navigate("../reviewer-info", { replace: true });
  };
  const adminLogOut = () => {
    setAdminCode("");
    navigate("../login", { replace: true });
  };
  return (
    <Disclosure as="nav" className="md:shadow-lg">
      {({ open }) => (
        <>
          <div className="mx-auto">
            <div className="relative flex items-center sm:px-16 sm:justify-between justify-around h-16 text-maroon font-semibold">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-900 hover:bg-gray-400  focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500">
                  <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                </Disclosure.Button>
              </div>
              <div className="flex items-center text-gray-900 justify-center sm:justify-start">
                <div className="hidden sm:block ">
                  <a href="/">
                    <img src={bped_logo} alt="Logo" className="h-14 w-14" />
                  </a>
                </div>

                <div className="hidden sm:block sm:ml-10">
                  <div className="flex items-center space-x-6">
                    {dummyNavigation.map((item) => (
                      <NavLink
                        as="div"
                        key={item.name}
                        to={item.to}
                        style={({ isActive }) =>
                          isActive
                            ? {
                                color: "white",
                                backgroundColor: "#fbbf24",
                              }
                            : {}
                        }
                        className={
                          "text-gray-700 text-md hover:text-white hover:bg-amber-400 p-2 rounded "
                        }
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>

              <div className="absolute space-x-2 z-10 inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {!examHasStarted && reviewer.name && (
                  <div className="flex text-sm rounded text-gray-700 hover:bg-amber-400 hover:text-white p-2 px-4">
                    <NavLink as="div" to="/start-exam">
                      Exam
                    </NavLink>
                  </div>
                )}
                {!reviewer.name && (
                  <div className="flex text-sm rounded text-white hover:bg-amber-500 bg-amber-400 p-2 px-4">
                    <NavLink as="div" to="/reviewer-info">
                      Login
                    </NavLink>
                  </div>
                )}
                {/*Reviewee Profile dropdown */}
                {reviewer.name && (
                  <Menu as="div" className="ml-3 relative">
                    <div>
                      <Menu.Button className="flex text-sm rounded-md hover:bg-gray-500 hover:bg-opacity-25 p-2">
                        <UserCircleIcon
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
                            {reviewer.name ? (
                              <div className="space-y-3 divide-y">
                                <div className="space-y-2">
                                  <div className="flex flex-row justify-start items-center space-x-2 ">
                                    <UserCircleIcon className="text-gray-600 h-5 w-5" />
                                    <div> {reviewer.name}</div>
                                  </div>
                                  <div className="flex flex-row justify-start items-center space-x-2 ">
                                    <LibraryIcon className="text-gray-600 h-5 w-5" />
                                    <div>
                                      {reviewer.institution
                                        ? reviewer.institution
                                        : "Institution is undefined"}
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="flex flex-row justify-start items-center 
                                hover:text-amber-500 hover:font-medium cursor-pointer space-x-2 pt-2"
                                  onClick={() => logOut()}
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
                )}
                {/*Admin Profile dropdown */}
                {adminCode && (
                  <div className="flex text-sm text-gray-600 rounded-md hover:text-maroon hover:bg-gray-500 hover:bg-opacity-25 py-2 px-4">
                    <NavLink as="div" to="/config-questions">
                      Configuration
                    </NavLink>
                  </div>
                )}
                {!reviewer.name && (
                  <Menu as="div" className="ml-3 relative">
                    <div>
                      <Menu.Button className="flex text-sm rounded-md hover:bg-gray-500 hover:bg-opacity-25 p-2">
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
                )}
              </div>
            </div>
          </div>
          {/* Mobile mode menu */}
          <Disclosure.Panel className="sm:hidden shadow-lg rounded ">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="div"
                  className={classNames(
                    item.current
                      ? "bg-amber-400 text-white"
                      : "text-maroon hover:bg-amber-400  text-white hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  <Link to={item.to}>{item.name}</Link>
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
