import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Introduction from "./pages/Introduction";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Introduction />,
  },
  {
    path: "/signin",
    element: <Signin />
  },
  {
    path: "/Signup",
    element: <Signup />
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
