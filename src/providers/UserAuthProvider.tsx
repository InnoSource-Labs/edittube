/* eslint-disable react-refresh/only-export-components */
import { useAuth0 } from "@auth0/auth0-react";
import { UserInterface } from "../models/user";
import { createContext, useContext, useEffect, useState } from "react";
import enviroment from "../enviroment";
import axios from "axios";
import { getErrorMsg } from "../utils/tsError";

type ContextProviderProps = {
  children: React.ReactNode;
};

interface UserAuthContextInterface {
  user?: UserInterface;
  error?: string;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  getAccessToken: () => Promise<string>;
}

const UserAuthContext = createContext<UserAuthContextInterface | null>(null);

export const UserAuthProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  const {
    loginWithPopup,
    logout,
    isAuthenticated,
    isLoading,
    error: auth0Error,
    getAccessTokenSilently,
    user: auth0User,
  } = useAuth0();
  const [user, setUser] = useState<UserInterface>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (auth0Error?.message) {
      setError(auth0Error.message);
      setUser(undefined);
    }
  }, [auth0Error]);

  useEffect(() => {
    async function getUser() {
      try {
        if (auth0User?.sub) {
          const token = await getAccessTokenSilently();
          const res = await axios.post(
            `${enviroment.server_url}/users/loggedin`,
            {
              uid: auth0User.sub.split("|")[1],
              name: auth0User.name,
              email: auth0User.email,
              emailVerified: auth0User.email_verified,
              updatedAt: auth0User.updatedAt,
              nickname: auth0User.nickname,
              picture: auth0User.picture,
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          );

          if (res.status === 200 || res.status === 201) {
            setError(undefined);
            setUser(res.data as UserInterface);
          }
        }
      } catch (err) {
        setError(getErrorMsg(err));
        setUser(undefined);
      }
    }

    if (auth0User) {
      getUser();
    }
  }, [auth0User, getAccessTokenSilently]);

  const value: UserAuthContextInterface = {
    logout,
    login: loginWithPopup,
    getAccessToken: getAccessTokenSilently,
    isAuthenticated: isAuthenticated && !!user,
    isLoading,
    error,
    user,
  };

  return (
    <UserAuthContext.Provider value={value}>
      {children}
    </UserAuthContext.Provider>
  );
};

export function useUserAuthContext() {
  const context = useContext(UserAuthContext);

  if (!context) {
    throw new Error(
      "useUserAuthContext must be used within a UserAuthProvider",
    );
  }

  return context;
}
