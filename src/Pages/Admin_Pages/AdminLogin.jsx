import { useState, useContext } from "react";
import { api } from "../../utils/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";

export const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    await axios.post(api.login, { email : email, password: password })
    .then(async (res) => {
        await login();
        navigate("/admin/dashboard");
        console.log(res.data);
    })
    .catch((err) => {
        setError("Invalid email or password");
        console.error(err);
    });
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-purple-100 via-teal-50 to-white">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-sm"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-teal-700">
          Admin Login
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center font-medium">
            {error}
          </p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition font-semibold shadow-md"
        >
          Login
        </button>
      </form>
    </div>
  );
};
