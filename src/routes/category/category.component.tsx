import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import ProductCard from '../../components/product-card/product-card.component';
import Spinner from '../../components/spinner/spinner.component';
import {
  selectCategoriesIsLoading,
  selectCategoriesMap
} from '../../store/categories/category.selector';
import { Body, Title } from './category.styles';

type CategoryRouteParams = {
  category: string;
};

const Category = () => {
  const { category } = useParams<keyof CategoryRouteParams>() as CategoryRouteParams;
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);
  const [products, setProduct] = useState(categoriesMap[category]);

  useEffect(() => {
    setProduct(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <>
      <Title>{category.toUpperCase()}</Title>
      {isLoading ? (
        <Spinner />
      ) : (
        <Body>
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Body>
      )}
    </>
  );
};

export default Category;
