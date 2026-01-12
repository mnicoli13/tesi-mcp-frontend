import { useNavigate, useLocation } from "react-router-dom";

// project imports
import { ReactElement, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
// ==============================|| AUTH GUARD ||============================== //

export type GuardProps = {
  children: ReactElement | null;
};

/**
 * Authentication guard for routes
 * @param {PropTypes.node} children children element/node
 */
const AuthGuard = ({ children }: GuardProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      console.log("navigate login 1");
      navigate("/login", { replace: true });
      return;
    }
  }, [user, navigate, location.pathname]);

  return children;
};

export default AuthGuard;
