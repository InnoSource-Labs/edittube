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
  const [jsonFile, setJsonFile] = useState<File | null>(null);
  const [editors, setEditors] = useState<editorsInterface[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = await getAccessToken();
      const formData = new FormData();
      jsonFile && formData.append("jsonFile", jsonFile);
      formData.append("name", name);
      formData.append("editors", JSON.stringify(editors));

      const res = await axios.post(
        `${enviroment.server_url}/workspaces`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      toast.success("Created new workspace");
      return navigate(`/workspace/${res.data._id}`);
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
    jsonFile,
    editors,
    setName,
    setJsonFile,
    setEditors,
  };
};
