import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

type FetchParams = {
  activeIndexCategory: number;
  activeIndexSort: number;
  itemCount: number;
  sortby: string[];
  category: string[];
};
type Product = {
  id: number;
  image: string;
  title: string;
  price: number;
  category: string;
  description: string;
  quantity: number;
};
enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}
type ProductSliceState = {
  products: Product[];
  status: Status;
};

const initialState: ProductSliceState = {
  products: [],
  status: Status.LOADING,
};
export const fetchProducts = createAsyncThunk(
  'product/fetchProductsStatus',
  async (params: FetchParams) => {
    const { activeIndexCategory, activeIndexSort, itemCount, sortby, category } = params;
    const response = await axios.get<Product[]>(
      `https://fakestoreapi.com/products${
        activeIndexCategory > 0 ? '/category/' + category[activeIndexCategory] : ''
      }${activeIndexSort > 0 ? '?sort=' + sortby[activeIndexSort] : ''}?&limit=${itemCount}`,
    );

    return response.data as Product[];
  },
);
export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = Status.LOADING;
        state.products = [];
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.products = action.payload;
        state.status = Status.SUCCESS;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = Status.ERROR;
        state.products = [];
      });
  },
});

export const { setProducts } = productSlice.actions;

export default productSlice.reducer;
