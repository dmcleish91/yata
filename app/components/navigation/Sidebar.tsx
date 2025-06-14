import { Link, useLocation, useNavigate } from "react-router";
import { useAuth } from "~/libs/auth/AuthContext";
import { Home, Inbox, Calendar, Clock, Info, LogOut, LogIn } from "lucide-react";
import { handleError } from "~/libs/handleError";

/**
 * Sidebar component that provides navigation and replaces the TopNavigation.
 * Uses DaisyUI styling and Lucide icons for a consistent look.
 */
export default function Sidebar() {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  /**
   * Determines if a link is active based on the current pathname.
   */
  const isActive = (path: string): boolean => {
    return location.pathname === path;
  };

  /**
   * Handles the sign out process and redirects to login page.
   */
  async function handleSignOut() {
    try {
      await signOut();
      navigate("/login");
    } catch (error) {
      handleError(error);
    }
  }

  return (
    <div className="bg-base-300 w-64 min-h-screen flex flex-col">
      {/* Header */}
      <div className="border-b border-base-300/50">
        <div className="flex items-center justify-between p-4">
          <Link to="/" className="text-xl font-bold flex items-center gap-2">
            <Home className="h-5 w-5" />
            YATA
          </Link>
        </div>
      </div>

      {/* Main Menu */}
      <div className="flex-1 overflow-y-auto">
        <ul className="menu p-4 gap-2">
          <li>
            <Link
              to="/"
              className={`flex items-center gap-2 hover:bg-base-300/50 ${
                isActive("/") ? "bg-base-300/50" : ""
              }`}
            >
              <Inbox className="h-5 w-5" />
              <span>Inbox</span>
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className={`flex items-center gap-2 hover:bg-base-300/50 ${
                isActive("/") ? "bg-base-300/50" : ""
              }`}
            >
              <Calendar className="h-5 w-5" />
              <span>Today</span>
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className={`flex items-center gap-2 hover:bg-base-300/50 ${
                isActive("/") ? "bg-base-300/50" : ""
              }`}
            >
              <Clock className="h-5 w-5" />
              <span>Upcoming</span>
            </Link>
          </li>
          {!user?.isLoggedIn && (
            <>
              <li>
                <Link
                  to="/about"
                  className={`flex items-center gap-2 hover:bg-base-300/50 ${
                    isActive("/about") ? "bg-base-300/50" : ""
                  }`}
                >
                  <Info className="h-5 w-5" />
                  <span>About</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className={`flex items-center gap-2 hover:bg-base-300/50 ${
                    isActive("/login") ? "bg-base-300/50" : ""
                  }`}
                >
                  <LogIn className="h-5 w-5" />
                  <span>Login</span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Footer */}
      {user?.isLoggedIn && (
        <div className="border-t border-base-300/50 p-4">
          <button
            onClick={handleSignOut}
            className="btn btn-ghost w-full flex items-center gap-2"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
} 