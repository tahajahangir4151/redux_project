import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import ProductGrid from '../components/products/ProductGrid';
import Filters from '../components/filters/Filters';

const HomePage: React.FC = () => {
  const { items: products } = useSelector((state: RootState) => state.products);
  const filters = useSelector((state: RootState) => state.filters);

  const filteredProducts = products
    .filter((product) => {
      const matchesCategory = !filters.category || product.category === filters.category;
      const matchesPrice =
        product.price >= filters.priceRange.min &&
        product.price <= filters.priceRange.max;
      const matchesSearch =
        !filters.searchQuery ||
        product.title.toLowerCase().includes(filters.searchQuery.toLowerCase());
      return matchesCategory && matchesPrice && matchesSearch;
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating.rate - a.rating.rate;
        default:
          return 0;
      }
    });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="md:w-1/4">
          <div className="sticky top-24">
            <Filters />
          </div>
        </aside>
        <main className="md:w-3/4">
          <ProductGrid products={filteredProducts} />
        </main>
      </div>
    </div>
  );
};

export default HomePage;