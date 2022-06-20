const PrimaryButton = ({ buttonText, disabled, onClick, icon, className }) => {
  return (
    <div className="flex flex-row items-center space-x-2 justify-center w-full">
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        // data-mdb-ripple="true"
        // data-mdb-ripple-color="light"
        className={`${className} ${
          icon && "flex flex-row items-center"
        } w-full inline-block px-6 py-2.5 bg-amber-400	text-white font-medium sm:text-sm text-xs leading-tight uppercase 
                  rounded shadow-md hover:bg-amber-500 hover:shadow-lg `}
      >
        {icon}
        {buttonText}
      </button>
    </div>
  );
};
export default PrimaryButton;
