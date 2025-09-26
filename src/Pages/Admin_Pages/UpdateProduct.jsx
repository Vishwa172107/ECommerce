import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { api } from "../../utils/api";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";

export const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAdmin } = useContext(AuthContext);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: 0,
  });

  useEffect(() => {
    if (isAdmin === false) {
      navigate("/unAuthorized");
    }
  }, [isAdmin, navigate]);

  useEffect(() => {
    axios
      .get(api.getProductbyId(id))
      .then((res) => setProduct(res.data.product))
      .catch((err) => console.error(err));
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await axios.put(api.UpdateProduct(id), product);
    navigate("/admin/products");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-teal-50 to-white flex items-center justify-center p-6">
      <form className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md" onSubmit={handleUpdate}>
        <h2 className="text-3xl font-bold mb-6 text-teal-700 text-center">
          Update Product
        </h2>

        <input
          type="text"
          placeholder="Product Name"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          required
        />

        <textarea
          placeholder="Description"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition resize-none"
          value={product.description}
          onChange={(e) => setProduct({ ...product, description: e.target.value })}
          rows={4}
          required
        />

        <input
          type="number"
          placeholder="Price"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
          required
        />

        <input
          type="number"
          placeholder="Stock Quantity"
          className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
          value={product.stock}
          onChange={(e) => setProduct({ ...product, stock: e.target.value })}
          required
        />

        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition font-semibold shadow-md mb-4"
        >
          Update Product
        </button>

        <button
          type="button"
          onClick={() => navigate("/admin/products")}
          className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition font-semibold shadow-md"
        >
          Back to Products List
        </button>
      </form>
    </div>
  );
};
