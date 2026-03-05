import { useState } from "react"
import AuthContext from "./Context";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({
        role: localStorage.getItem('role'),
        token: localStorage.getItem('token')
    });

    const signIn = (token, role) => {
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        setUser({ role, token });
    }

    const signOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setUser(null);
    }
    return (
        <AuthContext.Provider value={{user, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}

