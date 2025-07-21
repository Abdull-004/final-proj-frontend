import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiRequest } from './api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Initialize user from token
    useEffect(() => {
        if (token) {
            const userData = localStorage.getItem('user');
            try {
                setUser(userData ? JSON.parse(userData) : null);
            } catch (err) {
                console.error("Failed to parse user data:", err);
                logout();
            }
        }
    }, [token]);

    const handleAuthResponse = (res) => {
        if (!res.token || !res.user) {
            throw new Error("Invalid server response");
        }

        setToken(res.token);
        setUser(res.user);
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        return true;
    };

    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const res = await apiRequest('/auth/login', 'POST', { email, password });
            return handleAuthResponse(res);
        } catch (err) {
            const errorMsg = err.response?.data?.message || err.message || "Login failed";
            setError(errorMsg);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const register = async (data) => {
        setLoading(true);
        setError(null);
        try {
            // Basic frontend validation
            if (!data.name || !data.email || !data.password || !data.role) {
                throw new Error("All fields are required");
            }

            const res = await apiRequest('/auth/register', 'POST', data);
            return handleAuthResponse(res);
        } catch (err) {
            const errorMsg = err.response?.data?.message || err.message || "Registration failed";
            setError(errorMsg);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{
            user,
            token,
            loading,
            error,
            login,
            register,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}