import classNames from "classnames";
import { FC, HTMLAttributes, PropsWithChildren } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {}

const Container: FC<PropsWithChildren<ContainerProps>> = ({ children, className, ...props }) => (
  <div className={classNames("max-w-screen-lg m-auto", className)} {...props}>
    {children}
  </div>
);

export default Container;
