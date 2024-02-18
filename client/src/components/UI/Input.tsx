import classNames from "classnames";
import { FC, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input: FC<InputProps> = ({ error, value, onInput }) => {
  return (
    <input
      className={classNames("p-2 px-4 rounded-lg text-[16px] bg-[#1b1b1b] transition-colors focus-visible:shadow-blur border-2 outline-none", {
        "text-white border-main-idle focus-visible:border-main focus-visible:drop focus-visible:shadow-main": !error,
        "border-error text-error": error,
      })}
      type="text"
      value={value}
      onInput={onInput}
    />
  );
};

export default Input;
