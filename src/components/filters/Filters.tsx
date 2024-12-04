import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import {
  setCategory,
  setPriceRange,
  setSortBy,
  setSearchQuery,
} from '../../store/slices/filtersSlice';
import { Search } from 'lucide-react';

const Filters: React.FC = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state: RootState) => state.products);
  const filters = useSelector((state: RootState) => state.filters);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4 dark:text-white">Search</h3>
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={filters.searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 dark:text-white">Category</h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="category"
                checked={filters.category === ''}
                onChange={() => dispatch(setCategory(''))}
                className="mr-2"
              />
              <span className="dark:text-white">All Categories</span>
            </label>
            {categories.map((category) => (
              <label key={category} className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  checked={filters.category === category}
                  onChange={() => dispatch(setCategory(category))}
                  className="mr-2"
                />
                <span className="dark:text-white capitalize">{category}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 dark:text-white">Price Range</h3>
          <div className="flex space-x-4">
            <input
              type="number"
              placeholder="Min"
              className="w-1/2 p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={filters.priceRange.min}
              onChange={(e) =>
                dispatch(
                  setPriceRange({
                    ...filters.priceRange,
                    min: Number(e.target.value),
                  })
                )
              }
            />
            <input
              type="number"
              placeholder="Max"
              className="w-1/2 p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={filters.priceRange.max}
              onChange={(e) =>
                dispatch(
                  setPriceRange({
                    ...filters.priceRange,
                    max: Number(e.target.value),
                  })
                )
              }
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 dark:text-white">Sort By</h3>
          <select
            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={filters.sortBy}
            onChange={(e) => dispatch(setSortBy(e.target.value as any))}
          >
            <option value="">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filters;