import { Route, Routes } from "react-router-dom";
import Introduction from "./pages/Introduction";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import "./index.css";
import CreateNewWorkSpace from "./pages/workspace/CreateNewWorkspace";
import { Toaster } from "react-hot-toast";
import Workspace from "./pages/workspace/Workspace";
import UploadNewVideo from "./pages/video/UploadNewVideo";
import Verify from "./pages/Verifiy";
import Video from "./pages/video/Video";

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={true} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Introduction />} />
        <Route path="/verify" element={<Verify />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/workspace/new"
          element={
            <PrivateRoute>
              <CreateNewWorkSpace />
            </PrivateRoute>
          }
        />
        <Route
          path="/workspace/:id"
          element={
            <PrivateRoute>
              <Workspace />
            </PrivateRoute>
          }
        />
        <Route
          path="/workspace/:id/upload"
          element={
            <PrivateRoute>
              <UploadNewVideo />
            </PrivateRoute>
          }
        />
        <Route
          path="/workspace/:id/:videoid"
          element={
            <PrivateRoute>
              <Video />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
