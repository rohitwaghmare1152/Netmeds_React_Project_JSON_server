import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function PrivateRoute ({ children }) {
    const { user } = useAuth();
    const location = useLocation();
    return user?.token? children : <Navigate to='/auth' replace state={{ from:location }} />
};