import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { api } from "../../utils/api";
import { AuthContext } from "../../Contexts/AuthContext";

export const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const navigate = useNavigate();
  const { isAdmin } = useContext(AuthContext);

  useEffect(() => {
    if (isAdmin === false) {
      navigate("/unAuthorized");
    }
  }, [isAdmin, navigate]);

  const handleAdd = async (e) => {
    e.preventDefault();
    await axios.post(api.CreateProduct, {
      name,
      description,
      price,
      stock,
    });
    navigate("/admin/products");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-teal-50 to-white flex items-center justify-center p-6">
      <form
        onSubmit={handleAdd}
        className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-teal-700 text-center">
          Add New Product
        </h2>

        <input
          type="text"
          placeholder="Product Name"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Price"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <textarea
          placeholder="Description"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition resize-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          required
        />

        <input
          type="number"
          placeholder="Stock Quantity"
          className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition font-semibold shadow-md"
        >
          Add Product
        </button>

        <button
          type="button"
          onClick={() => navigate("/admin/products")}
          className="w-full mt-4 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition font-semibold shadow-md"
        >
          Back to Products List
        </button>
      </form>
    </div>
  );
};
