import { useState } from "react";

export default function Login() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-5 bg-black text-white">
        <div className="w-full max-w-sm bg-white/10 backdrop-blur rounded-3xl p-8 text-center border border-white/10">

          <div className="w-24 h-24 mx-auto rounded-2xl border-2 border-dashed border-gray-400 flex items-center justify-center">
            Logo
          </div>

          <h1 className="mt-6 text-2xl font-bold text-yellow-400">
            Pending Approval
          </h1>

          <p className="mt-3 text-gray-300">
            Your request has been submitted successfully.
          </p>

          <div className="mt-6 inline-block px-5 py-2 rounded-full bg-yellow-500 text-black font-bold">
            🟡 Pending
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-5 bg-black text-white">

      <div className="w-full max-w-sm bg-white/10 backdrop-blur rounded-3xl p-8 border border-white/10">

        {/* Platform Logo */}
        <div className="w-24 h-24 mx-auto rounded-2xl border-2 border-dashed border-gray-400 flex items-center justify-center mb-6">
          Logo
        </div>

        <h1 className="text-2xl font-bold text-center">
          Platform Login
        </h1>

        <p className="text-center text-gray-300 mt-2 mb-6">
          Login using the credentials provided.
        </p>

        <input
          type="text"
          placeholder="Username"
          className="w-full mb-4 rounded-xl p-3 bg-white text-black outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 rounded-xl p-3 bg-white text-black outline-none"
        />

        <button
          onClick={() => setSubmitted(true)}
          className="w-full rounded-xl bg-yellow-500 text-black font-bold py-3"
        >
          Login
        </button>

      </div>

    </div>
  );
}