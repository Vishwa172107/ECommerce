import { useEffect, useState, useContext } from "react";
import { api } from "../../utils/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";

export const AdminDashboard = () => {
  const [stats, setStats] = useState({ products: 0, customers: 0, orders: 0 });
  const navigate = useNavigate();
  const { isAdmin, logout } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(api.AdminStats)
      .then((res) => setStats(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (isAdmin === false) {
      navigate("/unAuthorized");
    }
  }, [isAdmin, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="p-8 bg-gradient-to-br from-purple-100 via-teal-50 to-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-teal-700">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition font-semibold"
        >
          Logout
        </button>
      </div>

      <div className="flex gap-4 mb-8">
        <button
          onClick={() => navigate("/admin/add-product")}
          className="bg-teal-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-teal-700 transition font-semibold"
        >
          Create New Product
        </button>
        <button
          onClick={() => navigate("/admin/products")}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-purple-700 transition font-semibold"
        >
          View Products List
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {["products", "customers", "orders"].map((key) => (
          <div
            key={key}
            className="bg-white shadow-2xl rounded-2xl p-6 flex flex-col items-center justify-center"
          >
            <h3 className="text-lg font-semibold capitalize text-gray-700 mb-2">{key}</h3>
            <p className="text-4xl font-bold text-teal-600">{stats[key]}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
