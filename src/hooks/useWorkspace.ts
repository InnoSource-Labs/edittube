import { useParams } from "react-router-dom";
import { useUserAuthContext } from "../providers/UserAuthProvider";
import { useEffect, useState } from "react";
import { WorkspaceReadOnly } from "../models/workspace";
import { VideoFilters, VideoInterface } from "../models/video";
import axios from "axios";
import enviroment from "../enviroment";
import { getErrorMsg } from "../utils/tsError";

export const useWorkspace = () => {
  const id = useParams().id;
  const { getAccessToken } = useUserAuthContext();

  const [error, setError] = useState<string>("");
  const [workspace, setWorkspace] = useState<WorkspaceReadOnly>();
  const [videos, setVideos] = useState<VideoInterface[]>([]);
  const [filter, setFilter] = useState<VideoFilters>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);

  useEffect(() => {
    const getWorkspaceData = async () => {
      try {
        const token = await getAccessToken();
        const headers = { Authorization: `Bearer ${token}` };
        const res = await axios.get(
          `${enviroment.server_url}/workspaces/${id}`,
          {
            headers,
          },
        );
        const videosRes = await axios.get(
          `${enviroment.server_url}/workspaces/${id}/videos`,
          {
            params: {
              filter,
            },
            headers,
          },
        );
        setWorkspace(res.data);
        setVideos(videosRes.data.videos);
        setCurrentPage(videosRes.data.currentpage);
        setTotalPage(videosRes.data.totalpages);
      } catch (error) {
        setError(getErrorMsg(error));
      }
    };
    getWorkspaceData();
  }, [id, getAccessToken, filter]);

  const getMoreVideos = async () => {
    try {
      const token = await getAccessToken();
      const headers = { Authorization: `Bearer ${token}` };
      const videosRes = await axios.get(
        `${enviroment.server_url}/workspaces/${id}/videos`,
        {
          params: {
            filter,
            page: currentPage + 1,
          },
          headers,
        },
      );
      setVideos(videos.concat(videosRes.data.videos));
      setCurrentPage(videosRes.data.currentpage);
      setTotalPage(videosRes.data.totalpages);
    } catch (error) {
      setError(getErrorMsg(error));
    }
  };

  return {
    workspace,
    filter,
    setFilter,
    videos,
    getMoreVideos,
    id,
    totalPage,
    currentPage,
    error,
  };
};
