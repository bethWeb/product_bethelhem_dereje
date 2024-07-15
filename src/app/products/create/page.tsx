"use client";
import { useParams, useRouter } from "next/navigation";
import ProductForm from "@/app/components/ProductForm";

import { createProduct } from "@/app/services/productServices";
import { SubmitHandler } from "react-hook-form";
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
export default function CreateProductPage() {
  const router = useRouter();
  const handleCreate: SubmitHandler<ProductFormInputs> = async (data) => {
    try {
      await createProduct(data);
      router.push("/products");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="container max-w-6xl mx-auto pt-6">
        <h1 className="text-2xl font-bold mb-4">Create Product</h1>
      </div>
      <ProductForm onSubmit={handleCreate} />
    </div>
  );
}
