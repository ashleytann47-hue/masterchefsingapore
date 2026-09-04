import { useNavigate } from "react-router-dom";

export default function PlatformCards({ contestant }) {
  const navigate = useNavigate();

  const platforms = [
    {
      id: "instagram",
      name: "Vote with Instagram",
      color: "from-pink-500 via-purple-500 to-orange-500",
      icon: "📸",
    },
    {
      id: "facebook",
      name: "Vote with Facebook",
      color: "from-blue-700 to-blue-500",
      icon: "📘",
    },
    {
      id: "x",
      name: "Vote with X",
      color: "from-black to-zinc-800",
      icon: "✖",
    },
    {
      id: "hotmail",
      name: "Vote with Hotmail",
      color: "from-blue-700 to-sky-500",
      icon: "✉️",
    },
  ];

  function handlePlatform(platformId) {
    localStorage.setItem("candidate", contestant.id);
    localStorage.setItem("candidateName", contestant.name);

    navigate(`/login/${platformId}`);
  }

  return (
    <section className="py-4 flex justify-center">
      <div className="w-[88%] max-w-[300px]">
        <h2 className="text-center text-base font-bold text-white mb-3">
          Choose Your Voting Platform
        </h2>

        <div className="space-y-2">
          {platforms.map((platform) => (
            <button
              key={platform.id}
              onClick={() => handlePlatform(platform.id)}
              className={`w-full bg-gradient-to-r ${platform.color} rounded-xl py-3 px-4 flex items-center justify-between shadow-lg transition active:scale-95`}
            >
              <div className="flex items-center gap-2">
                <span>{platform.icon}</span>

                <span className="text-white font-semibold">
                  {platform.name}
                </span>
              </div>

              <span className="text-white">→</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}