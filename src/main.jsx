import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "./i18n/i18n";
import "leaflet/dist/leaflet.css";

import { UserTokenProvider } from "./context/UserContext.jsx";
import { PopupProvider } from "./context/PopupContext.jsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserTokenProvider>
        <PopupProvider>
          <App />
        </PopupProvider>
      </UserTokenProvider>
    </QueryClientProvider>
  </StrictMode>
);