import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { api } from "../utils/api";
import { AuthContext } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const Shop = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const nav = useNavigate();

    const { user, logout } = useContext(AuthContext);

    useEffect(() => {
        axios
            .get(api.getProducts)
            .then((res) => setProducts(res.data.products))
            .catch((err) => {
                setError(err.message);
                setProducts([]);
                console.error(err);
            });
    }, []);

    const handleLogout = () => {
        logout();
        nav("/");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-white p-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-purple-700">Our Products</h1>
                    <p className="text-gray-700 mt-1">
                        Welcome, {user ? user.first_name : "Guest"}
                    </p>
                </div>
                <button
                    onClick={user ? handleLogout : () => nav("/login")}
                    className={`px-4 py-2 rounded-lg shadow-md font-semibold transition ${user
                            ? "bg-red-600 text-white hover:bg-red-700"
                            : "bg-purple-600 text-white hover:bg-purple-700"
                        }`}
                >
                    {user ? "Logout" : "Login"}
                </button>
            </div>

            {error && (
                <p className="text-red-500 mb-4 font-medium">{error}</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white shadow-lg rounded-2xl p-6 flex flex-col gap-2 hover:shadow-2xl transition"
                        >
                            <h3 className="text-xl font-semibold text-purple-700">
                                {product.name}
                            </h3>
                            <p className="text-gray-600 flex-1">{product.description}</p>
                            <p className="text-teal-600 font-bold text-lg">
                                ${product.price}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-center col-span-full mt-4">
                        No products available
                    </p>
                )}
            </div>
        </div>
    );
};
