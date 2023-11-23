import { TextField } from "@mui/material";
import { ReactNode } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EditorsSelector from "../../components/EditorsSelctor";
import { useCreateNewWorkspace } from "../../hooks/useCreateNewWorkspace";

const CreateNewWorkSpace = (): ReactNode => {
  const {
    handleSubmit,
    setName,
    clientId,
    setClientId,
    clientSecret,
    setClientSecret,
    name,
    editors,
    setEditors,
    loading,
  } = useCreateNewWorkspace();

  return (
    <div className="flex items-center justify-center m-4">
      <form
        onSubmit={handleSubmit}
        className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-[500px] flex items-center justify-center px-8 py-4 flex-col"
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
        <div className="text-sm text-blue-500 my-2">
          <a
            href="https://support.google.com/cloud/answer/6158849?hl=en"
            target="_blank"
          >
            Follow the steps provided by Google to generate Client ID and
            Secret.
          </a>
        </div>
        <div className="mb-4 w-full">
          <TextField
            required
            id="outlined-required clientId"
            label="Client ID"
            size="small"
            sx={{ width: "100%" }}
            value={clientId}
            onChange={(e) => {
              setClientId(e.target.value);
            }}
          />
        </div>
        <div className="mb-4 w-full">
          <TextField
            required
            id="outlined-required clientsecret"
            label="Client Secret"
            size="small"
            sx={{ width: "100%" }}
            value={clientSecret}
            onChange={(e) => {
              setClientSecret(e.target.value);
            }}
          />
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