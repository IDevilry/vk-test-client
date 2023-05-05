import { FC } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

type PrivateProps = {
  children: JSX.Element;
};

const PrivateWrapper: FC<PrivateProps> = ({ children }) => {
  const auth = useAuth();

  return auth ? children : <Navigate to="auth/login" replace />;
};

export default PrivateWrapper;
