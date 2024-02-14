import { FC, PropsWithChildren } from "react";

const Container: FC<PropsWithChildren> = ({ children }) => (
  <div className="max-w-screen-lg m-auto">{children}</div>
);

export default Container;
