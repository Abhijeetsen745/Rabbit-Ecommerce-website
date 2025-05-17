import React from 'react'
import {Link} from 'react-router-dom'

function ProductGrid({products,loading,error}) {

  if(loading) return <div className='text-center'>Loading...</div>
  if(error) return <div className='text-center'>Something went wrong</div>
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
      {
        products.map((product,i)=>(
            <Link key={i} to={`/product/${product._id}`} className='block'>
            <div  className="bg-white rounded-lg p-2 m-2">
                <div className='w-full h-85 mb-4'>
                    <img src={`${import.meta.env.VITE_BACKEND_URL}/static/${product.images[0].url}`} alt="random_img" className='h-full w-full object-cover rounded-lg' />
                </div>
                <h3 className="text-sm mb-2">{product.name}</h3>
                <p className="text-sm tracking-tighter text-gray-500 font-medium ">$ {product.price}</p>
            </div>
            </Link>
        ))
      }
    </div>
  )
}

export default ProductGrid
