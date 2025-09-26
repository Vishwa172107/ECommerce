import { useState, useContext, useEffect } from "react";
import { api } from "../utils/api";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../Contexts/AuthContext.jsx";

export const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const { login, user } = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            navigate("/dash");
        }
    }, [user, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            alert("Please fill all the fields");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert("Please enter a valid email");
            return;
        }

        axios.get(api.login, formData)
            .then(() => {
                login();
                navigate("/dash");
            })
            .catch((err) => {
                alert(err.message);
                console.error(err);
            });

        setFormData({ email: "", password: "" });
    };

    const handleGoogleLogin = () => {
        window.location.href = api.googleLogin;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-white flex items-center justify-center p-6">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md flex flex-col gap-4"
            >
                <h2 className="text-3xl font-bold text-purple-700 text-center mb-6">
                    User Login
                </h2>

                <div className="flex flex-col">
                    <label htmlFor="email" className="mb-1 text-gray-700 font-medium">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="password" className="mb-1 text-gray-700 font-medium">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition font-semibold shadow-md mt-4"
                >
                    Login
                </button>

                <div className="flex items-center justify-center gap-2 my-4">
                    <span className="h-px w-1/3 bg-gray-300"></span>
                    <span className="text-gray-500 text-sm font-medium">or</span>
                    <span className="h-px w-1/3 bg-gray-300"></span>
                </div>

                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center bg-white border border-gray-300 py-3 rounded-lg shadow-md hover:bg-gray-100 transition font-medium gap-2"
                >
                    <img
                        src="https://www.svgrepo.com/show/355037/google.svg"
                        alt="Google"
                        className="w-5 h-5"
                    />
                    Sign in with Google
                </button>
            </form>
        </div>
    );
};
