import axios from "axios";
import { useEffect, useState } from "react";
import enviroment from "../enviroment";
import { useUserAuthContext } from "../providers/UserAuthProvider";
import { getErrorMsg } from "../utils/tsError";
import { WorkspaceReadOnly } from "../models/workspace";
import { useSearchParams } from "react-router-dom";

export const useWorkspaces = () => {
  const { getAccessToken } = useUserAuthContext();
  const [query, setSearchQuery] = useSearchParams();

  let filter = query.get("filter");
  filter = filter ? filter : "all";

  let page = <string | number>query.get("page");
  page = Number(page) || 1;

  const [workspaces, setWorkspaces] = useState<WorkspaceReadOnly[]>([]);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const getWorkspaces = async () => {
      try {
        const token = await getAccessToken();
        const res = await axios.get(`${enviroment.server_url}/workspaces`, {
          params: {
            filter,
            page,
          },
          headers: { Authorization: `Bearer ${token}` },
        });

        setWorkspaces(res.data.workspaces);
        setTotalPage(res.data.totalpages);
      } catch (error) {
        setError(getErrorMsg(error));
      }
    };

    getWorkspaces();
  }, [filter, page, getAccessToken]);

  return {
    workspaces,
    totalPage,
    setSearchQuery,
    filter,
    page,
    error,
  };
};
