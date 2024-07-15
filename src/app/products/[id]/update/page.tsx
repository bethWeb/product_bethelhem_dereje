"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { SubmitHandler } from "react-hook-form";

import {
  fetchProductById,
  updateProduct,
} from "@/app/services/productServices";
import ProductForm from "@/app/components/ProductForm";

interface ProductFormInputs {
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
  tags: string;
  images: string;
}

export default function UpdateProductForm() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [product, setProduct] = useState<ProductFormInputs | null>(null);

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;

      setLoading(true);
      try {
        const data = await fetchProductById(id as string);
        setProduct(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleUpdate: SubmitHandler<ProductFormInputs> = async (data) => {
    try {
      if (!id) return;
      console.log("Updating product with ID:", id);
      console.log("Data:", data);
      await updateProduct(id as any, data);
      router.push(`/products/${id}`);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="container mx-auto  ">
      <div className="container max-w-6xl mx-auto pt-6">
        <h1 className="text-2xl font-bold mb-4">Update Product</h1>
      </div>
      <ProductForm initialValues={product} onSubmit={handleUpdate} />
    </div>
  );
}
