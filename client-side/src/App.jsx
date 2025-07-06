import AppRouter from "./router";
import { GoogleOAuthProvider } from '@react-oauth/google';
import config from './config';
import { ThemeProvider } from './context/ThemeContext';
import './styles/themes.css';

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