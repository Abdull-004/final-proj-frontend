import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiRequest } from './api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (token) {
            // Optionally fetch user profile here
            setUser(JSON.parse(localStorage.getItem('user')));
        }
    }, [token]);

    const login = async (email, password) => {
        setLoading(true); setError(null);
        try {
            const res = await apiRequest('/auth/login', 'POST', { email, password });
            setToken(res.token);
            setUser(res.user);
            localStorage.setItem('token', res.token);
            localStorage.setItem('user', JSON.stringify(res.user));
            setLoading(false);
            return true;
        } catch (err) {
            setError(err.message);
            setLoading(false);
            return false;
        }
    };

    const register = async (data) => {
        setLoading(true); setError(null);
        try {
            const res = await apiRequest('/auth/register', 'POST', data);
            setToken(res.token);
            setUser(res.user);
            localStorage.setItem('token', res.token);
            localStorage.setItem('user', JSON.stringify(res.user));
            setLoading(false);
            return true;
        } catch (err) {
            setError(err.message);
            setLoading(false);
            return false;
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, error, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
} 