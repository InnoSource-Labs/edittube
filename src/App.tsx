import { BrowserRouter, Route, Routes } from "react-router-dom";
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

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={true} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Introduction />} />
        <Route path="/verified" element={<Verify />} />
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
