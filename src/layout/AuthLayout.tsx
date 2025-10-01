import { useEffect } from "react"
import { Outlet } from "react-router-dom";

const AuthLayout = () => {

  const isPWAInstalled = () => {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isIOSStandalone = ('standalone' in window.navigator) && (window.navigator.standalone);
    return isStandalone || isIOSStandalone;
  };

  const lockLandscape = () => {
    // Only apply the lock if the app is installed as a PWA
    const lock = (screen.orientation as any).lock;
    if (isPWAInstalled() && screen.orientation && lock) {
      lock('portrait')
        .then(() => alert('Screen locked to portrait for content view.'))
        .catch((error: any) => console.warn('Landscape lock failed or denied:', error));
    }
  };

  useEffect(() => {
    lockLandscape();
  }, [])

  return (
    <Outlet />
  )
}

export default AuthLayout
