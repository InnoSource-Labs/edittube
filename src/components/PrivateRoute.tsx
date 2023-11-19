import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth0();

  return !isLoading && isAuthenticated ? (
    children
  ) : (
    <Navigate replace to={{ pathname: "/" }} />
  );
};

export default PrivateRoute;
