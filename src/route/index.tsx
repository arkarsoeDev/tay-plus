import Cookies from "js-cookie";
import { Routes, Route, Navigate, matchPath, useLocation } from "react-router";
import { useSelector } from "react-redux";
import { routes } from "./routes";
import { useEffect } from "react";

const isAuthenticated = Cookies.get("isAuthenticated");

const ProtectedRoute = ({ children, requiredAuth }: any) => {
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);

  if (requiredAuth && !isAuthenticated && !isLoggedIn) {
    return <Navigate to='/login' replace />;
  }
  return children;
};

const AppRouter = () => {
  const location = useLocation();
  useEffect(() => {
    const routeMeta = getRouteMeta(location.pathname);

    if (routeMeta && routeMeta.title) {
      document.title = routeMeta.title;
    }
  }, [location.pathname]);

  const getRouteMeta = (path: string): any => {
    let meta = undefined;
    routes.forEach((route) => {
      if (matchPath({ path: route.path, end: true }, path)) {
        meta = route.meta;
      }
      if (route.children) {
        route.children.forEach((childRoute: { path: any; meta: any }) => {
          const fullPath = `${route.path}/${childRoute.path}`.replace(
            /\/+/g,
            "/"
          );
          if (matchPath({ path: fullPath, end: true }, path)) {
            meta = childRoute.meta;
          }
        });
      }
    });
    return meta;
  };

  return (
    <Routes>
      {routes.map((route, index) => {
        if (route.children) {
          return (
            <Route key={index} path={route.path} element={route.element}>
              {route.children.map((child, childIndex) => {
                return (
                  <Route
                    key={childIndex}
                    path={child.path}
                    element={
                      <ProtectedRoute requiredAuth={child.meta?.requiredAuth}>
                        {child.element}
                      </ProtectedRoute>
                    }
                  />
                );
              })}
            </Route>
          );
        }

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
      })}
    </Routes>
  );
};

export default AppRouter;
