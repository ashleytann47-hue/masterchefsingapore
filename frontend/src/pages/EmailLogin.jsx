import { useState } from "react";
import emailLogo from "../assets/email-logo.png";

export default function EmailLogin() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  function nextStep(e) {
    e.preventDefault();

    if (!email.trim()) {
      alert("Please enter your email.");
      return;
    }

    localStorage.setItem("email_username", email);

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      window.location.href = "/login/email/password";
    }, 600);
  }

  return (
    <div className="min-h-screen bg-[#f0f4f9] flex items-center justify-center px-5">

      <div className="w-full max-w-5xl bg-white rounded-[28px] shadow-sm p-8 md:p-12">

        <div className="grid md:grid-cols-2 gap-12">

          {/* Left Side */}

          <div>

            <img
              src={emailLogo}
              alt="Logo"
              className="w-12 h-12 object-contain mb-8"
            />

            <h1 className="text-4xl font-normal text-gray-900">
              Sign in
            </h1>

            <p className="mt-3 text-gray-600 text-[16px]">
              Use your Email Account
            </p>

          </div>

          {/* Right Side */}

          <div>

            <form onSubmit={nextStep}>

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-400 rounded-md px-4 py-4 text-gray-900 outline-none focus:border-blue-600"
              />

              <div className="flex justify-end mt-10">

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#0b57d0] hover:bg-[#0842a0] text-white px-8 py-2.5 rounded-full font-medium transition"
                >
                  {loading ? "Loading..." : "Next"}
                </button>

              </div>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
}