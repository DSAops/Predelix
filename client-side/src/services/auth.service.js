const API_URL = 'http://localhost:5000/api/auth';

// Common fetch options
const fetchOptions = {
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
};

export const authService = {
    async login(email, password) {
        try {
            const response = await fetch(`${API_URL}/login`, {
                ...fetchOptions,
                method: 'POST',
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }
            
            // Store access token
            if (data.accessToken) {
                localStorage.setItem('accessToken', data.accessToken);
            } else {
                throw new Error('No access token received');
            }
            
            return data;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },

    async register(username, email, password) {
        try {
            if (!username || !email || !password) {
                throw new Error('All fields are required');
            }

            if (!email.includes('@')) {
                throw new Error('Invalid email format');
            }

            if (password.length < 6) {
                throw new Error('Password must be at least 6 characters long');
            }

            const response = await fetch(`${API_URL}/register`, {
                ...fetchOptions,
                method: 'POST',
                body: JSON.stringify({ username, email, password })
            });

            let data;
            try {
                data = await response.json();
            } catch (e) {
                throw new Error('Invalid server response');
            }

            if (!response.ok) {
                throw new Error(data.message || data.error || 'Registration failed');
            }

            // Store access token
            if (data.accessToken) {
                localStorage.setItem('accessToken', data.accessToken);
            } else {
                throw new Error('No access token received');
            }
            return data;
        } catch (error) {
            console.error('Registration error:', error);
            // Convert any error to a proper Error object with a message
            throw error instanceof Error ? error : new Error(error?.message || 'Registration failed');
        }
    },

    async logout() {
        const response = await fetch(`${API_URL}/logout`, {
            method: 'POST',
            credentials: 'include'
        });

        localStorage.removeItem('accessToken');
        return response.ok;
    },

    async refreshToken() {
        try {
            const response = await fetch(`${API_URL}/refresh`, {
                method: 'POST',
                credentials: 'include'
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message);
            }

            localStorage.setItem('accessToken', data.accessToken);
            return data.accessToken;
        } catch (error) {
            console.error('Token refresh failed:', error);
            throw error;
        }
    },

    async getMe() {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                throw new Error('No access token found');
            }

            const response = await fetch(`${API_URL}/me`, {
                ...fetchOptions,
                method: 'GET',
                headers: {
                    ...fetchOptions.headers,
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to get user data');
            }
            return data;
        } catch (error) {
            console.error('GetMe error:', error);
            throw error;
        }
    }
};
