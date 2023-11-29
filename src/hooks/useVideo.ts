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
  const [isLoadingState, setIsLoadingState] = useState<
    "approving" | "rejecting" | "none"
  >("none");

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
    setIsLoadingState("approving");
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
    } catch (error) {
      toast.error(getErrorMsg(error));
    } finally {
      setIsLoadingState("none");
      navigate(-1);
    }
  };

  const handleRejectClick = async () => {
    setIsLoadingState("rejecting");
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
    } catch (error) {
      toast.error(getErrorMsg(error));
    } finally {
      setIsLoadingState("none");
      navigate(-1);
    }
  };

  return {
    videoData,
    user,
    isLoadingState,
    handlePublishClick,
    handleRejectClick,
  };
};
