import { Navigate } from "react-router-dom";

const UserRoute = ({ children }) => {
    let token = localStorage.getItem("token");
    let isUser = localStorage.getItem("isUser");
    if (!isUser && !token) {
        return <Navigate to="/login" />;
    }
    return children;
};
export default UserRoute;
