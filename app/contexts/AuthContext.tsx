import {
  useState,
  createContext,
  useContext,
  type ReactNode,
  useEffect,
} from "react";
import type { AuthError, User } from "~/types/auth";
import {
  createClient,
  type Session,
  type AuthError as SupabaseAuthError,
} from "@supabase/supabase-js";
import ax from "../libs/client";
import { env } from "../../src/config/env";

export const supabase = createClient(
  env.VITE_SUPABASE_URL,
  env.VITE_SUPABASE_ANON_KEY,
);

type AuthContextType = {
  user: User | null;
  error: AuthError | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  signInWithMagicLink: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [error, setError] = useState<AuthError | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        const userData: User = {
          id: session.user.id,
          email: session.user.email || "",
          isLoggedIn: true,
        };
        setUser(userData);
        ax.defaults.headers.common["Authorization"] =
          `Bearer ${session.access_token}`;
      }
      setIsLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_, session) => {
      setSession(session);

      if (session?.user) {
        const userData: User = {
          id: session.user.id,
          email: session.user.email || "",
          isLoggedIn: true,
        };
        setUser(userData);
        // Set authorization header for your backend
        ax.defaults.headers.common["Authorization"] =
          `Bearer ${session.access_token}`;
      } else {
        setUser(null);
        // Remove authorization header
        delete ax.defaults.headers.common["Authorization"];
      }

      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function signInWithMagicLink(email: string): Promise<void> {
    try {
      setIsLoading(true);
      setError(null);

      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          // Redirect to your app after clicking magic link
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;

      // Success - magic link sent
      console.log("Magic link sent to", email);
    } catch (err) {
      const supabaseError = err as SupabaseAuthError;
      setError({
        message: supabaseError.message,
        code: 400,
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  }

  async function signOut(): Promise<void> {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      setUser(null);
      setSession(null);
      delete ax.defaults.headers.common["Authorization"];
    } catch (err) {
      const supabaseError = err as SupabaseAuthError;
      setError({
        message: supabaseError.message,
        code: 400,
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, setUser, error, isLoading, signInWithMagicLink, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// utility function to make using context easier in components
export function useAuth() {
  const currentAuthContext = useContext(AuthContext);
  if (!currentAuthContext) {
    throw new Error(
      "Authentication context is unavailable. " +
        "This usually means you are trying to use the useAuth() hook outside of an <AuthProvider>. " +
        "Please ensure your component is wrapped in <AuthProvider> at a higher level in the component tree.",
    );
  }
  return currentAuthContext;
}
