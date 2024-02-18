import classNames from "classnames";
import { FC, HTMLAttributes, PropsWithChildren } from "react";

interface PaperProps extends HTMLAttributes<HTMLDivElement> {}

const Paper: FC<PropsWithChildren<PaperProps>> = ({ children, className, ...props }) => (
  <div className={classNames("bg-[#232323] p-4 rounded-lg", className)} {...props}>
    {children}
  </div>
);

export default Paper;
