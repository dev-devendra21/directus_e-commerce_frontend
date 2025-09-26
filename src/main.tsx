import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { themeConfig } from "./config/themeConfig.ts";
import { UIConfig } from "./config/uiConfig.ts";

import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./config/queryClient.ts";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const root = document.documentElement;

const { theme } = UIConfig;

// Inject all theme values as CSS variables
Object.entries(
  themeConfig[theme as keyof typeof themeConfig].desktop.css
).forEach(([key, value]) => {
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
