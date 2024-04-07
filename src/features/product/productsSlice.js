// productsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: JSON.parse(localStorage.getItem("products")) || [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct(state, action) {
      const newProduct = {
        sku_id: new Date().getTime(),
        ...action.payload,
        productDate: new Date(action.payload.productDate).getTime(),
      };
      state.products.push(newProduct);
      localStorage.setItem("products", JSON.stringify(state.products));
    },
    editProduct(state, action) {
      const { skuId, updateProduct } = action.payload;
      const existingProductIndex = state.products.findIndex(
        (product) => product.sku_id === skuId
      );
      if (existingProductIndex !== -1) {
        let updatedProduct = {
          ...state.products[existingProductIndex],
          ...updateProduct,
        };
        if (
          action.payload.productDate &&
          !isNaN(new Date(action.payload.productDate))
        ) {
          updatedProduct.productDate = new Date(
            action.payload.productDate
          ).getTime();
        }
        state.products[existingProductIndex] = updatedProduct;
        localStorage.setItem("products", JSON.stringify(state.products));
      }
    },
    deleteProduct(state, action) {
      const skuId = action.payload;
      state.products = state.products.filter(
        (product) => product.sku_id !== skuId
      );
      localStorage.setItem("products", JSON.stringify(state.products));
    },
    filterProducts(state, action) {
      const { fromDate, toDate } = action.payload;
      if (!fromDate || !toDate) {
        return { products: [...state.products] };
      } else {
        const filteredProducts = state.products.filter((product) => {
          const productDate = new Date(product.productDate);
          return (
            productDate >= new Date(fromDate) && productDate <= new Date(toDate)
          );
        });
        return { products: [...filteredProducts] };
      }
    },
  },
});

export const { addProduct, editProduct, deleteProduct, filterProducts } =
  productsSlice.actions;
export default productsSlice.reducer;
