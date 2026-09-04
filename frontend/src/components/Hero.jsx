export default function Hero() {
  return (
    <section className="pt-16 pb-4 px-6 text-center">

      <h1 className="text-4xl md:text-6xl font-black text-white">
        MasterChef SG
      </h1>

      <p className="mt-2 text-yellow-400 text-lg font-semibold">
        Season 5 Voting Portal
      </p>

      <p className="mt-3 text-gray-200 max-w-md mx-auto text-sm">
        Vote for your favourite contestant and help decide who becomes the next MasterChef SG Champion.
      </p>

      <div className="mt-6 mx-auto max-w-xs rounded-3xl bg-black/40 backdrop-blur-md border border-white/10 p-5">

        <p className="text-yellow-400 font-bold tracking-wider text-sm">
          🔥 LIVE VOTES
        </p>

        <h2 className="text-4xl font-black mt-1">
          1,428
        </h2>

        <p className="mt-3 text-gray-300 text-xs">
          Voting closes in
        </p>

        <h3 className="text-lg font-bold mt-1 text-yellow-300">
          11 HOURS
        </h3>

      </div>

    </section>
  );
}