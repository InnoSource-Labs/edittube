import { Link } from "react-router-dom";
import { VideoFilters } from "../../models/video";
import { FormControl, Select, MenuItem, Button } from "@mui/material";
import { useWorkspace } from "../../hooks/useWorkspace";
import { useParams } from "react-router-dom";
import { useVideos } from "../../hooks/useVideos";
import PrimaryCTA from "../../components/PrimaryCTA";

const Workspace = (): React.ReactNode => {
  const id = useParams().id;

  const { workspace } = useWorkspace(id);

  const { videos, filter, totalPage, page, setSearchQuery } = useVideos(id);

  return (
    <div
      className="flex items-center justify-center flex-col md:w-[80vw] w-[95vw] m-auto"
      id="videosdiv"
    >
      <div>Workspace</div>
      <div className="text-3xl font-semibold my-4 truncate w-full text-center">
        {workspace?.name}
      </div>
      {workspace?.role === "editor" ? (
        <PrimaryCTA text="Upload new video" link={`/workspace/${id}/upload`} />
      ) : workspace?.verifyURL ? (
        <a href={workspace.verifyURL}>
          <PrimaryCTA text="Verify Workspace" />
        </a>
      ) : null}
      <div className="flex items-center justify-center flex-col w-full">
        <div className="flex justify-between items-center w-full">
          <div className="font-semibold text-xl text-center">Videos</div>
          <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
            <Select
              value={filter}
              onChange={(e) =>
                setSearchQuery((query) => {
                  query.set("filter", e.target.value as VideoFilters);
                  query.set("page", "1");
                  return query;
                })
              }
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
            {videos.map((video, index) => {
              return (
                <Link
                  className="w-full"
                  to={`/workspace/${id}/${video._id}`}
                  key={index}
                >
                  <div className="w-full flex items-center justify-between text-center text-lg font-semibold my-4 p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)] hover:bg-gray-200 opacity-90 transition duration-300 rounded">
                    <span className="truncate">{video.title}</span>
                    <span className="">{video.status.toUpperCase()}</span>
                  </div>
                </Link>
              );
            })}
            <div className="flex items-center justify-between my-4">
              <Button
                variant="contained"
                disabled={page === 1}
                onClick={() =>
                  setSearchQuery((query) => {
                    query.set("page", (page - 1).toString() as string);
                    return query;
                  })
                }
              >
                Previous
              </Button>
              <Button
                variant="contained"
                disabled={page === totalPage}
                onClick={() =>
                  setSearchQuery((query) => {
                    query.set("page", (page + 1).toString() as string);
                    return query;
                  })
                }
              >
                Next
              </Button>
            </div>
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
