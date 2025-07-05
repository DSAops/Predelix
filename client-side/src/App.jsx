import AppRouter from "./router";
import { GoogleOAuthProvider } from '@react-oauth/google';
import config from './config';

function App() {
  return (
    <GoogleOAuthProvider clientId={config.googleClientId}>
      <AppRouter />
    </GoogleOAuthProvider>
  );
}

export default App;