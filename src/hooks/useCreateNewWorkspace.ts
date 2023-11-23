import axios from "axios";
import { useNavigate } from "react-router";
import { useUserAuthContext } from "../providers/UserAuthProvider";
import { editorsInterface } from "../models/workspace";
import { useState } from "react";
import enviroment from "../enviroment";
import toast from "react-hot-toast";
import { getErrorMsg } from "../utils/tsError";

export const useCreateNewWorkspace = () => {
  const { getAccessToken } = useUserAuthContext();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [clientId, setClientId] = useState<string>("");
  const [clientSecret, setClientSecret] = useState<string>("");
  const [editors, setEditors] = useState<editorsInterface[]>([]);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = await getAccessToken();
      const res = await axios.post(
        `${enviroment.server_url}/workspaces`,
        {
          name,
          clientId,
          clientSecret,
          editors,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      toast.success("Created new workspace");
      return navigate(`/workspace/${res.data._id}`);
    } catch (error) {
      setError(getErrorMsg(error));
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    handleSubmit,
    name,
    clientId,
    clientSecret,
    editors,
    setName,
    setClientId,
    setClientSecret,
    setEditors,
  };
};
