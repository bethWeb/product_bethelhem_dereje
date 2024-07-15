"use client";
import { useRouter } from "next/navigation";
import Header from "@/app/components/Header";
import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchProducts } from "@/app/services/productServices";
const PAGE_SIZE = 10;

interface product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  tags: string[];
}
export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
        console.log(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const paginatedProducts = products.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginatedProducts.map((product: product) => (
          <Link
            legacyBehavior
            key={product.id}
            href={`/products/${product.id}`}
          >
            <div className="border p-4 rounded-md hover:shadow-lg">
              <div className="flex justify-center  max-w-xs max-h-lvh">
                {product.images.length > 0 && (
                  <img
                    src={product.images[0]} // Displaying the first image of the product
                    alt={`Product Image ${product.id}`}
                    className="  h-auto rounded-md mb-4"
                  />
                )}
              </div>
              <h2 className="text-xl font-semibold">{product.title}</h2>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <p>Rating: {product.rating}</p>
              <div className="flex flex-wrap">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="mr-2  bg-gray-200 text-green-500 rounded-full px-2 py-1 text-sm"
                  >
                    # {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-4 flex justify-between">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage * PAGE_SIZE >= products.length}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
}
