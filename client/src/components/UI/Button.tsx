import { FC, PropsWithChildren } from "react";

type ButtonColors = "default" | "red";

interface ButtonProps {
  color?: ButtonColors;
}

const colors = {
  default: {
    idle: "#343e49",
    active: "#61dafb",
  },
  red: {
    idle: "#493434",
    active: "#fb6161",
  },
};

const Button: FC<PropsWithChildren<ButtonProps>> = ({
  children,
  color = "default",
}) => {
  const idleColor = colors[color].idle;
  const activeColor = colors[color].active;

  return (
    <button
      className={`p-2 px-4 rounded-lg bg-[${idleColor}] font-semibold uppercase text-white text-[16px] transition hover:bg-[${activeColor}] hover:shadow-[${activeColor}] hover:shadow-md`}
    >
      {children}
    </button>
  );
};

export default Button;
