import { TextField } from "@mui/material";
import { ReactNode } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EditorsSelector from "../../components/EditorsSelctor";
import { useCreateNewWorkspace } from "../../hooks/useCreateNewWorkspace";

const CreateNewWorkSpace = (): ReactNode => {
  const { handleSubmit, name, setName, editors, setEditors, loading } =
    useCreateNewWorkspace();

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
