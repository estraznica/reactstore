import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

type ProductState = {
  products: any[];
  status: 'loading' | 'success' | 'error';
};
const initialState: ProductState = {
  products: [],
  status: 'loading',
};
export const fetchProducts = createAsyncThunk(
  'product/fetchProductsStatus',
  async (params: any) => {
    const { activeIndexCategory, activeIndexSort, itemCount, sortby, category } = params;
    const response = await axios.get(
      `https://fakestoreapi.com/products${
        activeIndexCategory > 0 ? '/category/' + category[activeIndexCategory] : ''
      }${activeIndexSort > 0 ? '?sort=' + sortby[activeIndexSort] : ''}?&limit=${itemCount}`,
    );

    return response.data;
  },
);
export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.products = [];
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.status = 'success';
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = 'error';
        state.products = [];
      });
  },
});

export const { setProducts } = productSlice.actions;

export default productSlice.reducer;
