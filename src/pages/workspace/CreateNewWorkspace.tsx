import { TextField } from "@mui/material";
import { ReactNode } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EditorsSelector from "../../components/EditorsSelctor";
import { useCreateNewWorkspace } from "../../hooks/useCreateNewWorkspace";
import { Link } from "react-router-dom";
import enviroment from "../../enviroment";

const CreateNewWorkSpace = (): ReactNode => {
  const {
    handleSubmit,
    name,
    setName,
    setJsonFile,
    editors,
    setEditors,
    loading,
  } = useCreateNewWorkspace();

  return (
    <div className="flex items-center justify-center m-4">
      <form
        onSubmit={handleSubmit}
        className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-[80%] flex items-center justify-center px-8 py-4 flex-col"
      >
        <div className="mb-8 font-semibold text-2xl font-sans">
          Create new workspace
        </div>
        <div className="mb-4 w-full">
          <TextField
            required
            id="outlined-required name"
            label="Name"
            size="small"
            sx={{ width: "100%" }}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="my-2">
          <Link
            className="text-sm text-blue-500"
            to="https://support.google.com/cloud/answer/6158849?hl=en"
            target="_blank"
          >
            Follow the steps provided by Google to generate secrets.
          </Link>
          <p className="text-sm text-gray-500">
            <code className="tesx-xs">{`"Authorized JavaScript origins": "${enviroment.base_uri}"`}</code>
            <br />
            <code className="tesx-xs">{`"Authorized redirect URIs": "${enviroment.base_uri}/verify"`}</code>
            <br />
            Add above in respactive fields. Download file rename to secrets.json
            and upload it below.
          </p>
          <div className="my-4 border border-gray-300 w-full h-[40px] flex items-center p-4 gap-4 rounded">
            <label htmlFor="json-selector">JSON* : </label>
            <input
              type="file"
              id="json-selector"
              accept=".json"
              required
              onChange={(e) => {
                e.target.files && setJsonFile(e.target.files[0]);
              }}
            />
          </div>
        </div>
        <EditorsSelector intialVal={editors} onValChange={setEditors} />
        <LoadingButton
          loading={loading}
          endIcon={<AddBoxIcon />}
          loadingPosition="end"
          variant="contained"
          type="submit"
        >
          <span>Create Workspace</span>
        </LoadingButton>
      </form>
    </div>
  );
};

export default CreateNewWorkSpace;
