import { useNavigate } from "react-router-dom";

// project imports
import { ReactElement, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

export type GuardProps = {
  children: ReactElement | null;
};

// ==============================|| GUEST GUARD ||============================== //

/**
 * Guest guard for routes having no auth required
 * @param {PropTypes.node} children children element/node
 */

const GuestGuard = ({ children }: GuardProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/interview", { replace: true });
    }
  }, [user, navigate]);

  return children;
};

export default GuestGuard;
