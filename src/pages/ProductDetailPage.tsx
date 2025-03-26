// src/pages/ProductDetailPage.tsx
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/Button';
import { Product } from '../contexts/CartContext';
import useCart from './../contexts/CartContext';
import { mockProducts } from '../data/Product';
import { FiArrowLeft, FiShoppingCart } from 'react-icons/fi';

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);
};

const Breadcrumb = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #666;
`;

const ProductDetailContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProductImageContainer = styled.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
`;

const ProductImg = styled.img`
  width: 100%;
  height: 500px;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const Category = styled.span`
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ProductName = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: bold;
`;

const ProductDescription = styled.p`
  font-size: 1.1rem;
  color: #555;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const ProductPrice = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #e63946;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const AddToCartButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 2rem;
  font-size: 1.1rem;
  background-color: #2a9d8f;
  border-radius: 8px;
  transition: all 0.2s;
  
  &:hover {
    transform: translateY(-3px);
    background-color: #218577;
  }
`;

const BackButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: transparent;
  color: #333;
  border: 1px solid #ddd;
  
  &:hover {
    background-color: #f8f9fa;
  }
`;

const RelatedProducts = styled.div`
  margin-top: 4rem;
`;

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Simulate loading delay for better UX
    setLoading(true);
    setTimeout(() => {
      const foundProduct = mockProducts.find(p => p.id === id);
      if (foundProduct) {
        setProduct(foundProduct);
        // Find related products of the same category
        const related = mockProducts
          .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
          .slice(0, 3);
        setRelatedProducts(related);
      } else {
        setError('Product not found');
      }
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <ProductDetailContainer>
        <div className="loading-skeleton">Loading product details...</div>
      </ProductDetailContainer>
    );
  }

  if (error) {
    return (
      <ProductDetailContainer>
        <h2>{error}</h2>
        <Link to="/products">
          <BackButton><FiArrowLeft /> Back to Products</BackButton>
        </Link>
      </ProductDetailContainer>
    );
  }

  if (!product) return null;

  return (
    <ProductDetailContainer>
      <Breadcrumb>
        <Link to="/">Home</Link> &gt; <Link to="/products">Products</Link> &gt; {product.name}
      </Breadcrumb>
      
      <ProductGrid>
        <ProductImageContainer>
          <Category>{product.category}</Category>
          <ProductImg src={product.image} alt={product.name} />
        </ProductImageContainer>
        
        <ProductInfo>
          <ProductName>{product.name}</ProductName>
          <ProductPrice>{formatPrice(product.price)}</ProductPrice>
          <ProductDescription>{product.description}</ProductDescription>
          
          <ButtonGroup>
            <AddToCartButton onClick={() => addToCart(product)}>
              <FiShoppingCart /> Add to Cart
            </AddToCartButton>
            <Link to="/products">
              <BackButton><FiArrowLeft /> Back to Products</BackButton>
            </Link>
          </ButtonGroup>
        </ProductInfo>
      </ProductGrid>
      
      {relatedProducts.length > 0 && (
        <RelatedProducts>
          <h2>You might also like</h2>
          {/* Add related products display here */}
        </RelatedProducts>
      )}
    </ProductDetailContainer>
  );
};

export default ProductDetailPage;