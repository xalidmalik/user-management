import { AddUser } from "pages/add-user";
import { Dashboard } from "pages/dashboard";
import { EditUser } from "pages/edit-user";
import React from "react";
import { Outlet, ReactLocation, Route, Router } from "react-location";

const routes: Route[] = [
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "user/add",
    element: <AddUser />,
  },
  {
    path: "user/edit/:userId",
    element: <EditUser />,
  },
];

export const location = new ReactLocation();

function App() {
  return (
    <Router routes={routes} location={location}>
      <Outlet />
    </Router>
  );
}

export default App;
