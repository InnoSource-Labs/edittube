import { useNavigate, useSearchParams } from "react-router-dom";
import { useUserAuthContext } from "../providers/UserAuthProvider";
import { useEffect } from "react";
import axios from "axios";
import enviroment from "../enviroment";

const Verify = () => {
  const [query, _] = useSearchParams();
  const navigate = useNavigate();
  const { getAccessToken } = useUserAuthContext();
  
  const state = query.get("state")
  const code = query.get("code")
  
  useEffect(() => {
    const verifyWorkspace = async () => {
      try {
        if (state && code) {
          const token = await getAccessToken();
          const res = await axios.get(`${enviroment.server_url}/workspaces/${state}/verify`, {
            params: {
              code
            },
            headers: { Authorization: `Bearer ${token}` },
          });
          navigate(`/workspace/${state}`, { replace: true });
      }
      } catch (error) {
        console.error();
      }
    };
    verifyWorkspace();
  }, [state, code, getAccessToken, navigate]);

  return <div className="text-xl text-center">Loading...</div>;
};

export default Verify;
