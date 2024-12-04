import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../../types/product';
import { fetchProducts, fetchCategories } from '../../services/api';

interface ProductsState {
  items: Product[];
  categories: string[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  categories: [],
  status: 'idle',
  error: null,
};

export const fetchAllProducts = createAsyncThunk(
  'products/fetchAll',
  async () => {
    const response = await fetchProducts();
    return response;
  }
);

export const fetchAllCategories = createAsyncThunk(
  'products/fetchCategories',
  async () => {
    const response = await fetchCategories();
    return response;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch products';
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  },
});

export default productsSlice.reducer;