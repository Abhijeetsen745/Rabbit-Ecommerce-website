import React from 'react'
import { useSearchParams } from 'react-router-dom'

function SortOptions() {
  const [searchParams,setSearchParams]=useSearchParams();
  const handleSortChange = (e) => {
    const sortBy = e.target.value;
    searchParams.set('sortBy',sortBy)
    setSearchParams(searchParams)
  }
  return (
    <div className='flex justify-end items-center mb-4'>
      <select id="sort" value={searchParams.get('sortBy')||''} onChange={handleSortChange} className='rounded-md p-2 border focus:outline-none '>
        <option value="default">Default</option>
        <option value="PriceAsc">Price: Low to high</option>
        <option value="priceDesc">Price: High to low</option>
        <option value="popularity">Popularity</option>
      </select>
    </div>
  )
}

export default SortOptions
