import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import enviroment from "../enviroment";
import { getErrorMsg } from "../utils/tsError";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUserAuthContext } from "../providers/UserAuthProvider";

const Verify = () => {
  const navigate = useNavigate();
  const [query] = useSearchParams();

  const { getAccessToken } = useUserAuthContext();

  const state = query.get("state");
  const code = query.get("code");

  useEffect(() => {
    const verifyWorkspace = async () => {
      if (state && code) {
        try {
          const token = await getAccessToken();
          await axios.get(
            `${enviroment.server_url}/workspaces/${state}/verify`,
            {
              params: {
                code,
              },
              headers: { Authorization: `Bearer ${token}` },
            },
          );
        } catch (error) {
          toast.error(getErrorMsg(error));
        }
      }
      navigate(`/workspace/${state}`, { replace: true });
    };

    verifyWorkspace();
  }, [state, code, getAccessToken, navigate]);

  return <div className="text-xl text-center">Loading...</div>;
};

export default Verify;
