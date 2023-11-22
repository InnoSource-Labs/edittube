import { BrowserRouter, Route, Routes } from "react-router-dom";
import Introduction from "./pages/Introduction";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import "./index.css";
import CreateNewWorkSpace from "./pages/workspace/CreateNewWorkspace";

function App() {
  return (
    <BrowserRouter>
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
        <Route path="/workspace/new" element={<PrivateRoute><CreateNewWorkSpace /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
