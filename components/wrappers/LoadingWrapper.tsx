import React from "react";
import { Spinner } from "../ui/spinner";
type Props = {
  isLoading: boolean;
  children: React.ReactNode;
};

function LoadingWrapper({ isLoading, children }: Props) {
  return (
    <>
      {isLoading ? (
        <div className="w-full h-full flex">
          <Spinner className="size-20 m-auto" />
        </div>
      ) : (
        children
      )}
    </>
  );
}

export default LoadingWrapper;
