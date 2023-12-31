import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import Home from "./pages/Home/index.jsx";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import SinglePost from "./pages/SinglePost/index.jsx";
import Profile from "./pages/Profile/index.jsx";
import ErrorPage from "./pages/ErrorPage";
import FeaturedGallery from "./components/FeaturedGallery";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/posts/:postId",
        element: <SinglePost />,
      },
      {
        path: "/profile/:userId",
        element: <Profile />,
      },
      {
        path: "/test",
        element: <FeaturedGallery />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
