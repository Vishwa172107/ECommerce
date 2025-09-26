import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { api } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";

export const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { isAdmin } = useContext(AuthContext);

  useEffect(() => {
    if (isAdmin === false) {
      navigate("/unAuthorized");
    }
  }, [isAdmin, navigate]);

  const fetchProducts = () => {
    axios
      .get(api.getProducts)
      .then((res) => setProducts(res.data.products))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await axios.delete(api.DeleteProduct(id));
      fetchProducts(); // refresh after delete
    }
  };

  return (
    <div className="p-8 bg-gradient-to-br from-purple-100 via-teal-50 to-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-teal-700">Products</h2>
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/admin/add-product")}
            className="bg-teal-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-teal-700 transition font-semibold"
          >
            Add New Product
          </button>
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-purple-700 transition font-semibold"
          >
            Back to Dashboard
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse shadow-lg rounded-lg overflow-hidden bg-white">
          <thead>
            <tr className="bg-teal-100 text-teal-800 uppercase text-sm font-medium">
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Stock</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((p) => (
                <tr key={p.id} className="border-b hover:bg-gray-50 transition">
                  <td className="p-3 text-gray-700">{p.id}</td>
                  <td className="p-3 text-gray-700">{p.name}</td>
                  <td className="p-3 text-gray-700">${p.price}</td>
                  <td className="p-3 text-gray-700">{p.stock}</td>
                  <td className="p-3 space-x-3">
                    <button
                      onClick={() => navigate(`/admin/update-product/${p.id}`)}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="text-red-600 hover:underline font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-6 text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
