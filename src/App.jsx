import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/landingpage"; 
import DashboardLayout from "./layouts/DashboardLayout"; 
import LoginForm from "./features/auth/LoginForm";
import PublicLayout from "./layouts/PublicLayout";
import RegisterForm from "./features/auth/RegisterForm";
import ForgotPassword from "./features/auth/ForgotPassword";

// 1. Import ama-Wrappers
import { PrivateRoute, RoleRoute } from "./features/auth/AuthRoutes"; 

// 2. Dashboards
import LeaderDashboard from "./pages/LeaderPage";
import MemberDashboard from "./pages/MemberPage";

function App() {
  return (
    <BrowserRouter>
      {/* KURAHO 'element' kuri Routes, koresha Routes isanzwe */}
      <Routes>
        
        {/* --- PUBLIC ROUTES (Zitari muri PrivateRoute) --- */}
        <Route path="/" element={<PublicLayout />}>
          <Route path="" element={<LandingPage />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="register" element={<RegisterForm />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* --- PROTECTED ROUTES (Izi nizo zifunze Sidebar) --- */}
        {/* Iyo ukanze Logout, iyi PrivateRoute ihita ibona ko Token yagiye ikagusohora */}
        <Route element={<PrivateRoute />}>
          
          <Route path="/dashboard" element={<DashboardLayout />}>
            
            {/* Inzira ya LEADER gusa */}
            <Route element={<RoleRoute allowedRole="leader" />}>
              <Route path="leader" element={<LeaderDashboard />} />
            </Route>

            {/* Inzira ya MEMBER gusa */}
            <Route element={<RoleRoute allowedRole="member" />}>
              <Route path="member" element={<MemberDashboard />} />
            </Route>

          </Route>
        </Route>

        {/* Redirects & Errors */}
        <Route path="*" element={<div className="text-white text-center py-20 font-bold text-2xl">404 | Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;