import { useState } from "react";

const Input = ({
  name,
  type = "text",
  className,
  placeholder = "Type here",
  preIcon: Component,
  register,
  validation,
  disable = false,
}) => {
  const [focus, setFocus] = useState(false);
  return (
    <div className="space-y-1 w-full">
      <div className="relative flex items-center w-full">
        {Component && (
          <Component
            className={`h-5 w-5 absolute z-20 ml-2 ${
              focus ? "text-blue-400" : "text-gray-400"
            }`}
          />
        )}
        <input
          type={type}
          name={name}
          className={`${className} appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
          onFocus={() => {
            setFocus(true);
          }}
          disabled={disable}
          placeholder={placeholder}
          {...register(name, validation)}
        />
      </div>
    </div>
  );
};
export default Input;
