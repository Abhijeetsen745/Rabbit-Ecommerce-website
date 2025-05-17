import React from 'react'
import menCollectionimg from '../../../assets/mens-collection.webp'
import womenCollectionimg from '../../../assets/womens-collection.webp'
import { Link } from 'react-router-dom'

function GenderCollection() {
  return (
    <section className='py-16 px-4 lg:px-0'>
        <div className="container mx-auto flex flex-col md:flex-row gap-8">
            {/* women's collection  */}
            <div className="relative flex-1">
                <img src={womenCollectionimg} alt="men" className='w-full  md:h-[700px] object-cover rounded ' />
                <div className='absolute bottom-8 left-4 bg-white p-4 rounded  '>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                        Women's Collection
                    </h2>
                    <Link to='/collections/all?gender=Women' className='underline text-gray-900'>Shop Now</Link>
                </div>
            </div>
            {/* men's collection */}
            <div className="relative flex-1">
                <img src={menCollectionimg} alt="men" className='w-full  md:h-[700px] object-cover rounded' />
                <div className='absolute bottom-8 left-4 bg-white p-4 rounded  '>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                        Men's Collection
                    </h2>
                    <Link to='/collections/all?gender=men' className='underline text-gray-900'>Shop Now</Link>
                </div>
            </div>
        </div>
    </section>
  )
}

export default GenderCollection
