import React from "react";

const LoginButton = ({ buttonText }) => {
  return (
    <button
      type="submit"
      className={`w-full inline-block px-6 py-2.5 bg-amber-400	text-white font-medium text-xs leading-relax uppercase 
                  rounded shadow-md hover:bg-amber-500 hover:shadow-lg focus:bg-amber-500`}
    >
      {buttonText}
    </button>
  );
};

export default LoginButton;
