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
  const [editors, setEditors] = useState<editorsInterface[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = await getAccessToken();

      const res = await axios.post(
        `${enviroment.server_url}/workspaces`,
        {
          name: name,
          editors: editors,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success("Created new workspace");
      return navigate(`/workspace/${res.data._id}`, { replace: true });
    } catch (error) {
      toast.error(getErrorMsg(error));
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleSubmit,
    name,
    editors,
    setName,
    setEditors,
  };
};
