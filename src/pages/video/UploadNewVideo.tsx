import React from "react";
import { useUploadNewVideo } from "../../hooks/useUploadNewVideo";
import { Button, TextField, styled } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const UploadNewVideo = (): React.ReactNode => {
  const { handleSubmit, title, setTitle, loading, setVideo, desc, setDesc } =
    useUploadNewVideo();

  return (
    <div className="flex items-center justify-center m-4">
      <form
        onSubmit={handleSubmit}
        className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-[500px] flex items-center justify-center px-8 py-4 flex-col"
      >
        <div className="mb-8 font-semibold text-2xl font-sans">
          Upload new video
        </div>
        <TextField
          required
          id="outlined-required title"
          label="Title"
          size="small"
          sx={{ width: "100%", marginBottom: "20px" }}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <TextField
          required
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={4}
          value={desc}
          onChange={(e) => {
            setDesc(e.target.value);
          }}
          sx={{ width: "100%" }}
        />
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
          sx={{ marginY: "20px" }}
        >
          Upload video
          <VisuallyHiddenInput
            accept="video/*"
            type="file"
            onChange={(e) => {
              e.target.files && setVideo(e.target.files[0]);
            }}
          />
        </Button>
        <LoadingButton
          loading={loading}
          loadingPosition="center"
          variant="contained"
          type="submit"
        >
          <span>Upload for review</span>
        </LoadingButton>
      </form>
    </div>
  );
};

export default UploadNewVideo;
