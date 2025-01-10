import {
  postWithFirebaseJwt,
  deleteWithFirebaseJwt,
  getWithFirebaseJwt,
} from "@/network/firebase/requests-with-firebase";

export const createProduct = async (productData: {
  name: string;
  category: "food" | "supply" | "health";
  quantity: number;
}) => {
  try {
    const response = await postWithFirebaseJwt(
      "/web/admin/product/create-product",
      {
        body: productData,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return response;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

export const updateProduct = async (productData: {
  id: string;
  name?: string;
  category?: "food" | "supply" | "health";
  quantity?: number;
}) => {
  try {
    const response = await postWithFirebaseJwt(
      "/web/admin/product/update-product",
      {
        body: productData,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return response;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

export const getAllProducts = async () => {
  try {
    const response = await getWithFirebaseJwt(
      "/web/admin/product/all-products",
    );

    return response;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const deleteProduct = async (productId: string) => {
  try {
    const response = await deleteWithFirebaseJwt(
      "/web/admin/product/delete-product",
      {
        params: { id: productId },
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return response;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};
