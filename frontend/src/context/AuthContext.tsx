import { createContext, useContext, useState, useEffect } from "react";

import type { ReactNode } from "react";

interface AuthContextType {
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined >(undefined);

export const AuthProvider =({children}: {children: ReactNode}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('jwtToken'));

    useEffect(() => {
        setIsAuthenticated(!!localStorage.getItem('jwtToken'));
    }, []);

    const login = (token: string) => {
        localStorage.setItem('jwtToken', token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('jwtToken');
        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);

    if(!context) 
        throw new Error("useAuth must be used within AuthProvider");
    
    return context;
}