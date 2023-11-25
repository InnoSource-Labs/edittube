import { useUserAuthContext } from "../providers/UserAuthProvider";
import { useEffect, useState } from "react";
import { VideoInterface } from "../models/video";
import axios from "axios";
import enviroment from "../enviroment";
import { getErrorMsg } from "../utils/tsError";
import { useSearchParams } from "react-router-dom";

export const useVideos = (id?: string) => {
  const { getAccessToken } = useUserAuthContext();

  const [query, setSearchQuery] = useSearchParams();

  let filter = query.get("filter");
  filter = filter ? filter : "all";

  let page = <string | number>query.get("page");
  page = Number(page) || 1;

  const [error, setError] = useState<string>("");
  const [videos, setVideos] = useState<VideoInterface[]>([]);
  const [totalPage, setTotalPage] = useState<number>(1);

  useEffect(() => {
    const getVideos = async () => {
      try {
        const token = await getAccessToken();
        const headers = { Authorization: `Bearer ${token}` };
        const res = await axios.get(
          `${enviroment.server_url}/workspaces/${id}/videos`,
          {
            params: {
              filter,
              page,
            },
            headers,
          },
        );
        setVideos(res.data.videos);
        setTotalPage(res.data.totalpages);
      } catch (error) {
        setError(getErrorMsg(error));
      }
    };
    getVideos();
  }, [id, getAccessToken, filter, page]);

  return {
    filter,
    videos,
    totalPage,
    error,
    setSearchQuery,
    page,
  };
};
