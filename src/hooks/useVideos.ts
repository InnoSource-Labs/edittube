import { useUserAuthContext } from "../providers/UserAuthProvider";
import { useEffect, useState } from "react";
import { VideoFilters, VideoInterface } from "../models/video";
import axios from "axios";
import enviroment from "../enviroment";
import { getErrorMsg } from "../utils/tsError";

export const useVideos = (id?: string) => {
  const { getAccessToken } = useUserAuthContext();

  const [error, setError] = useState<string>("");
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
          `${enviroment.server_url}/workspaces/${id}/videos`,
          {
            params: {
              filter,
            },
            headers,
          },
        );
        setVideos(res.data.videos);
        setCurrentPage(res.data.currentpage);
        setTotalPage(res.data.totalpages);
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
    filter,
    setFilter,
    videos,
    getMoreVideos,
    totalPage,
    currentPage,
    error,
  };
};
