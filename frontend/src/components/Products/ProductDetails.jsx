import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductDetails,
  fetchSimilarProducts,
} from "../../redux/productSlice";
import { addToCart } from "../../redux/cartSlice";

function ProductDetails({ productId }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { selectedProduct, similarProducts, loading, error } = useSelector(
    (state) => state.products
  );
  
  
  

  const [mainImage, setMainImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [isDisabled, setIsDisabled] = useState(false);
  const { user, guestId } = useSelector((state) => state.auth);

  const productfetchId = productId || id;
  

  useEffect(() => {
    if (productfetchId) {
      dispatch(fetchProductDetails(productfetchId));
      dispatch(fetchSimilarProducts({id:productfetchId}));
    }
  }, [dispatch, productfetchId]);

  const handleQuantity = (value) => {
    if (value === "plus") setSelectedQuantity((prev) => prev + 1);
    if (value === "minus" && selectedQuantity > 1)
      setSelectedQuantity((prev) => prev - 1);
  };

  const handleAddCart = () => {
    if (!selectedColor || !selectedSize) {
      toast.error("Please select color and size of before adding to cart.", {
        duration: 3000,
      });
      return;
    }
    setIsDisabled(true);
    dispatch(
      addToCart({
        productId: productfetchId,
        quantity:selectedQuantity,
        size: selectedSize,
        color: selectedColor,
        guestId,
        userId: user?._id,
      })
    )
      .then(() => {
        toast.success("Product added to cart successfully", {
          duration: 1000,
        });
      })
      .finally(() => {
        setIsDisabled(false);
      });
  };

  useEffect(() => {
    if (selectedProduct?.images.length > 0) {
      setMainImage(selectedProduct.images[0]?.url);
    }
  }, [selectedProduct]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">Error: {error}</div>
    );
  }

  return (
    <div className="p-8 mx-auto max-w-6xl bg-white">

      {selectedProduct && (
      <><div className="flex flex-col md:flex-row">
          {/* left  */}
          <div className="hidden md:flex flex-col space-y-4 mr-6">
            {selectedProduct.images.map((image, i) => (
              <img
                key={i}
                src={`${import.meta.env.VITE_BACKEND_URL}/static/${image.url}`}
                alt={image.altText}
                className={`h-20 w-20 object-cover rounded-lg border cursor-pointer ${mainImage === image.url
                    ? "border-2 border-black"
                    : "border-gray-300"}`}
                onClick={() => setMainImage(image.url)} />
            ))}
          </div>
          {/* main  */}
          <div className="md:w-1/2 mb-4">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/static${mainImage}`}
              alt={selectedProduct.images[0].altText}
              className="h-auto w-full object-cover rounded-lg  cursor-pointer'" />
          </div>
          {/* mobile thumbnail */}
          <div className="md:hidden flex overflow-x-scroll space-x-4 mb-4">
            {selectedProduct.images.map((image, i) => (
              <img
                key={i}
                src={`${import.meta.env.VITE_BACKEND_URL}/static/${image.url}`}
                alt={image.altText}
                className={`h-20 w-20 object-cover rounded-lg border cursor-pointer ${mainImage === image.url
                    ? "border-2 border-black"
                    : "border-gray-300"}`}
                onClick={() => setMainImage(image.url)} />
            ))}
          </div>
          {/* right  */}
          <div className="md:w-1/2 md:ml-10">
            <h1 className="text-2xl mb-4 font-bold">{selectedProduct.name} </h1>
            <p className="text-gray-500 text-lg mb-1 line-through">
              {selectedProduct.originalPrice &&
                `${selectedProduct.originalPrice}`}{" "}
            </p>

            <p className="text-gray-700 text-xl mb-2">
              $ {selectedProduct.price}{" "}
            </p>
            <p className="text-gray-700  mb-4">{selectedProduct.description} </p>

            <div className="mb-4">
              <p className="text-gray-700">Color:</p>
              <div className="flex gap-2 mt-2">
                {selectedProduct.colors.map((color, i) => (
                  <button
                    key={i}
                    className={`h-8 w-8 border rounded-full ${selectedColor === color
                        ? "border-4 border-black"
                        : "border-gray-300"}`}
                    style={{
                      background: color.toLowerCase(),
                      filter: "brightness(0.5)",
                    }}
                    onClick={() => setSelectedColor(color)}
                  ></button>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <p className="text-gray-700">Size:</p>
              <div className="flex gap-2 mt-2">
                {selectedProduct.sizes.map((size, i) => (
                  <button
                    key={i}
                    className={`px-2 py-1 border rounded ${selectedSize === size
                        ? "bg-black text-white"
                        : "bg-white text-black"}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <p className="text-gray-700">Quantity:</p>
              <div className="flex items-center space-x-4 mt-2">
                <button
                  className="px-2 py-1 rounded text-lg bg-gray-200"
                  onClick={() => handleQuantity("minus")}
                >
                  -
                </button>
                <span className="text-lg">{selectedQuantity}</span>
                <button
                  className="px-2 py-1 rounded text-lg bg-gray-200"
                  onClick={() => handleQuantity("plus")}
                >
                  +
                </button>
              </div>
            </div>

            <button
              disabled={isDisabled}
              className={` text-white rounded bg-black text-lg px-6 py-2 w-full mb-4 ${isDisabled ? "cursor-not-allowed opacity-50" : "hover:bg-gray-700"}`}
              onClick={handleAddCart}
            >
              {isDisabled ? "Adding..." : "ADD TO CART"}
            </button>

            <div className="mt-10 text-gray-700">
              <h3 className="tex-xl font-bold mb-4">Characteristics:</h3>
              <table className="w-full text-left text-sm ">
                <tbody>
                  <tr>
                    <td className="py-1">Brand</td>
                    <td className="py-1">{selectedProduct.brand}</td>
                  </tr>
                  <tr>
                    <td className="py-1">Brand</td>
                    <td className="py-1">{selectedProduct.brand}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div><div className="mt-20">
            <h2 className="text-center font-medium text-2xl mb-4">
              You may also like
            </h2>
            <ProductGrid products={similarProducts} loading={loading} error={error} />
          </div></>
    )}
    </div>
  );
}

export default ProductDetails;
