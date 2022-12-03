import { useNavigate } from 'react-router-dom';

import ProductCard from '../product-card/product-card.component';
import { CategoryPreviewContainer, Preview, Title } from './category-preview.styles';

const CategoryPreview = ({ title, products }) => {
  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(`${title}`);

  return (
    <CategoryPreviewContainer>
      <h2>
        <Title onClick={onNavigateHandler}>{title.toUpperCase()}</Title>
      </h2>

      <Preview>
        {products
          .filter((_, index) => index < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product}></ProductCard>
          ))}
      </Preview>
    </CategoryPreviewContainer>
  );
};

export default CategoryPreview;
