import { useEffect } from "react"
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
export const LogoutPage: React.FC = () => {

    const { logout } = useAuth();

    useEffect(() => {
        logout();
    },[]);

    return (
        <div>
            Logging Out
        </div>
    )
}