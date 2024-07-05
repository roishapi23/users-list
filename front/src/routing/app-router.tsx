import { createBrowserRouter, Navigate } from "react-router-dom";
import { Register } from "../components/register";
import { UsersTable } from "../components/table/table";
import { UserDetails } from "../components/user-details";
import { UserForm } from "../components/user-form";
import { message } from "antd";

export const AppRouter = () => {

    return createBrowserRouter([
        {
            path: '/',
            element: <ProtectedRoute element={<UsersTable />} />,
        },
        {
            path: '/user/:id',
            element: <ProtectedRoute element={<UserDetails />} />,
        },
        {
            path: '/form',
            element: <ProtectedRoute element={<UserForm />} />,
        },
        {
            path: '/form/:id',
            element: <ProtectedRoute element={<UserForm />} />,
        },
        {
            path: "/register",
            element: <Register />
        },
    ])
}

interface ProtectedRouteProps {
    element: React.ReactElement;
}
const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
    return isAuthenticated() ? element : <Navigate to="/register" />;
};

const isAuthenticated = (): boolean => {
    // check if token exist
    let authenticated = !!localStorage.getItem('authToken');
    if (!authenticated) {
        message.error("Please register first !", 5);
    }
    return authenticated
};