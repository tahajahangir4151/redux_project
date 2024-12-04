import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FiltersState {
  category: string;
  priceRange: {
    min: number;
    max: number;
  };
  sortBy: 'price-asc' | 'price-desc' | 'rating' | '';
  searchQuery: string;
}

const initialState: FiltersState = {
  category: '',
  priceRange: {
    min: 0,
    max: 1000,
  },
  sortBy: '',
  searchQuery: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setPriceRange: (state, action: PayloadAction<{ min: number; max: number }>) => {
      state.priceRange = action.payload;
    },
    setSortBy: (state, action: PayloadAction<FiltersState['sortBy']>) => {
      state.sortBy = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { setCategory, setPriceRange, setSortBy, setSearchQuery } = filtersSlice.actions;
export default filtersSlice.reducer;