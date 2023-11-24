import React from "react";
import { Link } from "react-router-dom";
import { VideoFilters } from "../../models/video";
import InfiniteScroll from "react-infinite-scroll-component";
import { CircularProgress, FormControl, Select, MenuItem } from "@mui/material";
import { useWorkspace } from "../../hooks/useWorkspace";
import { useParams } from "react-router-dom";
import { useVideos } from "../../hooks/useVideos";

const Workspace = (): React.ReactNode => {
  const id = useParams().id;

  const { workspace } = useWorkspace(id);

  const { videos, filter, setFilter, getMoreVideos, totalPage, currentPage } =
    useVideos(id);

  return (
    <div
      className="flex items-center justify-center flex-col md:w-[80vw] w-[95vw] m-auto"
      id="videosdiv"
    >
      <div>Workspace</div>
      <div className="text-3xl font-semibold my-4 truncate w-full text-center">
        {workspace?.name}
      </div>
      {workspace?.role === "editor" && (
        <Link to={`/workspace/${id}/upload`}>
          <button className="bg-[#1687A7] text-white mt-4 mb-8 p-2 rounded-md text-md hover:bg-[#176b87ba] transition">
            Upload new video
          </button>
        </Link>
      )}
      <div className="flex items-center justify-center flex-col w-full">
        <div className="flex justify-between items-center w-full">
          <div className="font-semibold text-xl text-center">Videos</div>
          <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
            <Select
              value={filter}
              onChange={(e) => setFilter(e.target.value as VideoFilters)}
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value={"all"}>All</MenuItem>
              <MenuItem value={"pending"}>Pending</MenuItem>
              <MenuItem value={"approved"}>Approved</MenuItem>
              <MenuItem value={"rejected"}>Rejected</MenuItem>
            </Select>
          </FormControl>
        </div>
        <hr className="h-[2px] bg-gray-700 w-full" />
        {videos?.length ? (
          <div className="w-full">
            <InfiniteScroll
              dataLength={videos.length}
              next={getMoreVideos}
              hasMore={totalPage > currentPage}
              loader={
                <div className="flex justify-center">
                  <CircularProgress />
                </div>
              }
              scrollThreshold={1}
              style={{
                overflow: "visible",
              }}
            >
              {videos.map((video, index) => {
                return (
                  <Link to={`/workspace/${id}/${video._id}`} key={index}>
                    <div className="flex items-center justify-between text-center text-lg font-semibold my-4  h-20 p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)] hover:bg-gray-200 opacity-90 transition duration-300 rounded">
                      <span className="truncate">{video.title}</span>
                      <span className="w-20">{video.status.toUpperCase()}</span>
                    </div>
                  </Link>
                );
              })}
            </InfiniteScroll>
          </div>
        ) : (
          <div className="text-center font-bold text-xl py-8">
            Nothing to show here!
          </div>
        )}
      </div>
    </div>
  );
};

export default Workspace;
