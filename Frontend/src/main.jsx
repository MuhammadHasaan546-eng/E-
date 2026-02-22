import { StrictMode } from "react";
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import store from "./store/store.js";

import { Toaster } from "sonner";
import AppRouter from "./routes/AppRouter";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StrictMode>
      <Provider store={store}>
        {/* <RouterProvider router={router} /> */}
        <AppRouter />
        <Toaster />
      </Provider>
    </StrictMode>
  </React.StrictMode>,
);
