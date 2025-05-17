import React from 'react';
import heroImg from '../../../assets/rabbit-hero.webp';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <section className='relative'>
      <img src={heroImg} alt="rabbit" className='w-full h-[400px] md:h-[600px] lg:h-[700px] object-cover' />
      <div className="absolute inset-0  flex items-center justify-center">
        <div className="text-center text-white p-6">
          <h1 className="text-4xl md:text-9xl font-bold uppercase tracking-tighter mb-4">Vacation <br />ready</h1>
          <p className="text-sm md:text-lg mb-6 tracking-tighter">
            Explore our vacation-ready outfits with fast worldwide shipping.
          </p>
          <Link to='#' className='text-gray-900 text-lg bg-white rounded px-6 py-2'>Shop Now</Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;