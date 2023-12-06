import React from "react";

type Props = {
  children: React.ReactNode;
};

const Container = ({ children }: Props) => {
  return <div className="container mx-auto px-4 my-6">{children}</div>;
};
export default Container;
