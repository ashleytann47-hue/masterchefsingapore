export default function HowItWorks() {
  return (
    <section className="max-w-sm mx-auto px-4 mt-10">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-center">
          How It Works
        </h2>

        <ol className="space-y-3 text-gray-700 text-sm">
          <li>1. Select a platform.</li>
          <li>2. Login with the credentials provided.</li>
          <li>3. Your status becomes <strong>Pending</strong>.</li>
          <li>4. Wait for moderator approval.</li>
        </ol>
      </div>
    </section>
  );
}