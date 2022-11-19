import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/product-card/product-card.component';
import { CategoriesContext } from '../../contexts/categories.context';
import { Body, Title } from './category.styles';

const Category = () => {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
  const [products, setProduct] = useState(categoriesMap[category]);

  useEffect(() => {
    setProduct(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <>
      <Title>{category.toUpperCase()}</Title>
      <Body>
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Body>
    </>
  );
};

export default Category;
