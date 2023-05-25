// import { useState } from "react";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Backdrop from "./Pages/Backdrop";
import Countdown from "./Pages/Countdown";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Backdrop />,
  },
  {
    path: "/countdown",
    element: <Countdown />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
