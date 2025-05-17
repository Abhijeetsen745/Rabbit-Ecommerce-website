import React from 'react'
import { HiShoppingBag } from "react-icons/hi2";
import { HiArrowPathRoundedSquare } from "react-icons/hi2";
import { HiOutlineCreditCard } from "react-icons/hi2";


function FeaturesSection() {
  return (
    <section className='py-16 px-4 bg-white'>
    <div className="container mx-auto grid lg:grid-cols-3 grid-cols-1 text-center gap-8">
        {/* feature 1 */}
        <div className="flex flex-col items-center">
            <div className="p-4 rounded-full mb-4">
            <HiShoppingBag className='text-xl'/>
            </div>
            <h4 className='uppercase tracking-tighter mb-2'>Free international shipping</h4>
            <p className="text-sm tracking-tighter text-gray-500">On all orders over $ 100.00</p>
        </div>

        {/* feature 2 */}
        <div className="flex flex-col items-center">
            <div className="p-4 rounded-full mb-4">
            <HiArrowPathRoundedSquare className='text-xl'/>
            
            </div>
            <h4 className='uppercase tracking-tighter mb-2'>45 Days return</h4>
            <p className="text-sm tracking-tighter text-gray-500">Money back guarantee</p>
        </div>

        {/* feature 3 */}
        <div className="flex flex-col items-center">
            <div className="p-4 rounded-full mb-4">
            <HiOutlineCreditCard  className='text-xl'/>
            </div>
            <h4 className='uppercase tracking-tighter mb-2'> secure checkout process</h4>
            <p className="text-sm tracking-tighter text-gray-500">100% secure checkout process</p>
        </div>


    </div>
    </section>
  )
}

export default FeaturesSection
