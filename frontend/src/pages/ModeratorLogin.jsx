import { useState } from "react";

export default function ModeratorLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    if (
      username === "moderator" &&
      password === "MasterChef2026!"
    ) {
      localStorage.setItem("moderatorLoggedIn", "true");
      window.location.href = "/moderator";
    } else {
      alert("Invalid username or password.");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-8">
          Moderator Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-5">

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border rounded-lg px-4 py-3 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg px-4 py-3 outline-none"
          />

          <button
            type="submit"
            className="w-full bg-black text-white rounded-lg py-3 font-semibold"
          >
            Login
          </button>

        </form>

      </div>
    </div>
  );
}