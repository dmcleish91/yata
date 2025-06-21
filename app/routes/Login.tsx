import { Mail } from "lucide-react";
import { useState } from "react";
import { useAuth } from "~/contexts/AuthContext";
import { handleError } from "~/libs/handleError";
import { ViewPort } from "~/components/ViewPort";
import { logError } from "~/libs/logger";

export default function Login() {
  const { signInWithMagicLink, error, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    try {
      await signInWithMagicLink(email);
      setSubmitted(true);
    } catch (error) {
      handleError(error);
    }
  }

  function handleEmailInput(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  function handleTryAgain() {
    setSubmitted(false);
    setEmail("");
  }

  return (
    <ViewPort>
      <div className="bg-base-200 border-base-300 flex min-h-screen w-full items-center justify-center rounded-xl border-4 p-4">
        <div className="card bg-base-100 w-full max-w-md p-8 shadow-xl">
          <div className="card-body p-0">
            <h2 className="mb-2 text-center text-2xl font-semibold">Sign In</h2>
            <p className="mb-6 text-center text-base text-gray-500">
              Enter your email to receive a magic link
            </p>

            {/* Login Form */}
            <div
              className={`transition-all duration-500 ease-in-out ${
                submitted
                  ? "pointer-events-none translate-y-4 opacity-0"
                  : "translate-y-0 opacity-100"
              }`}
            >
              {error && (
                <div className="alert alert-error mb-4">
                  <span>{error.message}</span>
                </div>
              )}
              <form className="space-y-4" onSubmit={handleMagicLink}>
                <div className="form-control">
                  <label htmlFor="email" className="sr-only">
                    <span className="label-text">Email address</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="input input-bordered w-full"
                    value={email}
                    onChange={handleEmailInput}
                    required
                    disabled={isLoading}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary flex w-full items-center justify-center"
                  disabled={isLoading || !email}
                >
                  {isLoading ? (
                    <span className="loading loading-spinner loading-md"></span>
                  ) : (
                    <>
                      <Mail className="mr-2 h-4 w-4" />
                      Send magic link
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Success Message */}
            <div
              className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-in-out ${
                submitted
                  ? "translate-y-0 opacity-100"
                  : "pointer-events-none translate-y-4 opacity-0"
              }`}
            >
              <div className="card bg-base-100 w-full p-8 shadow-xl">
                <div className="flex flex-col items-center space-y-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <Mail className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="space-y-2 text-center">
                    <h3 className="text-lg font-semibold text-gray-500">
                      Check your email
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-400">
                      We've sent a magic link to{" "}
                      <span className="font-medium text-gray-500">{email}</span>
                      .
                      <br />
                      Click the link to sign in.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="btn btn-outline mt-4"
                    onClick={handleTryAgain}
                  >
                    Try different email
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ViewPort>
  );
}
