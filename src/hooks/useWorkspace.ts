import { useUserAuthContext } from "../providers/UserAuthProvider";
import { useEffect, useState } from "react";
import { WorkspaceReadOnly } from "../models/workspace";
import axios from "axios";
import enviroment from "../enviroment";
import { getErrorMsg } from "../utils/tsError";

export const useWorkspace = (id?: string) => {
  const { getAccessToken } = useUserAuthContext();

  const [workspace, setWorkspace] = useState<WorkspaceReadOnly>();
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const getWorkspaceData = async () => {
      try {
        const token = await getAccessToken();
        const headers = { Authorization: `Bearer ${token}` };
        const res = await axios.get(
          `${enviroment.server_url}/workspaces/${id}`,
          { headers },
        );
        setWorkspace(res.data);
      } catch (error) {
        setError(getErrorMsg(error));
      }
    };
    getWorkspaceData();
  }, [id, getAccessToken]);

  return {
    workspace,
    error,
  };
};
