import { type FC } from "react";

const OnlyPosts: FC<{ children: JSX.Element }> = ({ children }) => {
  return <div className="container">{children}</div>;
};

export default OnlyPosts;
