import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../store";
import { getOrigins } from "../store/moviesSlice";
import { useTranslation } from "react-i18next";

// --- Orientation Helper Functions (Recommended to keep these separate, but defined here for context) ---

/**
 * Checks if the app is running in PWA standalone mode.
 */
const isPWAInstalled = () => {
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
  const isIOSStandalone = ('standalone' in window.navigator) && (window.navigator.standalone);
  return isStandalone || isIOSStandalone;
};

/**
 * Locks the screen orientation to landscape.
 */
const lockLandscape = () => {
  // Only apply the lock if the app is installed as a PWA
  const lock = (screen.orientation as any).lock;
  if (isPWAInstalled() && screen.orientation && lock) {
    lock('landscape')
      .then(() => alert('Screen locked to landscape for content view.'))
      .catch((error: any) => console.warn('Landscape lock failed or denied:', error));
  }
};

// --- MainLayout Component ---

const MainLayout = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  // const theme = useTheme();
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const isLandscape = useMediaQuery("(orientation: landscape)");
  const isMobileLandscape = isMobile && isLandscape;

  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState<any>(null);
  const [selectedParentOrigin, setSelectedParentOrigin] = useState<any | null>(
    null
  );
  const [selectedChildOrigin, setSelectedChildOrigin] = useState<any | null>(
    null
  );

  const { origins = [] } = useSelector((state: any) => state.movies);

  // -------------------------------------------------------------
  // 🔑 IMPLEMENT LANDSCAPE LOCK HERE
  // -------------------------------------------------------------
  useEffect(() => {
    lockLandscape();
    
    // The cleanup function is generally not needed if you want the lock 
    // to persist across all protected routes within this layout.
  }, []); // Empty dependency array means it runs once on mount
  // -------------------------------------------------------------

  useEffect(() => {
    dispatch(getOrigins());
  }, [dispatch]);

  const topLevelOrigins = useMemo(() => {
    return origins.map((origin: any) => ({
      id: origin.id,
      text: origin.name,
      url: `/origin/${origin.name.toLowerCase()}`,
      children: origin.children || [],
    }));
  }, [origins]);

  const sideBarMenuItems = useMemo(() => {
    return [
      { text: t("Home"), url: "/" },
      { text: t("Trending"), url: "/trending" },
      { text: t("New Arrival"), url: "/new-arrival" },
      { text: t("Saved Movies"), url: "/saved-movies" },
      ...topLevelOrigins,
      { text: t("Movies"), url: "/movies" },
      { text: t("TV Series"), url: "/series" },
      { text: t("TV Channels"), url: "/channels" },
      { text: t("Your Profile"), url: "/profile" },
    ];
  }, [t, topLevelOrigins]);

  useEffect(() => {
    if (location.pathname) {
      const matched = sideBarMenuItems.find(
        (item: any) => item.url === location.pathname
      );
      if (matched) {
        setSelectedParentOrigin(matched);
      }
    }
  }, [location.pathname, sideBarMenuItems]);

  useEffect(() => {
    if (location.pathname) {
      setActiveTab(location.pathname);
    }
  }, [location.pathname]);

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        aspectRatio: "16 / 9",
        display: "flex",
      }}>
      <Sidebar
        sideBarMenuItems={sideBarMenuItems}
        onParentSelect={setSelectedParentOrigin}
        isMobileLandscape={isMobileLandscape}
      />
      <Outlet
        context={[
          activeImage,
          setActiveImage,
          activeTab,
          setActiveTab,
          selectedParentOrigin,
          setSelectedChildOrigin,
          selectedChildOrigin,
          isMobileLandscape,
        ]}
      />
    </Box>
  );
};

export default MainLayout;
