import { type JSX } from "react";
import Movies from "../pages/Movies";
import ContinueWatching from "../pages/ContinueWatching";
import MainLayout from "../layout/MainLayout";
import SavedMovies from "../pages/SavedMovies";
import TVChannels from "../pages/TVChannels";
import Profile from "../pages/Profile";
import Login from "../pages/Auth/Login/Login";
import EnterPin from "../pages/Auth/Login/EnterPin";
import LoginSuccess from "../pages/Auth/Login/LoginSuccess";
import CheckPhone from "../pages/Auth/Reset/CheckPhone";
import ResetPIN from "../pages/Auth/Reset/ResetPIN";
import ConfirmOTP from "../pages/Auth/Reset/ConfirmOTP";
import ResetSuccess from "../pages/Auth/Reset/ResetSuccess";
import Register from "../pages/Auth/Register/Register";
import ConfirmOTPRegister from "../pages/Auth/Register/ConfirmOTP";
import CreatePIN from "../pages/Auth/Register/CreatePIN";
import RegisterSuccess from "../pages/Auth/Register/RegisterSuccess";
import TVSeries from "../pages/TVSeries";
import OriginMovies from "../pages/OriginMovies";
import MovieList from "../pages/MovieList";
import SeriesHomePage from "../pages/SeriesHome";
import AuthLayout from "../layout/AuthLayout";
import GlobalLayout from "../layout/GlobalLayout";

// Assuming you have a NotFound component
const NotFound = () => <h1>404: Page Not Found</h1>;

type RouteMeta = {
  title?: string;
  requiredAuth: boolean;
};

type RouteConfig = {
  element: JSX.Element;
  path?: string;
  meta?: RouteMeta;
  children?: RouteConfig[];
};

export const routes: RouteConfig[] = [
  {
    element: <GlobalLayout />,
    children: [
      // ----------------------------------------------------
      // 🔑 PROTECTED ROUTES (Requires Auth)
      // ----------------------------------------------------
      {
        element: <MainLayout />,
        meta: { title: "Home", requiredAuth: true },
        children: [
          {
            element: <Movies />,
            path: "/", // Path: / (Home page)
            meta: { title: "Home", requiredAuth: true },
          },
          {
            element: <ContinueWatching />,
            path: "/continue-watching", // Path: /continue-watching
            meta: { title: "Continue Watching", requiredAuth: true },
          },
          { element: <Movies />, path: "/trending", meta: { title: "Trending", requiredAuth: true } },
          { element: <Movies />, path: "/new-arrival", meta: { title: "New Arrival", requiredAuth: true } },
          { element: <SavedMovies />, path: "/saved-movies", meta: { title: "Saved Movies", requiredAuth: true } },
          { element: <OriginMovies />, path: "/origin/:originName", meta: { requiredAuth: true } },
          { element: <MovieList />, path: "/movies", meta: { title: "Movies", requiredAuth: true } },
          { element: <SeriesHomePage />, path: "/series", meta: { title: "TV Series", requiredAuth: true } },
          { element: <TVSeries />, path: "/series/trending", meta: { title: "Trending Series", requiredAuth: true } },
          { element: <TVSeries />, path: "/series/new-arrival", meta: { title: "New Arrival Series", requiredAuth: true } },
          { element: <TVSeries />, path: "/series/origin", meta: { title: "Origin Series", requiredAuth: true } },
          { element: <TVChannels />, path: "/channels", meta: { title: "TV Channels", requiredAuth: true } },
          { element: <Profile />, path: "/profile", meta: { title: "My Profile", requiredAuth: true } },
        ],
      },
      // ----------------------------------------------------
      // 🔑 PUBLIC ROUTES (Auth Pages)
      // ----------------------------------------------------
      {
        element: <AuthLayout />,
        meta: { title: "Auth", requiredAuth: false },
        children: [
          {
            element: <Login />,
            path: "/login", // Path: /login ⬅️ NOW CORRECTLY ACCESSIBLE
            meta: { title: "Login", requiredAuth: false },
          },
          { element: <EnterPin />, path: "/enter-pin", meta: { title: "Enter Pin", requiredAuth: false } },
          { element: <LoginSuccess />, path: "/login-success", meta: { title: "Login Success", requiredAuth: false } },
          { element: <CheckPhone />, path: "/check-phone", meta: { title: "Check Phone", requiredAuth: false } },
          { element: <ConfirmOTP />, path: "/confirm-otp", meta: { title: "Confirm OTP", requiredAuth: false } },
          { element: <ResetPIN />, path: "/reset-pin", meta: { title: "Reset Pin", requiredAuth: false } },
          { element: <ResetSuccess />, path: "/reset-success", meta: { title: "Reset Success", requiredAuth: false } },
          { element: <Register />, path: "/register", meta: { title: "Register", requiredAuth: false } },
          { element: <ConfirmOTPRegister />, path: "/confirm-register-otp", meta: { title: "Confirm Register OTP", requiredAuth: false } },
          { element: <CreatePIN />, path: "/create-pin", meta: { title: "Create Pin", requiredAuth: false } },
          { element: <RegisterSuccess />, path: "/register-success", meta: { title: "Register Success", requiredAuth: false } },
        ]
      },
      // ----------------------------------------------------
      // 🔑 CATCH-ALL 404 ROUTE
      // ----------------------------------------------------
      {
        element: <NotFound />,
        path: "*",
        meta: { requiredAuth: false },
      }
    ]
  }
];
