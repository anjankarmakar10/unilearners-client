import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes.jsx";
import AuthProvider from "./contexts/AuthProvider.jsx";

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={client}>
        <RouterProvider router={routes} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
