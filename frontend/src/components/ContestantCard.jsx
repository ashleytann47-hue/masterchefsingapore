export default function ContestantCard({
  contestants,
  current,
  setCurrent,
}) {
  const contestant = contestants[current];
  const goalVotes = 600;
  const votesPercentage = (parseInt(contestant.votes.replace(/,/g, "")) / goalVotes) * 100;

  function next() {
    setCurrent((current + 1) % contestants.length);
  }

  function prev() {
    setCurrent((current - 1 + contestants.length) % contestants.length);
  }

  return (
    <section className="pb-4 px-5">

      <div className="max-w-sm mx-auto flex items-center justify-between">

        <button
          onClick={prev}
          className="w-11 h-11 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white hover:bg-white/20"
        >
          ←
        </button>

        <div className="text-center">

         

          <h2 className="mt-5 text-3xl font-bold">
            {contestant.name}
          </h2>

          <p className="mt-2 text-yellow-400 font-bold text-lg">
            🔥 {contestant.votes} Votes
          </p>

          <div className="mt-4 w-64 mx-auto">
            <div className="h-3 bg-gray-700 rounded-full overflow-hidden border border-white/20">
              <div
                className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-500"
                style={{ width: `${Math.min(votesPercentage, 100)}%` }}
              />
            </div>
            <p className="text-sm text-gray-300 mt-2">
              {Math.min(Math.round(votesPercentage), 100)}% to 600 Votes
            </p>
          </div>

        </div>

        <button
          onClick={next}
          className="w-11 h-11 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white hover:bg-white/20"
        >
          →
        </button>

      </div>

    </section>
  );
}