import { createBrowserRouter } from "react-router-dom";
import HomePage from "../src/pages/HomePage";
import GamePage from "../src/pages/GamePage";


const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage/>,
    },
    {
      path: "/games",
      element: <GamePage/>
    }
]);


export default router