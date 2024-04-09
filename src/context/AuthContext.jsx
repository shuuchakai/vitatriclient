import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = async (username, password) => {
        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const { token } = await response.json();
            localStorage.setItem('token', token);
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};