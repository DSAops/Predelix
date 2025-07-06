import AppRouter from "./router";
import { GoogleOAuthProvider } from '@react-oauth/google';
import config from './config';
import { ThemeProvider } from './context/ThemeContext';
import { LoadingProvider, useLoading } from './context/LoadingContext';
import LoadingAnimation from './components/LoadingAnimation';
import './styles/themes.css';

// Main App Content Component
const AppContent = () => {
  const { isLoading, loadingMessage } = useLoading();

  return (
    <>
      <AppRouter />
      {isLoading && <LoadingAnimation message={loadingMessage} />}
    </>
  );
};

function App() {
  return (
    <GoogleOAuthProvider clientId={config.googleClientId}>
      <ThemeProvider>
        <LoadingProvider>
          <AppContent />
        </LoadingProvider>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}

export default App;