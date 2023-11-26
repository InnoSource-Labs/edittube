import { useNavigate, useParams } from "react-router-dom";
import { useUserAuthContext } from "../providers/UserAuthProvider";
import { useState, useEffect } from "react";
import { VideoInterface } from "../models/video";
import axios from "axios";
import enviroment from "../enviroment";
import { getErrorMsg } from "../utils/tsError";
import toast from "react-hot-toast";

export const useVideo = () => {
  const { id, videoid } = useParams();
  const { getAccessToken, user } = useUserAuthContext();

  const navigate = useNavigate();

  const [videoData, setVideoData] = useState<VideoInterface>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getVideoData = async () => {
      try {
        const token = await getAccessToken();
        const res = await axios.get(
          `${enviroment.server_url}/workspaces/${id}/videos/${videoid}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setVideoData(res.data);
      } catch (error) {
        toast.error(getErrorMsg(error));
      }
    };
    getVideoData();
  }, [getAccessToken, id, videoid]);

  const handlePublishClick = async () => {
    setIsLoading(true);
    try {
      const token = await getAccessToken();
      await axios.post(
        `${enviroment.server_url}/workspaces/${id}/videos/${videoid}/approve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success("Approved video!");
      navigate(`/workspace/${id}/videos/${videoid}`, { replace: true });
    } catch (error) {
      toast.error(getErrorMsg(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleRejectClick = async () => {
    setIsLoading(true);
    try {
      const token = await getAccessToken();
      await axios.post(
        `${enviroment.server_url}/workspaces/${id}/videos/${videoid}/reject`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success("Rejected video!");
      navigate(`/workspace/${id}/videos/${videoid}`, { replace: true });
    } catch (error) {
      toast.error(getErrorMsg(error));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    videoData,
    user,
    isLoading,
    handlePublishClick,
    handleRejectClick,
  };
};
