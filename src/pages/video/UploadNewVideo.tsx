import React from "react";
import { useUploadNewVideo } from "../../hooks/useUploadNewVideo";
import { TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab"

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
        <div className="my-4 border border-gray-300 w-full h-[40px] flex items-center p-4 gap-4 rounded">
          <label htmlFor="video-selector">Video* : </label>
          <input type="file" id="video-selector" accept="video/*" required onChange={(e) => {
            e.target.files && setVideo(e.target.files[0])
          }} />
        </div>
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
