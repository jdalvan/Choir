import { Navigate, Outlet } from "react-router-dom";

// Iyi irinda ko umuntu winjira muri Dashboard ataraloginga
export const PrivateRoute = () => {
  const token = localStorage.getItem("user_token");
  
  // Niba nta token ihari, musubize kuri Login
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

// Iyi irinda ko Member ajya kwa Leader cyangwa Leader akajya kwa Member
export const RoleRoute = ({ allowedRole }) => {
  const userRole = localStorage.getItem("user_role");

  // Niba role ye idahuye n'iyemewe kuri iyi paji, musubize iwe
  if (userRole !== allowedRole) {
    const fallback = userRole === "leader" ? "/dashboard/leader" : "/dashboard/member";
    return <Navigate to={fallback} replace />;
  }

  return <Outlet />;
};