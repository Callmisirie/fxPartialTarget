const Input = ({ label, value, placeholder, handleChange, array }) => {
  return (
    <>
      <div className="flex flex-col justify-center items-start w-full">
        {label && (
          <label className="font-mono text-xs uppercase text-n-2 font-semibold">
            {label}
          </label>
        )}
        <input
          className={`text-xs p-2.5 border border-stroke-1 ${
            array ? "w-[4rem]" : "w-[8rem]"
          } bg-transparent rounded-xl font-code`}
          inputMode="numeric"
          value={value.length <= 10 ? value : value.slice(0, 10)}
          onChange={(e) => {
            const inputValue = e.target.value;
            if (!inputValue || !isNaN(inputValue)) {
              if (inputValue.length <= 10) {
                handleChange(inputValue);
              }
            }
          }}
          placeholder={placeholder}
        />
      </div>
    </>
  );
};

export default Input;
