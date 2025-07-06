import { GoogleOAuthProvider } from '@react-oauth/google';
import config from './config';
import { ThemeProvider } from './context/ThemeContext';
import './styles/themes.css';
import AppRouter from './router';

function App() {
  return (
    <GoogleOAuthProvider clientId={config.googleClientId}>
      <ThemeProvider>
        <AppRouter />
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}

export default App;