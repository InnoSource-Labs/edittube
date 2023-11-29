import { useNavigate, useParams } from "react-router-dom";
import { useUserAuthContext } from "../providers/UserAuthProvider";
import { useState } from "react";
import { getErrorMsg } from "../utils/tsError";
import toast from "react-hot-toast";
import axios from "axios";
import enviroment from "../enviroment";

export const useUploadNewVideo = () => {
  const { getAccessToken } = useUserAuthContext();
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [video, setVideo] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = await getAccessToken();
      const formData = new FormData();
      video && formData.append("video", video);
      formData.append("title", title);
      formData.append("description", desc);

      const res = await axios.post(
        `${enviroment.server_url}/workspaces/${id}/videos`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      toast.success("Uploaded new video!");
      return navigate(`/workspace/${id}/${res.data._id}`, { replace: true });
    } catch (error) {
      toast.error(getErrorMsg(error));
    } finally {
      setLoading(false);
    }
  };

  return {
    handleSubmit,
    loading,
    setTitle,
    setDesc,
    video,
    setVideo,
    title,
    desc,
  };
};
