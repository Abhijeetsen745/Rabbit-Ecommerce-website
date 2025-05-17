import React, { useEffect, useState } from 'react'
import Hero from '../components/Layout/Hero'
import GenderCollection from '../components/Products/GenderCollection'
import NewArrivals from '../components/Products/NewArrivals'
import ProductDetails from '../components/Products/ProductDetails'
import ProductGrid from '../components/Products/ProductGrid'
import FeaturedCollection from '../components/Products/FeaturedCollection'
import FeaturesSection from '../components/Products/FeaturesSection'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductsByFilters } from '../redux/productSlice'
import axios from 'axios'




function Home() {
  const dispatch = useDispatch()
  const {products,loading, error} = useSelector((state) => state.products)
  const [bestSellerProduct,setBestSellerProduct] = useState(null)

  useEffect(() => {
    dispatch(fetchProductsByFilters({
      gender:'Women',category:'Bottom Wear',limit:8
    }))
    //fetch best seller product
    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`)
        
        setBestSellerProduct(response.data)
      } catch (error) {
        console.error('Error fetching best seller product:', error)
      }
    }
    fetchBestSeller()
  },[dispatch])
  return (
    <div>
      <Hero/>
      <GenderCollection/>
      <NewArrivals/>

      {/* best seller section  */}
      <h2 className="text-3xl text-center mb-4 font-bold">Best Seller</h2>
      
      {bestSellerProduct ? (<ProductDetails productId={bestSellerProduct._id}/>):(<p className='text-center'>Loading best seller product...</p>)}
     
      {/* men and women wears */}
      <div className="container mx-auto">
        <h2 className="text-center text-3xl  font-bold mb-4 ">Top Wears for Women</h2>
        <ProductGrid products={products} loading={loading} error={error} />
      </div>
      <FeaturedCollection/>
      <FeaturesSection/>
    </div>
  )
}

export default Home
