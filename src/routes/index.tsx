import { createBrowserRouter, RouteObject } from "react-router-dom";

// routes
import MainRoutes from "./main-routes.tsx";
import LoginRoutes from "./login-routes.tsx";

// ==============================|| ROUTING RENDER ||============================== //

// Helper function to add error boundary to routes recursively
const addErrorBoundary = (routes: RouteObject[]): RouteObject[] => {
  return routes.map((route) => {
    const updatedRoute = { ...route };

    // Recursively add to children
    if (updatedRoute.children) {
      updatedRoute.children = addErrorBoundary(updatedRoute.children);
    }

    return updatedRoute;
  });
};

const routes = addErrorBoundary([LoginRoutes, MainRoutes]);

const router = createBrowserRouter(routes, {
  basename: import.meta.env.VITE_APP_BASE_NAME,
});

export default router;
