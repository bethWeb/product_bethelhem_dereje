export async function fetchProducts() {
  const res = await fetch("https://dummyjson.com/products");
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  const data = await res.json();
  return data.products;
}

export async function fetchProductById(id: string) {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }
  const product = await res.json();
  return product;
}

export async function createProduct(productData: any) {
  const res = await fetch("https://dummyjson.com/products/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });
  if (!res.ok) {
    throw new Error("Failed to create product");
  }
  const product = await res.json();
  return product;
}

export async function updateProduct(id: string, productData: any) {
  try {
    const res = await fetch(`https://dummyjson.com/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Error updating product:", errorData);
      throw new Error(
        `Failed to update product: ${errorData.message || res.statusText}`
      );
    }

    const product = await res.json();
    return product;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to update product");
  }
}

export async function deleteProduct(id: string) {
  const res = await fetch(`https://dummyjson.com/products/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to delete product");
  }
  const product = await res.json();
  return product;
}
