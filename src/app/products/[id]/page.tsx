"use client";

import { useParams, useRouter } from "next/navigation";
import {
  deleteProduct,
  fetchProductById,
} from "@/app/services/productServices";
import { useState, useEffect } from "react";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  brand: string;
  category: string;
  stock: number;
  minimumOrderQuantity: number;
  shippingInformation: string;
  returnPolicy: string;
  warrantyInformation: string;
  tags: string[];
  images: string[];
}
export default function ProductDetail() {
  const router = useRouter();
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!id) return;

    const loadProduct = async () => {
      setLoading(true);
      try {
        const data = await fetchProductById(id as string);
        setProduct(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);
  const handleDelete = async () => {
    if (!product) return;

    try {
      await deleteProduct(product.id.toString());
      router.push("/products"); // Redirect to the main products page after deletion
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleUpdate = () => {
    if (!product) return;

    // Navigate to update page, passing product id as query param
    router.push(`/products/${product.id}/update`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>Product not found</p>;
  return (
    <main className="flex min-h-screen flex-row justify-center w-full  items-start p-24 gap-20">
      <div className="grid grid-cols-2 max-w-sm">
        {product.images.map((imageUrl, index) => (
          <img
            key={index}
            src={imageUrl}
            alt={`Product Image ${index + 1}`}
            style={{ maxWidth: "100%", marginBottom: "10px" }}
          />
        ))}
      </div>
      <div className="z-10  max-w-xl items-center justify-between ">
        <h1 className="text-2xl font-bold mb-4">{product.title}</h1>

        {/* <img src={product.images[0]} alt={product.title} className="w-full h-64 object-cover mb-4" /> */}
        <p className="mb-4">{product.description}</p>
        <p>Price: ${product.price}</p>
        <p>Rating: {product.rating}</p>
        <p>Brand: {product.brand}</p>
        <p>Category: {product.category}</p>
        <p>Stock: {product.stock}</p>
        <p>Minimum Order Quantity: {product.minimumOrderQuantity}</p>
        <p>Shipping Information: {product.shippingInformation}</p>
        <p>Return Policy: {product.returnPolicy}</p>
        <p>Warranty Information: {product.warrantyInformation}</p>
        <div className="flex flex-wrap">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="mr-2 bg-gray-200 text-green-500 rounded-full px-2 py-1 text-sm"
            >
              # {tag}
            </span>
          ))}
        </div>
        <div className="flex mt-6">
          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600"
          >
            Update
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </main>
  );
}
