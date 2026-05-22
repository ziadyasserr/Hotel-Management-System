import { useEffect, useState } from "react";
import { ADMIN_URLS } from "../../../../constants/urls/urls";
import { axiosInstance } from "../../../../constants/urls/Urls";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";
import { FaBed, FaUsers, FaAd, FaTools } from "react-icons/fa";
import Loader from "../../../../shared/components/Loader/Loader";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const getDashboardStats = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(ADMIN_URLS.GET_CHARTS);
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboardStats();
  }, []);

  if (loading) return <p className="p-5"><Loader /></p>;
  if (!data) return null;

  // ================= CHART DATA =================
  const bookingChart = {
    labels: ["Pending", "Completed"],
    datasets: [
      {
        data: [data.bookings.pending, data.bookings.completed],
        backgroundColor: ["#5368F0", "#22C55E"],
        borderWidth: 0,
      },
    ],
  };

  const usersChart = {
    labels: ["Users", "Admins"],
    datasets: [
      {
        label: "Count",
        data: [data.users.user, data.users.admin],
        backgroundColor: ["#6366F1", "#A855F7"],
        borderRadius: 6,
      },
    ],
  };

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">

      {/* ===== TITLE ===== */}
      <h1 className="text-2xl font-bold text-[#1F263E]">
        Dashboard Overview
      </h1>

      {/* ================= CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

        {/* CARD */}
        <div className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition flex items-center gap-4">
          <div className="bg-indigo-100 text-indigo-600 p-3 rounded-xl">
            <FaBed size={20} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Rooms</p>
            <h2 className="text-2xl font-bold text-[#1F263E]">
              {data.rooms}
            </h2>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition flex items-center gap-4">
          <div className="bg-green-100 text-green-600 p-3 rounded-xl">
            <FaTools size={20} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Facilities</p>
            <h2 className="text-2xl font-bold text-[#1F263E]">
              {data.facilities}
            </h2>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition flex items-center gap-4">
          <div className="bg-pink-100 text-pink-600 p-3 rounded-xl">
            <FaAd size={20} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Ads</p>
            <h2 className="text-2xl font-bold text-[#1F263E]">
              {data.ads}
            </h2>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition flex items-center gap-4">
          <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">
            <FaUsers size={20} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Users</p>
            <h2 className="text-2xl font-bold text-[#1F263E]">
              {data.users.user + data.users.admin}
            </h2>
          </div>
        </div>

      </div>

      {/* ================= CHARTS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* PIE */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h3 className="mb-5 font-semibold text-[#1F263E]">
            Bookings Status
          </h3>

          <div className="max-w-[300px] mx-auto">
            <Pie data={bookingChart} />
          </div>
        </div>

        {/* BAR */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h3 className="mb-5 font-semibold text-[#1F263E]">
            Users vs Admins
          </h3>

          <Bar data={usersChart} />
        </div>

      </div>

    </div>
  );
}

export default Dashboard;