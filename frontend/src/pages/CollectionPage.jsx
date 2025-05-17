import React, { useEffect, useRef, useState } from 'react'
import { FaFilter } from "react-icons/fa";
import FilterSidebar from '../components/Products/FilterSidebar';
import SortOptions from '../components/Products/SortOptions';
import ProductGrid from '../components/Products/ProductGrid';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByFilters } from '../redux/productSlice';


function CollectionPage() {
  const {collection} = useParams()
  const [searchParams] = useSearchParams()
  const dispatch  = useDispatch()
  const {products,loading,error} = useSelector(state=>state.products)
  const queryParams = Object.fromEntries([...searchParams])
  // const [products,setProducts]=useState([])
  const sidebarRef = useRef(null)
  const [isSideBarOpen,setIsSideBarOpen]=useState(false)

  useEffect(()=>{
    dispatch(fetchProductsByFilters({collection,...queryParams}))
  },[dispatch,collection,searchParams])

  const toggleSidebar=()=>{
    setIsSideBarOpen(!isSideBarOpen)
  }
  const handleClickOutside=(e)=>{
    console.log(e.target);
    
    if(sidebarRef.current && !sidebarRef.current.contains(e.target)){
      setIsSideBarOpen(false)
      }
  }
  useEffect(() => {
    document.addEventListener('mousedown',(e)=> handleClickOutside);
    return () => {
      document.removeEventListener('mousedown',(e)=> handleClickOutside);
    };
  }, []);


 

  return (
    <div className='flex flex-col lg:flex-row'>
      {/* mobile filter button  */}
      <button onClick={toggleSidebar} className="lg:hidden border p-2 flex justify-center items-center">
      <FaFilter className='mr-2'/>Filters
      </button>
        
      {/* filter sidebar  */}
      
      <div ref={sidebarRef} className={`${isSideBarOpen?'translate-x-0':'-translate-x-full'} fixed inset-y-0 overflow-y-auto z-50 w-64 left-0 bg-white transition-transform duration-300 lg:static lg:translate-x-0 `}>
        <FilterSidebar/>
      </div>
      <div className="flex-grow p-4">
       <h2 className="text-2xl uppercase mb-4 ">all collection</h2>
       {/* sort options */}
       <SortOptions/>
       {/* product grid */}
       <ProductGrid products={products} loading={loading} error={error}/>
      </div>
     
    </div>
  )
}

export default CollectionPage
