// "use client";
// import React, { useEffect, useState } from "react";
// import axiosInstance from "@/lib/axiosInstance";
// import { IProduct } from "../product.types";
// import ProductCard from "./ProductCard";

// export default function ProductList() {
//   const [products, setProducts] = useState<IProduct[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axiosInstance.get("/products")
//       .then(res => setProducts(res.data.data || res.data))
//       .catch(err => console.error(err))
//       .finally(() => setLoading(false));
//   }, []);

//   if (loading) return <div className="grid grid-cols-4 gap-4 animate-pulse">{[1,2,3,4].map(i => <div key={i} className="h-64 bg-gray-100 rounded-2xl"/>)}</div>;

//   return (
//     <div className="grid grid-cols-4 gap-4">
//       {products.map((item) => (
//         <ProductCard key={item._id} product={item} />
//       ))}
//     </div>
//   );
// }