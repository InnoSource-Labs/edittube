import { FormControl, MenuItem, Select } from "@mui/material";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import CircularProgress from "@mui/material/CircularProgress";
import { WorkspaceFilters } from "../models/workspace";
import { useWorkspaces } from "../hooks/useWorkspaces";

const Home = (): ReactNode => {
  const {
    workspaces,
    currentPage,
    totalPage,
    filter,
    setFilter,
    getMoreWorkspaces,
  } = useWorkspaces();

  return (
    <div>
      <div className="md:w-[80%] w-[95%] m-auto font-sans">
        <div className="flex justify-center items-center flex-col mb-8">
          <Link to="/workspace/new">
            <button className="bg-[#1687A7] text-white p-2 rounded-md text-md hover:bg-[#176b87ba] transition">
              Create new workspace
            </button>
          </Link>
          <div className="inline-flex items-center justify-center w-full">
            <hr className="w-64 h-px my-6 border-0 bg-gray-700" />
            <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 ">
              or
            </span>
          </div>
          <div className="text-center">
            Contact a creator to add you in a WorkSpace
          </div>
        </div>
        {workspaces.length ? (
          <div className="mb-6">
            <div className="mb-2 font-sans font-bold md:text-2xl text-lg text-center flex justify-between items-center">
              <div>Your WorkSpaces</div>
              <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
                <Select
                  value={filter}
                  onChange={(e) =>
                    setFilter(e.target.value as WorkspaceFilters)
                  }
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value={"all"}>All</MenuItem>
                  <MenuItem value={"creator"}>Creator</MenuItem>
                  <MenuItem value={"editor"}>Editor</MenuItem>
                </Select>
              </FormControl>
            </div>
            <hr className="h-[2px] bg-gray-700" />
            <InfiniteScroll
              dataLength={workspaces.length}
              next={getMoreWorkspaces}
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
              {workspaces?.map((workspace, index) => {
                return (
                  <Link to={`/workspace/${workspace._id}`} key={index}>
                    <div className="flex items-center justify-between text-center text-lg font-semibold my-4  h-20 p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)] hover:bg-gray-200 opacity-90 transition duration-300 rounded">
                      <span>{workspace.name}</span>
                      <span className="w-20">
                        {workspace.role.toUpperCase()}
                      </span>
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

export default Home;
