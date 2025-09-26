import AppRouter from "./route";
import PWAInstallPrompt from "./components/PWAInstallPrompt";
import './App.css';

const App = () => (
    <>
      <AppRouter />
      <PWAInstallPrompt />
    </>
  );

export default App;
