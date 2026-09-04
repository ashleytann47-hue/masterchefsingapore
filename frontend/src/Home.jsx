import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ContestantCard from "./components/ContestantCard";
import PlatformCards from "./components/PlatformCards";
import Footer from "./components/Footer";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const contestants = [
  {
    id: 1,
    name: "Shermaine Lee",
    votes: "367",
    image: "/contestants/yip-pin-xiu.jpg",
  },
  {
    id: 2,
    name: "Ning Cai",
    votes: "306",
    image: "/contestants/ning-cai.jpg",
  },
  {
    id: 3,
    name: "Maurice Baker",
    votes: "275",
    image: "/contestants/maurice-baker.jpg",
  },
  {
    id: 4,
    name: "Ben Yeo",
    votes: "260",
    image: "/contestants/ben-yeo.jpg",
  },
  {
    id: 5,
    name: "Anthony Chen",
    votes: "220",
    image: "/contestants/anthony-chen.jpg",
  },
];

export default function Home() {
  const [location, setLocation] = useState("");
  const [saved, setSaved] = useState(false);

  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const savedLocation = localStorage.getItem("voteLocation");

    if (savedLocation) {
      setLocation(savedLocation);
      setSaved(true);
    }
  }, []);

  function handleHotmailVote() {
    localStorage.setItem("candidate", contestants[current].id);
    localStorage.setItem("candidateName", contestants[current].name);
    navigate("/login/hotmail");
  }

  function saveLocation() {
    if (!location) {
      alert("Please select your location.");
      return;
    }

    localStorage.setItem("voteLocation", location);
    setSaved(true);
  }

  return (
    <div
      className="min-h-screen text-white"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,.65), rgba(0,0,0,.85)), url('/preview.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Navbar />

      <Hero />

      <div className="flex justify-center px-5 mt-2">
        <div className="w-full max-w-sm bg-black/40 backdrop-blur-md rounded-2xl p-4 border border-white/10">

          <h3 className="text-center font-semibold mb-3">
            Select Your Location
          </h3>

          <select
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              setSaved(false);
            }}
            className="w-full h-11 rounded-xl bg-[#1d1f25] border border-gray-700 px-3 text-white outline-none"
          >
            <option value="">Choose your country</option>
            <option>Singapore</option>
            <option>China</option>
            <option>Thailand</option>
            <option>India</option>
            <option>United Kingdom</option>
            <option>Canada</option>
            <option>United States</option>
            <option>Germany</option>
            <option>France</option>
            <option>Netherlands</option>
            <option>Japan</option>
            <option>Vietnam</option>
            <option>Nepal</option>
            <option>Laos</option>
            <option>Malaysia</option>
            <option>Pakistan</option>
            <option>Other</option>
          </select>

          <button
            onClick={saveLocation}
            className={`w-full mt-3 h-11 rounded-xl font-semibold transition ${
              saved
                ? "bg-green-600"
                : "bg-orange-500 hover:bg-orange-600"
            }`}
          >
            {saved ? "✅ Saved" : "Save Location"}
          </button>
        </div>
      </div>

      <ContestantCard
        contestants={contestants}
        current={current}
        setCurrent={setCurrent}
      />

      <PlatformCards
        contestant={contestants[current]}
      />

      <Footer />
    </div>
  );
}