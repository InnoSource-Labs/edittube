import { Button, FormControl, MenuItem, Select } from "@mui/material";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { WorkspaceFilters } from "../models/workspace";
import { useWorkspaces } from "../hooks/useWorkspaces";

const Home = (): ReactNode => {
  const { workspaces, filter, setSearchQuery, page, totalPage } =
    useWorkspaces();

  return (
    <div className="md:w-[80%] w-[95%] m-auto font-sans">
      <div className="flex justify-center items-center flex-col mb-8">
        <Link to="/workspace/new">
          <button className="bg-[#1687A7] text-white p-2 rounded-md text-md hover:bg-[#176b87ba] transition">
            Create new workspace
          </button>
        </Link>
        <div className="flex items-center justify-center w-80">
          <hr className="flex-1 h-px my-6 border-0 bg-gray-700" />
          <span className="px-3 font-medium text-gray-900 ">or</span>
          <hr className="flex-1 h-px my-6 border-0 bg-gray-700" />
        </div>
        <div className="w-full mb-6">
          <div className="mb-2 font-sans font-bold md:text-2xl text-lg text-center flex justify-between items-center">
            <div>Your WorkSpaces</div>
            <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
              <Select
                value={filter}
                onChange={(e) =>
                  setSearchQuery((query) => {
                    query.set("filter", e.target.value as WorkspaceFilters);
                    query.set("page", "1");
                    return query;
                  })
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
          {workspaces.length ? (
            <div className="w-full">
              {workspaces?.map((workspace, index) => {
                return (
                  <Link
                    className="w-full"
                    to={`/workspace/${workspace._id}`}
                    key={index}
                  >
                    <div className="w-full flex items-center justify-between text-center text-lg font-semibold my-4 p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)] hover:bg-gray-200 opacity-90 transition duration-300 rounded">
                      <span className="truncate">{workspace.name}</span>
                      <span className="">{workspace.role.toUpperCase()}</span>
                    </div>
                  </Link>
                );
              })}
              <div className="flex items-center justify-between">
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
    </div>
  );
};

export default Home;
