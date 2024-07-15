import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface ProductFormProps {
  initialValues?: ProductFormInputs;
  onSubmit: SubmitHandler<ProductFormInputs>;
}

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

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  price: yup
    .number()
    .required("Price is required")
    .positive("Price must be positive"),
  rating: yup.number().required("Rating is required").min(0).max(5),
  brand: yup.string().required("Brand is required"),
  category: yup.string().required("Category is required"),
  stock: yup.number().required("Stock is required").min(0),
  minimumOrderQuantity: yup
    .number()
    .required("Minimum Order Quantity is required")
    .min(1),
  shippingInformation: yup
    .string()
    .required("Shipping Information is required"),
  returnPolicy: yup.string().required("Return Policy is required"),
  warrantyInformation: yup
    .string()
    .required("Warranty Information is required"),
  tags: yup.string(),
  images: yup.string().url("Must be a valid URL"),
});
export default function ProductForm({
  initialValues,
  onSubmit,
}: ProductFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductFormInputs>({
    resolver: yupResolver<any>(schema),
    defaultValues: initialValues,
  });

  useEffect(() => {
    if (initialValues) {
      Object.keys(initialValues).forEach((key) => {
        setValue(
          key as keyof ProductFormInputs,
          initialValues[key as keyof ProductFormInputs]
        );
      });
    }
  }, [initialValues, setValue]);
  return (
    <>
      <div className="container max-w-6xl mx-auto p-10 h-screen">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
          <div className="flex flex-row justify-between gap-6">
            <div className="w-full">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  {...register("title")}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  {...register("description")}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="number"
                  {...register("price")}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
                {errors.price && (
                  <p className="text-red-500 text-sm">{errors.price.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Rating
                </label>
                <input
                  type="number"
                  step="0.1"
                  {...register("rating")}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
                {errors.rating && (
                  <p className="text-red-500 text-sm">
                    {errors.rating.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Brand
                </label>
                <input
                  {...register("brand")}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
                {errors.brand && (
                  <p className="text-red-500 text-sm">{errors.brand.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <input
                  {...register("category")}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
                {errors.category && (
                  <p className="text-red-500 text-sm">
                    {errors.category.message}
                  </p>
                )}
              </div>
            </div>
            <div className="w-full">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Stock
                </label>
                <input
                  type="number"
                  {...register("stock")}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
                {errors.stock && (
                  <p className="text-red-500 text-sm">{errors.stock.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Minimum Order Quantity
                </label>
                <input
                  type="number"
                  {...register("minimumOrderQuantity")}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
                {errors.minimumOrderQuantity && (
                  <p className="text-red-500 text-sm">
                    {errors.minimumOrderQuantity.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Shipping Information
                </label>
                <input
                  {...register("shippingInformation")}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
                {errors.shippingInformation && (
                  <p className="text-red-500 text-sm">
                    {errors.shippingInformation.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Return Policy
                </label>
                <input
                  {...register("returnPolicy")}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
                {errors.returnPolicy && (
                  <p className="text-red-500 text-sm">
                    {errors.returnPolicy.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Warranty Information
                </label>
                <input
                  {...register("warrantyInformation")}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
                {errors.warrantyInformation && (
                  <p className="text-red-500 text-sm">
                    {errors.warrantyInformation.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Tags
                </label>
                <input
                  {...register("tags")}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
                {errors.tags && (
                  <p className="text-red-500 text-sm">{errors.tags.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Images
                </label>
                <input
                  {...register("images")}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
                {errors.images && (
                  <p className="text-red-500 text-sm">
                    {errors.images.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            {initialValues ? "Update Product" : "Create Product"}
          </button>
        </form>
      </div>
    </>
  );
}
