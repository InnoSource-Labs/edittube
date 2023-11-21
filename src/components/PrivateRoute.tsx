import { Navigate } from "react-router-dom";
import { useUserAuthContext } from "../providers/UserAuthProvider";

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { isLoading, isAuthenticated, error } = useUserAuthContext();

  return isLoading ? (
    <></>
  ) : !error && isAuthenticated ? (
    children
  ) : (
    <Navigate replace to={{ pathname: "/" }} />
  );
};

export default PrivateRoute;
