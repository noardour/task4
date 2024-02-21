import classNames from "classnames";
import { FC, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  type?: "text" | "email" | "password";
}

const Input: FC<InputProps> = ({ className, error, label, value, onInput, ...props }) => {
  return (
    <label className="flex flex-col align-start">
      {label && <div>{label}</div>}
      <input
        className={classNames(
          "p-2 px-4 rounded-lg text-[16px] bg-[#1b1b1b] transition-colors focus-visible:shadow-blur border-2 outline-none",
          className,
          {
            "text-white border-main-idle focus-visible:border-main focus-visible:drop focus-visible:shadow-main": !error,
            "border-error text-error": error,
          }
        )}
        value={value}
        onInput={onInput}
        {...props}
      />
      {error && <div className="text-error">{error}</div>}
    </label>
  );
};

export default Input;
