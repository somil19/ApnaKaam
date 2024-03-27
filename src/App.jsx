import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import AddTodo from "./components/AddTodo";
// import Todo from "./components/Todo";

import AppLayout from "./ui/AppLayout";

import SignUpPage from "./pages/SignUpPage";
import Today from "./pages/Today";
import Tomorrow from "./pages/Tomorrow";
import Upcoming from "./pages/Upcoming";
import Welcome from "./pages/Welcome";
import SummaryPage from "./pages/SummaryPage";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <SignUpPage />,
      },
      {
        path: "/welcome",
        element: <Welcome />,
      },
      {
        path: "/today",
        element: <Today />,
      },
      {
        path: "/tomorrow",
        element: <Tomorrow />,
      },
      {
        path: "/upcoming",
        element: <Upcoming />,
      },
      {
        path: "/summary",
        element: <SummaryPage />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router}></RouterProvider>;
}
