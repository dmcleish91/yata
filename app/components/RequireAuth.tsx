import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { useAuth } from "~/libs/auth/AuthContext";

export default function RequireAuth() {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login");
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <Outlet />;
}
