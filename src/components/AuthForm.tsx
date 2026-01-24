"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type AuthMode = "sign-in" | "sign-up";

export default function AuthForm() {
  const [mode, setMode] = useState<AuthMode>("sign-in");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
  };
  return (
    <section
      id={mode === "sign-in" ? "sign-in" : "sign-up"}
      className="py-20 px-6"
    >
      <div className="max-w-md mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-light text-foreground mb-4 tracking-wide">
            {mode === "sign-in" ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-muted-foreground">
            {mode === "sign-in"
              ? "Sign in to access your account and reservations"
              : "Join us for an exclusive dining experience"}
          </p>
        </div>

        <div className="bg-card border border-border rounded-xl p-8">
          <div className="flex mb-8">
            <button
              type="button"
              onClick={() => setMode("sign-in")}
              className={`flex-1 pb-4 text-sm tracking-wide border-b-2 transition-colors ${
                mode === "sign-in"
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              SIGN IN
            </button>
            <button
              type="button"
              onClick={() => setMode("sign-up")}
              className={`flex-1 pb-4 text-sm tracking-wide border-b-2 transition-colors ${
                mode === "sign-up"
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              SIGN UP
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {mode === "sign-up" && (
              <div className="space-y-2">
                <div>
                  <input
                    type="text"
                    id="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-0 py-3 bg-transparent border-b border-(--color-primary) text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-(--color-primary) transition-colors"
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <div>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-0 py-3 bg-transparent border-b border-(--color-primary) text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-(--color-primary) transition-colors"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  className="w-full px-0 py-3 bg-transparent border-b border-(--color-primary) text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-(--color-primary) transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {mode === "sign-in" && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded border-border bg-input"
                  />
                  <span className="text-sm text-muted-foreground">
                    Remember me
                  </span>
                </label>
                <a href="#" className="text-sm text-primary hover:underline">
                  Forgot password?
                </a>
              </div>
            )}

            <button
              type="submit"
              className="w-full inline-block mt-10 px-8 py-3 bg-(--color-primary-foreground) text-(--color-primary) hover:bg-(--color-primary) hover:text-(--color-primary-foreground) border border-(--color-primary) text-sm rounded-3xl tracking-wider uppercase transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Processing...
                </span>
              ) : mode === "sign-in" ? (
                "SIGN IN"
              ) : (
                "CREATE ACCOUNT"
              )}
            </button>
          </form>
        </div>

        {mode === "sign-up" && (
          <p className="text-center text-sm text-muted-foreground mt-6">
            By creating an account, you agree to our{" "}
            <a href="#" className="text-primary hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-primary hover:underline">
              Privacy Policy
            </a>
          </p>
        )}
      </div>
    </section>
  );
}
