import { StrictMode } from "react";
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import store from "./store/store.js";

import { Toaster } from "sonner";
import AppRouter from "./routes/AppRouter";
import SmoothScroll from "./components/common/SmoothScroll";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StrictMode>
      <Provider store={store}>
        {/* <RouterProvider router={router} /> */}
        <SmoothScroll>
          <AppRouter />
        </SmoothScroll>
        <Toaster />
      </Provider>
    </StrictMode>
  </React.StrictMode>,
);
