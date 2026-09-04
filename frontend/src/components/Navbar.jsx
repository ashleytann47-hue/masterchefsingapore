export default function Navbar() {
  return (
    <nav className="absolute top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-5">
      <h1 className="text-white text-xl font-bold">
        MasterChef <span className="text-yellow-400">SG</span>
      </h1>

      <span className="text-yellow-400 font-semibold text-sm">
        Season 5
      </span>
    </nav>
  );
}