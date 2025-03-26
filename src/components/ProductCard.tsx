// src/components/ProductCard.tsx
import styled from "styled-components";
import Button from "./Button";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
  };
  onAddToCart: () => void;
}

const Card = styled.div`
  border: 1px solid #eaeaea;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
`;

const ProductImage = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
    
    &:hover {
      transform: scale(1.05);
    }
  }
`;

const ContentWrapper = styled.div`
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  flex: 1;
`;

const ProductName = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  color: #333;
`;

const ProductDescription = styled.p`
  margin: 0;
  color: #666;
  font-size: 0.9rem;
  line-height: 1.4;
  flex-grow: 1;
`;

const PriceTag = styled.div`
  font-weight: bold;
  font-size: 1.2rem;
  color: #2a9d8f;
  margin: 0.5rem 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 0.5rem;
`;

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <Card>
      <ProductImage>
        <img src={product.image} alt={product.name} />
      </ProductImage>
      <ContentWrapper>
        <ProductName>{product.name}</ProductName>
        <ProductDescription>{product.description}</ProductDescription>
        <PriceTag>Rp. {product.price.toLocaleString("id-ID")}</PriceTag>
        <ButtonContainer>
          <Button onClick={onAddToCart}>Add to Cart</Button>
          <Link to={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
            <Button variant="secondary">View Details</Button>
          </Link>
        </ButtonContainer>
      </ContentWrapper>
    </Card>
  );
};

export default ProductCard;
