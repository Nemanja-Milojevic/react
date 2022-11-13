import { useContext } from 'react';

import './shop.styles.scss';
import ProductCard from '../../components/product-card/product-card.component';
import { ProductContext } from '../../contexts/product.context';

const Shop = () => {
  const { products } = useContext(ProductContext);
  return (
    <div className="products-container">
      {products.map((product) => (
        <ProductCard key={product.id} product={product}></ProductCard>
      ))}
    </div>
  );
};

export default Shop;
