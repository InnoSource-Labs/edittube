import axios from "axios";
import { useEffect, useState } from "react";
import enviroment from "../enviroment";
import { useUserAuthContext } from "../providers/UserAuthProvider";
import { getErrorMsg } from "../utils/tsError";
import { WorkspaceFilters, WorkspaceReadOnly } from "../models/workspace";

export const useWorkspaces = () => {
  const { user, getAccessToken } = useUserAuthContext();

  const [workspaces, setWorkspaces] = useState<WorkspaceReadOnly[]>([]);
  const [filter, setFilter] = useState<WorkspaceFilters>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const getWorkspaces = async () => {
      try {
        const token = await getAccessToken();
        const res = await axios.get(`${enviroment.server_url}/workspaces`, {
          params: {
            uid: user?.uid,
            filter,
          },
          headers: { Authorization: `Bearer ${token}` },
        });

        setWorkspaces(res.data.workspaces);
        setCurrentPage(res.data.currentpage);
        setTotalPage(res.data.totalpages);
      } catch (error) {
        setError(getErrorMsg(error));
      }
    };

    getWorkspaces();
  }, [filter, getAccessToken, user?.uid]);

  const getMoreWorkspaces = async () => {
    try {
      const token = await getAccessToken();
      const res = await axios.get(`${enviroment.server_url}/workspaces`, {
        params: {
          uid: user?.uid,
          filter,
          page: currentPage + 1,
        },
        headers: { Authorization: `Bearer ${token}` },
      });

      setWorkspaces(workspaces?.concat(res.data.workspaces));
      setCurrentPage(res.data.currentpage);
      setTotalPage(res.data.totalpages);
    } catch (error) {
      setError(getErrorMsg(error));
    }
  };

  return {
    workspaces,
    currentPage,
    totalPage,
    filter,
    setFilter,
    getMoreWorkspaces,
    error,
  };
};
