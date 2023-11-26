import { useNavigate, useParams } from "react-router-dom";
import { useUserAuthContext } from "../providers/UserAuthProvider";
import { useEffect } from "react";
import axios from "axios";

const Verify = () => {
  const { state, code } = useParams();
  const navigate = useNavigate();
  const { getAccessToken } = useUserAuthContext();

  useEffect(() => {
    if (state && code) {
      const verifyWorkspace = async () => {
        const token = await getAccessToken();
        await axios.get("/verify", {
          params: {
            state,
            code,
          },
          headers: { Authorization: `Bearer ${token}` },
        });
        navigate("/home", { replace: true });
      };

      verifyWorkspace();
    }
  }, [state, code, getAccessToken, navigate]);

  return <div className="text-xl text-center">Loading...</div>;
};

export default Verify;
