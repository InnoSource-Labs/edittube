import { BrowserRouter, Route, Routes } from "react-router-dom";
import Introduction from "./pages/Introduction";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import "./index.css";
import CreateNewWorkSpace from "./pages/workspace/CreateNewWorkspace";
import { Toaster } from "react-hot-toast";
import Workspace from "./pages/workspace/Workspace";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={true} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Introduction />} />
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
