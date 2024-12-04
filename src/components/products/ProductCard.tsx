import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Product } from '../../types/product';
import { addToCart } from '../../store/slices/cartSlice';
import { Star, ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex flex-col transition-colors duration-200">
      <Link to={`/product/${product.id}`} className="flex-grow">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-contain mb-4"
        />
        <h3 className="text-lg font-semibold mb-2 dark:text-white line-clamp-2">
          {product.title}
        </h3>
        <div className="flex items-center mb-2">
          <Star className="w-5 h-5 text-yellow-400 fill-current" />
          <span className="ml-1 dark:text-white">{product.rating.rate}</span>
          <span className="text-gray-500 dark:text-gray-400 ml-2">
            ({product.rating.count} reviews)
          </span>
        </div>
        <p className="text-xl font-bold mb-4 dark:text-white">${product.price}</p>
      </Link>
      <button
        onClick={() => dispatch(addToCart(product))}
        className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
      >
        <ShoppingCart className="w-5 h-5 mr-2" />
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;