import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAllProducts, fetchSingleProduct, updateProduct } from "../../redux/adminProductSlice";
import axios from "axios";

function EditProduct() {
  const {id} = useParams();
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    countInstock: 0,
    sku: "",
    category: "",
    brand: "",
    sizes: [],
    colors: [],
    collections: "",
    material: "",
    gender: "",
    images: [],
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {selectedProduct,loading,error} = useSelector(state=>state.adminProducts);
  const [uploading,setUploading] = useState(false);

  
  
  useEffect(()=>{
    if(id){
     const res= dispatch(fetchSingleProduct(id))
     
    }
  },[dispatch,id])

  useEffect(()=>{
    if(selectedProduct){
      setProductData(selectedProduct)
    }
  },[selectedProduct])

  const handleChange=(e)=>{
    const {name,value}=e.target;
    setProductData(prevData=>({...prevData,[name]:value}))
  }
const handleSubmit=  (e)=>{
    e.preventDefault()
    dispatch(updateProduct({id,productData}));
    navigate('/admin/products')
    
}
const handleImage= async (e)=>{
    const file = e.target.files[0]
    const formData = new FormData();
    formData.append('image',file)
    try {
      setUploading(true)
      const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/upload`,formData,
        {
          headers:{
            'Content-Type': 'multipart/form-data',
          }
        }
      )
      console.log('working');
      
      setProductData(prevData=>({
        ...prevData,
        images: [...prevData.images,{url:data.imageUrl,altText:''}]
      }))
      
      
      setUploading(false)
    } catch (error) {
      console.log(error);
      setUploading(false)
      
    }
    
}

  if(loading){return <p>Loading...</p>}
  if(error){return <p>Error = {error} </p>}


  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md  ">
      <h2 className="text-3xl font-bold mb-6 ">Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block font-semibold mb-2 ">Prdouct Name </label>
          <input
            type="text"
            className="w-full border p-2 rounded-md border-gray-300"
            value={productData.name}
            name="name"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2 ">Description </label>
          <textarea
            type="text"
            className="w-full border p-2 rounded-md border-gray-300"
            value={productData.description}
            name="description"
            rows={4}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2 ">Price</label>
          <input
            type="number"
            className="w-full border p-2 rounded-md border-gray-300"
            value={productData.price}
            name="price"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2 ">Count In Stock </label>
          <input
            type="number"
            className="w-full border p-2 rounded-md border-gray-300"
            value={productData.countInStock}
            name="countInstock"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2 ">Sku</label>
          <input
            type="text"
            className="w-full border p-2 rounded-md border-gray-300"
            value={productData.sku}
            name="sku"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2 ">Sizes (comma-seperated)</label>
          <input
            type="text"
            className="w-full border p-2 rounded-md border-gray-300"
            value={productData.sizes.join(',')}
            name="sizes"
            onChange={(e)=>setProductData({...productData,sizes:e.target.value.split(',').map((size)=>size.trim())})}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2 ">Colors (comma-seperated)</label>
          <input
            type="text"
            className="w-full border p-2 rounded-md border-gray-300"
            value={productData.colors.join(',')}
            name="colors"
            onChange={(e)=>setProductData({...productData,colors:e.target.value.split(',').map((color)=>color.trim())})}
            required
          />
        </div>
        {/* image upload */}
        <div className="mb-6">
            <label className="block font-semibold mb-2">Upload Image</label>
            <input type="file" onChange={handleImage} className="border rounded p-2 w-[250px]"/>
            {uploading && <p>uploading image...</p>}
            <div className="flex gap-4 mt-4">
{  
                
    productData.images.map((image,i)=>(
        <div key={i} className="">
            <img src={`${import.meta.env.VITE_BACKEND_URL}/static/${image.url}`} alt='product data' className="h-20 w-20 object-cover rounded-md shadow-md" />   

        </div>
    ))
}
            </div>            
        </div>
        <button type="submit" className="bg-green-500 text-white w-full py-2 rounded-md hover:bg-green-600 transition-colors ">Update Product</button>
      </form>
    </div>
  );
}

export default EditProduct;
