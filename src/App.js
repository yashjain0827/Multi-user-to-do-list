// import "./App.css";
import Login from "./component/login/Login"; // Assuming the path is correct
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AdminPage from "./component/admin/AdminPage";
import UserPage from "./component/user/UserPage";
import Adminuserpage from "./component/admin/users/Adminuserpage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/admin",
      element: <AdminPage />,
    },
    { path: "/user", element: <UserPage /> },
    { path: "/admin/adminusers", element: <Adminuserpage /> },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
