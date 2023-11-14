import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Introduction from "./pages/Introduction";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Introduction />,
  },
  {
    path: "/home",
    element: <Home />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
