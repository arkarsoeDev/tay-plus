import Cookies from "js-cookie";
import { Routes, Route, Navigate, matchPath, useLocation } from "react-router";
import { useSelector } from "react-redux";
import { routes } from "./routes";
import { useEffect } from "react";

const ProtectedRoute = ({ children, requiredAuth }: any) => {
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
  const isAuthenticated = Cookies.get("isAuthenticated");

  if (requiredAuth && !isAuthenticated && !isLoggedIn) {
    // return <Navigate to='/login' replace />;
    return null;
  }
  return children;
};

const AppRouter = () => {
  const location = useLocation();

  useEffect(() => {
    const routeMeta = getRouteMeta(location.pathname);
    if (routeMeta?.title) {
      document.title = routeMeta.title;
    }
  }, [location.pathname]);

  const getRouteMeta = (path: string): any => {
    let meta;
    const traverse = (routesList: any[], parentPath = "") => {
      for (const r of routesList) {
        const fullPath = r.path ? `${parentPath}${r.path}`.replace(/\/+/g, "/") : parentPath;
        if (r.path && matchPath({ path: fullPath, end: true }, path)) {
          meta = r.meta;
        }
        if (r.children) {
          traverse(r.children, fullPath.endsWith("/") ? fullPath : fullPath + "/");
        }
      }
    };
    traverse(routes);
    return meta;
  };

  const renderRoutes = (routesList: any[], parentPath = "") =>
    routesList.map((route: any, index: number) => {
      const fullPath = route.path
        ? `${parentPath}${route.path}`.replace(/\/+/g, "/")
        : parentPath;

      // If route has children → render layout as-is (don’t wrap in ProtectedRoute)
      if (route.children) {
        return (
          <Route key={index} path={route.path} element={route.element}>
            {renderRoutes(route.children, fullPath.endsWith("/") ? fullPath : fullPath + "/")}
          </Route>
        );
      }

      // If leaf route → wrap in ProtectedRoute
      return (
        <Route
          key={index}
          path={route.path}
          element={
            <ProtectedRoute requiredAuth={route.meta?.requiredAuth}>
              {route.element}
            </ProtectedRoute>
          }
        />
      );
    });

  return <Routes>{renderRoutes(routes)}</Routes>;
};

export default AppRouter;
