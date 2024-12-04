import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { addToCart } from '../store/slices/cartSlice';
import { Star, ShoppingCart, ArrowLeft } from 'lucide-react';
import { Product } from '../types/product';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.items);
  const product = products.find(p => p.id === Number(id));
  const [recommendations, setRecommendations] = useState<Product[]>([]);

  useEffect(() => {
    if (product) {
      const similar = products
        .filter(p => p.category === product.category && p.id !== product.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 4);
      setRecommendations(similar);
    }
  }, [product, products]);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/"
        className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-8"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Products
      </Link>
      
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 transition-colors duration-200">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-96 object-contain"
          />
        </div>
        
        <div className="space-y-6">
          <h1 className="text-3xl font-bold dark:text-white">{product.title}</h1>
          <div className="flex items-center">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <span className="ml-1 dark:text-white">{product.rating.rate}</span>
            <span className="text-gray-500 dark:text-gray-400 ml-2">
              ({product.rating.count} reviews)
            </span>
          </div>
          <p className="text-3xl font-bold dark:text-white">${product.price}</p>
          <p className="text-gray-600 dark:text-gray-300">{product.description}</p>
          <button
            onClick={() => dispatch(addToCart(product))}
            className="w-full md:w-auto bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Add to Cart
          </button>
        </div>
      </div>

      {recommendations.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6 dark:text-white">You might also like</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {recommendations.map((rec) => (
              <Link
                key={rec.id}
                to={`/product/${rec.id}`}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
              >
                <img
                  src={rec.image}
                  alt={rec.title}
                  className="w-full h-48 object-contain mb-4"
                />
                <h3 className="font-semibold mb-2 dark:text-white">{rec.title}</h3>
                <p className="text-lg font-bold dark:text-white">${rec.price}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;