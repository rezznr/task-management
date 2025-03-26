// src/components/QuantityControl.tsx
import styled from 'styled-components';
import Button from './Button';

const QuantityWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

interface QuantityControlProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

const QuantityControl: React.FC<QuantityControlProps> = ({ 
  quantity, 
  onIncrease, 
  onDecrease 
}) => {
  return (
    <QuantityWrapper>
      <Button 
        variant="secondary" 
        onClick={onDecrease}
        disabled={quantity <= 1}
        aria-label="Decrease quantity"
      >
        -
      </Button>
      <span>{quantity}</span>
      <Button 
        variant="secondary" 
        onClick={onIncrease}
        aria-label="Increase quantity"
      >
        +
      </Button>
    </QuantityWrapper>
  );
};

export default QuantityControl;