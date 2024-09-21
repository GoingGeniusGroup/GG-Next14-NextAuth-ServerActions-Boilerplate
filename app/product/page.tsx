// 'use client'
// import React, { useState } from 'react'
// import Sidebar2 from '../../components/myComponent/Sidebar2'
// import Navbar from '../../components/myComponent/navbar'
// import BG from '../../public/bg/bg.jpg'
// import ProductList from './productview/page'
// import AddProduct from './addproduct/page'
// import ProductCard from './productcard/page'
// import ProductCategory from './productcategory/page'
// import { usePathname } from 'next/navigation'

// const Page = () => {
//     const pathname = usePathname()

//     console.log(pathname)
//     return (
//         <>
//             <div className="flex md:flex-row px-8 pt-8 pb-4 bg-cover bg-no-repeat bg-center min-h-dvh"
//                 style={{ backgroundImage: `url(${BG.src})` }}>
//                 <div className='min-h-dvh' >
//                     <Sidebar2 />
//                 </div>
//                 <div className=" flex flex-col w-full h-full">
//                     <div>
//                         <Navbar />
//                     </div>
//                     <div className='pl-5 pt-5'>
                        
//                         {pathname === '/product' && <ProductList />}
//                         {pathname === 'product/addproduct' && <AddProduct />}
//                         {pathname === '/product/productcard' && <ProductCard />}
//                         {pathname === '/product/productlist' && <ProductList />}
//                         {pathname === '/product/productcategory' && <ProductCategory />}

//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Page