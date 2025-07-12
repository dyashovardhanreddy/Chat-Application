import { Outlet } from "react-router-dom"
import { Navbar } from "../components/NavBar"

export const AuthenticatedLayout = () => {
    return (
        <div>
            <Navbar />
            <div className="container">
                <Outlet />
            </div>
        </div>
    )
}