import React from "react";
import enviroment from "../../enviroment";
import { LoadingButton } from "@mui/lab";
import { useVideo } from "../../hooks/useVideo";

const Video = (): React.ReactNode => {
  const { videoData, user, isLoading, handlePublishClick, handleRejectClick } =
    useVideo();

  return (
    <div className="w-[95%] m-auto md:w-[70%] mb-10">
      <div className="font-bold text-2xl underline text-center mb-8">Video</div>
      {videoData?.status === "pending" && (
        <iframe
          src={`https://player.cloudinary.com/embed/?cloud_name=${enviroment.cloudinary_cloud_name}=&public_id=${videoData?.url}&cloudinary%5Bcname%5D=myCname&player%5Bloop%5D=true&source%5Bsource_types%5D%5B0%5D=mp4%2Fh265&source%5Bsource_types%5D%5B1%5D=mp4&source%5Btransformation%5D%5B1%5D%5Bquality%5D=auto`}
          className="aspect-video mb-4 w-full h-auto"
          allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}
      <div className="font-semibold text-2xl mb-2">
        Title: {videoData?.title}
      </div>
      <div className="font-medium text-xl mb-2">
        Description: {videoData?.description}
      </div>
      <div className="font-medium text-xl mb-10">
        Status:{" "}
        <span className="bg-fuchsia-600 text-white font-bold rounded p-2">
          {videoData?.status.toUpperCase()}
        </span>
      </div>
      {videoData?.uploadedBy !== user?.uid &&
        videoData?.status === "pending" && (
          <div className="flex gap-10">
            <LoadingButton
              variant="contained"
              color="success"
              size="large"
              loading={isLoading}
              onClick={handlePublishClick}
            >
              Publish
            </LoadingButton>
            <LoadingButton
              variant="contained"
              color="error"
              size="large"
              loading={isLoading}
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
