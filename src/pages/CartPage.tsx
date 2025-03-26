// src/pages/CartPage.tsx
import { useCallback } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import useCart from "../contexts/CartContext";
import { CartItem } from "../contexts/CartContext";
import QuantityControl from "../components/QuantityControl";
import { FaShoppingCart, FaArrowLeft, FaTrashAlt } from "react-icons/fa";

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const CartContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
  display: grid;
  gap: 2rem;
  grid-template-columns: 2fr 1fr;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PageTitle = styled.h1`
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  font-weight: 600;
  color: #333;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const CartItems = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

const CartItemRow = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr auto;
  gap: 1.5rem;
  padding: 1.5rem 0;
  border-bottom: 1px solid #eee;
  align-items: center;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 580px) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 1rem;
  }
`;

const ItemImage = styled.div<{ imageUrl: string }>`
  width: 120px;
  height: 120px;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  transition: transform 0.2s;
  
  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 580px) {
    margin: 0 auto;
  }
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ItemName = styled.h3`
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: #333;
`;

const ItemDescription = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const ItemPrice = styled.div`
  font-weight: bold;
  color: #0066cc;
  font-size: 1.1rem;
`;

const ItemCategory = styled.span`
  display: inline-block;
  background: #f0f5ff;
  color: #0066cc;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  margin-top: 0.5rem;
`;

const ItemSubtotal = styled.div`
  color: #333;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.75rem;
  
  @media (max-width: 580px) {
    align-items: center;
  }
`;

const RemoveButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #dc3545;
  font-size: 0.9rem;
  padding: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: #fff1f1;
    border-radius: 4px;
  }
`;

const CartSummary = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  height: fit-content;
  position: sticky;
  top: 1rem;
`;

const SummaryTitle = styled.h2`
  margin-bottom: 1.25rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #f2f2f2;
  font-weight: 600;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
  font-size: 1rem;
`;

const SummaryTotal = styled(SummaryRow)`
  font-weight: bold;
  font-size: 1.2rem;
  border-top: 2px solid #f2f2f2;
  padding-top: 1rem;
  margin-top: 1rem;
  color: #0066cc;
`;

const CheckoutButton = styled(Button)`
  width: 100%;
  margin-top: 1.5rem;
  padding: 0.75rem;
  font-weight: 600;
  font-size: 1rem;
  transition: transform 0.1s;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const ContinueShoppingLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  margin-top: 1rem;
  color: #0066cc;
  text-decoration: none;
  padding: 0.75rem;
  border: 1px solid #0066cc;
  border-radius: 4px;
  text-align: center;
  transition: all 0.2s;
  
  &:hover {
    background: #f0f5ff;
  }
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 4rem 1rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  max-width: 600px;
  margin: 2rem auto;

  h2 {
    margin-bottom: 1.5rem;
    color: #555;
  }
`;

const EmptyCartImage = styled.div`
  font-size: 4rem;
  color: #ccc;
  margin-bottom: 1.5rem;
`;

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const handleIncrease = useCallback(
    (itemId: string) => {
      updateQuantity(itemId, 1);
    },
    [updateQuantity]
  );

  const handleDecrease = useCallback(
    (itemId: string) => {
      updateQuantity(itemId, -1);
    },
    [updateQuantity]
  );

  const handleRemove = useCallback(
    (itemId: string) => {
      removeFromCart(itemId);
    },
    [removeFromCart]
  );

  const calculateTotal = useCallback((items: CartItem[]) => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, []);

  const subtotal = calculateTotal(cartItems);
  const shipping = subtotal > 1000000 ? 0 : 15000; // Free shipping over 1,000,000 IDR
  const tax = Math.round(subtotal * 0.11); // 11% tax in Indonesia
  const grandTotal = subtotal + tax + shipping;

  if (cartItems.length === 0) {
    return (
      <EmptyCart>
        <EmptyCartImage>
          <FaShoppingCart />
        </EmptyCartImage>
        <h2>Keranjang belanja Anda kosong</h2>
        <p>Sepertinya Anda belum menambahkan apapun ke keranjang.</p>
        <ContinueShoppingLink to="/products">
          <FaArrowLeft /> Lanjutkan Belanja
        </ContinueShoppingLink>
      </EmptyCart>
    );
  }

  return (
    <CartContainer>
      <CartItems>
        <PageTitle>
          <FaShoppingCart /> Keranjang Belanja ({cartItems.length} item)
        </PageTitle>

        {cartItems.map((item) => (
          <CartItemRow key={item.id}>
            <ItemImage imageUrl={item.image} />
            <ItemDetails>
              <ItemName>{item.name}</ItemName>
              <ItemDescription>{item.description}</ItemDescription>
              <ItemPrice>{formatPrice(item.price)}</ItemPrice>
              <ItemCategory>{item.category}</ItemCategory>
              <ItemSubtotal>
                Subtotal: {formatPrice(item.price * item.quantity)}
              </ItemSubtotal>
            </ItemDetails>

            <ControlsContainer>
              <QuantityControl
                quantity={item.quantity}
                onIncrease={() => handleIncrease(item.id)}
                onDecrease={() => handleDecrease(item.id)}
              />
              <RemoveButton onClick={() => handleRemove(item.id)}>
                <FaTrashAlt /> Hapus
              </RemoveButton>
            </ControlsContainer>
          </CartItemRow>
        ))}
      </CartItems>

      <CartSummary>
        <SummaryTitle>Ringkasan Belanja</SummaryTitle>
        <SummaryRow>
          <span>Subtotal:</span>
          <span>{formatPrice(subtotal)}</span>
        </SummaryRow>
        <SummaryRow>
          <span>Pengiriman:</span>
          <span>{shipping === 0 ? "Gratis" : formatPrice(shipping)}</span>
        </SummaryRow>
        <SummaryRow>
          <span>Pajak (11%):</span>
          <span>{formatPrice(tax)}</span>
        </SummaryRow>
        <SummaryTotal>
          <span>Total:</span>
          <span>{formatPrice(grandTotal)}</span>
        </SummaryTotal>

        <CheckoutButton
          onClick={() => console.log("Proceeding to checkout...")}
        >
          Lanjutkan ke Pembayaran
        </CheckoutButton>

        <ContinueShoppingLink to="/products">
          <FaArrowLeft /> Lanjutkan Belanja
        </ContinueShoppingLink>
      </CartSummary>
    </CartContainer>
  );
};

export default CartPage;
