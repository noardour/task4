import { ButtonHTMLAttributes, FC, PropsWithChildren } from "react";

type ButtonColors = "main" | "error";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: ButtonColors;
}

const Button: FC<PropsWithChildren<ButtonProps>> = ({ children, color = "main", onClick }) => {
  return (
    <button
      className={`p-2 px-4 rounded-lg bg-${color}-idle font-semibold uppercase text-white text-[16px] transition hover:bg-${color} hover:shadow-${color} hover:shadow-md`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
