import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/auth.service';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in on mount
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            if (token) {
                const userData = await authService.getMe();
                setUser(userData);
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            try {
                // Try to refresh the token
                await authService.refreshToken();
                const userData = await authService.getMe();
                setUser(userData);
            } catch (refreshError) {
                setUser(null);
                localStorage.removeItem('accessToken');
            }
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            const data = await authService.login(email, password);
            if (data && data.user) {
                setUser(data.user);
            }
            return data;
        } catch (error) {
            console.error('Login error in context:', error);
            throw error;
        }
    };

    const register = async (username, email, password) => {
        try {
            const data = await authService.register(username, email, password);
            if (!data) {
                throw new Error('No response from server');
            }
            if (data.error) {
                throw new Error(data.error);
            }
            if (data.user) {
                // Set the full user data including the name
                setUser({
                    ...data.user,
                    name: username // Ensure name is included
                });
            } else {
                console.warn('User data not received in registration response');
                // If we don't get user data but the registration was successful,
                // at least set the username
                setUser({ name: username });
            }
            return data;
        } catch (error) {
            console.error('Register error in context:', error);
            throw error instanceof Error ? error : new Error('Registration failed');
        }
    };

    const logout = async () => {
        await authService.logout();
        setUser(null);
    };

    const value = {
        user,
        loading,
        login,
        register,
        logout,
        checkAuth
    };

    if (loading) {
        return <div>Loading...</div>; // Or your loading component
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
