import { createBrowserRouter } from "react-router-dom";
import HomePage from "../src/pages/HomePage";
import GamePage from "../src/pages/GamePage";
import Home from "../src/pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/games",
    element: <GamePage />,
  },
  {
    path: "/home",
    element: <Home />,
  },
]);

export default router;
