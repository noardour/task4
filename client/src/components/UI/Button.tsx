import classNames from "classnames";
import { ButtonHTMLAttributes, FC, PropsWithChildren } from "react";

type ButtonColors = "main" | "error";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: ButtonColors;
}

const Button: FC<PropsWithChildren<ButtonProps>> = ({ className, children, color = "main", ...props }) => {
  return (
    <button
      className={classNames("p-2 px-4 rounded-lg font-semibold uppercase text-white text-[16px] transition hover:shadow-blur", className, {
        "bg-main-idle hover:bg-main hover:shadow-main": color == "main",
        "bg-error-idle hover:bg-error hover:shadow-error": color == "error",
      })}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
