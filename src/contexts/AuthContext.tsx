import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getProfile } from '@api/auth';
import axios from '@api/axios';

type AuthContextType = {
    isAuthenticated: boolean;
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
    loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    token: null,
    login: () => { },
    logout: () => { },
    loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const storedToken = await AsyncStorage.getItem('authToken');
                if (storedToken) {
                    setToken(storedToken);
                    axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;

                    try {
                        await getProfile();
                        setIsAuthenticated(true);
                    } catch (err) {
                        setIsAuthenticated(false);
                        await AsyncStorage.removeItem('authToken');
                        setToken(null);
                    }
                }
            } catch (e) {
                console.error('Auth initialization error:', e);
            } finally {
                setLoading(false);
            }
        };

        initializeAuth();
    }, []);

    const login = async (newToken: string) => {
        await AsyncStorage.setItem('authToken', newToken);
        setToken(newToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

        try {
            await getProfile();
            setIsAuthenticated(true);
        } catch (err) {
            setIsAuthenticated(false);
        }
    };

    const logout = async () => {
        await AsyncStorage.removeItem('authToken');
        delete axios.defaults.headers.common['Authorization'];
        setToken(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                token,
                login,
                logout,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
