import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteProduct, fetchAllProducts } from "../../redux/adminProductSlice";

function ProductManagement() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading, error } = useSelector(
    (state) => state.adminProducts
  );

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete this Product?")) {
      dispatch(deleteProduct(id));
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error = {error} or 0 orders.</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="mb-6 font-bold text-2xl">Product Management</h2>
      <div className="overflow-x-auto shadow-md sm:rounded-lg  ">
        <table className="min-w-full text-left text-gray-500  ">
          <thead className="text-gray-700 bg-gray-100 uppercase text-xs  ">
            <tr>
              <th className="py-3 px-4">Name </th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Sku </th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product._id} className="border-b hover:bg-gray-50 ">
                  <td className="p-4 font-medium text-gray-900">
                    {product.name}
                  </td>
                  <td className="p-4">${product.price} </td>

                  <td className="p-4">{product.sku} </td>
                  <td className="p-4">
                    <Link
                      to={`/admin/products/${product._id}/edit`}
                      className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 rounded text-white mr-2"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="px-2 py-1 bg-red-500 hover:bg-red-600 rounded text-white"
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  No Product Found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductManagement;
