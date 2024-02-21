import classNames from "classnames";
import { FC, PropsWithChildren } from "react";
import { Link, LinkProps } from "react-router-dom";

interface AppLinkProps extends LinkProps {}

const AppLink: FC<PropsWithChildren<AppLinkProps>> = ({ className, children, ...props }) => (
  <Link className={classNames("text-main underline hover:text-white", className)} {...props}>
    {children}
  </Link>
);

export default AppLink;
