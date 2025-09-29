import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { UIConfig } from "./shared/config/uiConfig.ts";

import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./shared/config/queryClient.ts";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const root = document.documentElement;

// Inject all theme values as CSS variables
const { indexCss } = UIConfig;
Object.entries(indexCss).forEach(([key, value]) => {
  root.style.setProperty(`--${key}`, value);
});

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  </React.StrictMode>
);
