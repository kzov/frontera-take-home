import "./index.css";
import Dashboard from "./pages/Dashboard.tsx";
import Login from "./pages/Login.tsx";
import React from "react";
import ReactDOM from "react-dom/client";
import Register from "./pages/Register.tsx";
import Root from "./layouts/Root.tsx";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { RouterProvider, createHashRouter } from "react-router-dom";
import { store, persistor } from "./store/store.ts";

const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
