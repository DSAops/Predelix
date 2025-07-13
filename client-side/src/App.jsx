import { GoogleOAuthProvider } from '@react-oauth/google';
import config from './config';
import { ThemeProvider } from './context/ThemeContext';
import { LoadingProvider, useLoading } from './context/LoadingContext';
import { DemoModalProvider } from './context/DemoModalContext';
import LoadingAnimation from './components/LoadingAnimation';
import './styles/themes.css';
import AppRouter from './router';

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
          <DemoModalProvider>
            <AppContent />
          </DemoModalProvider>
        </LoadingProvider>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}

export default App;