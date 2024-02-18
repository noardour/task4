import { FC, PropsWithChildren } from "react";

const Paper: FC<PropsWithChildren> = ({ children }) => <div className="bg-[#232323] p-4 rounded-lg">{children}</div>;

export default Paper;
