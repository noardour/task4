import { FC, PropsWithChildren } from "react";

const PreloaderFrame: FC<PropsWithChildren> = ({ children }) => (
  <div className="relative">
    <div className="absolute w-full h-full top-0 left-0 bg-[#4444] flex justify-center items-center">
      <div className="text-2xl font-bold">Loading...</div>
    </div>
    {children}
  </div>
);

interface PreloaderProps {
  showing?: boolean;
}

const Preloader: FC<PropsWithChildren<PreloaderProps>> = ({ showing, children }) => {
  const Rendered = showing ? <PreloaderFrame>{children}</PreloaderFrame> : children;

  return Rendered;
};

export default Preloader;
