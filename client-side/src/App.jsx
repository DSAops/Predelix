import { GoogleOAuthProvider } from '@react-oauth/google';
import config from './config';
import AppRouter from './router';

function App() {
  return (
    <GoogleOAuthProvider clientId={config.googleClientId}>
      <AppRouter />
    </GoogleOAuthProvider>
  );
}

export default App;