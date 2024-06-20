import { RouterProvider } from "react-router-dom";
import router from "../router";
import WordProvider from "./contexts/wordContext";

export default function App() {
  return (
    <WordProvider>
      <RouterProvider router={router}></RouterProvider>
    </WordProvider>
  )
}
