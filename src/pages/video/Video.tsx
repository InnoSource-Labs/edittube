import React from "react";
import { LoadingButton } from "@mui/lab";
import { useVideo } from "../../hooks/useVideo";
import {
  getCloudinaryTransformedURI,
  getYouTubeEmbedURI,
  isYouTubeURI,
} from "../../utils/helper";

const Video = (): React.ReactNode => {
  const {
    videoData,
    user,
    isLoadingState,
    handlePublishClick,
    handleRejectClick,
  } = useVideo();

  return (
    <div className="w-[95%] m-auto md:w-[70%] mb-10">
      <div className="font-bold text-2xl underline text-center mb-8">Video</div>
      {videoData?.url && videoData.url !== "deleted" && (
        <iframe
          placeholder=""
          src={
            isYouTubeURI(videoData.url)
              ? getYouTubeEmbedURI(videoData.publicId)
              : getCloudinaryTransformedURI(videoData.publicId)
          }
          className="aspect-video mb-4 w-full h-auto"
          allow="autoplay; fullscreen; encrypted-media; picture-in-picture;"
          allowFullScreen
        />
      )}
      <p className="font-semibold text-2xl mb-2">Title: {videoData?.title}</p>
      <p className="font-medium text-xl mb-2">
        Description: {videoData?.description}
      </p>
      <p className="font-medium text-xl mb-10">
        Status:{" "}
        <span className="bg-fuchsia-600 text-white font-bold rounded p-2">
          {videoData?.status.toUpperCase()}
        </span>
      </p>
      {videoData?.uploadedBy !== user?.uid &&
        videoData?.status === "pending" && (
          <div className="flex gap-10">
            <LoadingButton
              variant="contained"
              color="success"
              size="large"
              loading={isLoadingState === "approving"}
              onClick={handlePublishClick}
            >
              Publish
            </LoadingButton>
            <LoadingButton
              variant="contained"
              color="error"
              size="large"
              loading={isLoadingState === "rejecting"}
              onClick={handleRejectClick}
            >
              Reject
            </LoadingButton>
          </div>
        )}
    </div>
  );
};

export default Video;
