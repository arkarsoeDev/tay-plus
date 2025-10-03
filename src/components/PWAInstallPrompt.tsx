import { useEffect, useState } from "react";

// Define the event type for TypeScript
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed',
    platform: string
  }>;
  prompt(): Promise<void>;
}

const PWAInstallPrompt = () => {
  const [showModal, setShowModal] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if the app is already installed
    const isInstalled = window.matchMedia('(display-mode: standalone)').matches ||
                       (navigator as any).standalone;

    if (isInstalled) {
      return;
    }

    // A) Logic for Chrome/Android
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
      setShowModal(true); // Show the modal
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // B) Logic for iOS Safari
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(userAgent);
    const isSafari = userAgent.includes('safari') && !userAgent.includes('chrome');

    if (isIOSDevice || isSafari) {
      setIsIOS(true);
      setShowModal(true); // Show the modal
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt.');
      } else {
        console.log('User dismissed the install prompt.');
      }
      setDeferredPrompt(null);
      setShowModal(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  if (!showModal) {
    return null;
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <button onClick={closeModal} className="modal-close-btn">&times;</button>

        {isIOS ? (
          <>
            <h3>Install App</h3>
            <p>For the best experience, add this app to your home screen.</p>
            <p>
              Tap the **Share** icon (<i className="share-icon"></i>) then **Add to Home Screen**.
            </p>
            <button className="btn" onClick={closeModal}>Got It</button>
          </>
        ) : (
          <>
            <h3>Install App</h3>
            <p>Add this app to your home screen for quick access and offline use.</p>
            <button className="btn" onClick={handleInstallClick}>Install</button>
            <button className="btn" onClick={closeModal}>No Thanks</button>
          </>
        )}
      </div>
    </div>
  );
};

export default PWAInstallPrompt;
