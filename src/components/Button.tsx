// src/components/Button.tsx
import styled from 'styled-components';
import React from 'react';

interface ButtonProps {
    variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'outline';
    size?: 'small' | 'medium' | 'large';
    isLoading?: boolean;
    fullWidth?: boolean;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
}

const StyledButton = styled.button<ButtonProps>`
    /* Base styles */
    padding: ${({ size }) => 
        size === 'small' ? '0.5rem 0.875rem' : 
        size === 'large' ? '0.875rem 1.75rem' : 
        '0.625rem 1.25rem'};
    font-size: ${({ size }) => 
        size === 'small' ? '0.875rem' : 
        size === 'large' ? '1.125rem' : 
        '1rem'};
    font-weight: 600;
    letter-spacing: 0.01em;
    border-radius: 8px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    transition: all 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
    position: relative;
    overflow: hidden;
    width: ${({ fullWidth }) => fullWidth ? '100%' : 'auto'};
    
    /* Variants */
    ${({ variant }) => {
        switch(variant) {
            case 'primary':
                return `
                    background: linear-gradient(to right, #0071e3, #42a5f5);
                    color: white;
                    border: none;
                    &:hover {
                        background: linear-gradient(to right, #005bb8, #1e88e5);
                    }
                `;
            case 'success':
                return `
                    background: linear-gradient(to right, #2e7d32, #4caf50);
                    color: white;
                    border: none;
                    &:hover {
                        background: linear-gradient(to right, #1b5e20, #388e3c);
                    }
                `;
            case 'danger':
                return `
                    background: linear-gradient(to right, #d32f2f, #f44336);
                    color: white;
                    border: none;
                    &:hover {
                        background: linear-gradient(to right, #b71c1c, #e53935);
                    }
                `;
            case 'outline':
                return `
                    background: transparent;
                    color: #0071e3;
                    border: 2px solid #0071e3;
                    &:hover {
                        background: rgba(0, 113, 227, 0.1);
                    }
                `;
            default: // secondary
                return `
                    background: linear-gradient(to right, #757575, #9e9e9e);
                    color: white;
                    border: none;
                    &:hover {
                        background: linear-gradient(to right, #616161, #757575);
                    }
                `;
        }
    }}
    
    /* States */
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }
    
    &:active {
        transform: translateY(0);
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
    }

    &:focus-visible {
        outline: none;
        box-shadow: 0 0 0 3px rgba(0, 113, 227, 0.5);
    }

    &:disabled {
        background: #e9ecef;
        color: #909090;
        cursor: not-allowed;
        box-shadow: none;
        transform: none;
        opacity: 0.7;
        border: none;
    }

    /* Loading State */
    ${({ isLoading }) => isLoading && `
        color: transparent !important;
        pointer-events: none;
        
        &::after {
            content: '';
            position: absolute;
            width: 1.25rem;
            height: 1.25rem;
            top: calc(50% - 0.625rem);
            left: calc(50% - 0.625rem);
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            border-top-color: white;
            box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
            animation: spin 0.8s linear infinite;
        }
        
        @keyframes spin {
            to {
                transform: rotate(360deg);
            }
        }
    `}

    /* Responsive adjustments */
    @media (max-width: 768px) {
        padding: ${({ size }) => 
            size === 'small' ? '0.5rem 0.75rem' : 
            size === 'large' ? '0.75rem 1.5rem' : 
            '0.625rem 1rem'};
    }

    @media (max-width: 480px) {
        font-size: ${({ size }) => 
            size === 'small' ? '0.8125rem' : 
            size === 'large' ? '1rem' : 
            '0.9375rem'};
        padding: ${({ size }) => 
            size === 'small' ? '0.5rem 0.75rem' : 
            size === 'large' ? '0.75rem 1.25rem' : 
            '0.625rem 1rem'};
        width: ${({ fullWidth }) => fullWidth ? '100%' : 'auto'};
    }
`;

const Button: React.FC<ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ 
    children, 
    variant = 'primary',
    size = 'medium',
    isLoading = false,
    fullWidth = false,
    iconLeft,
    iconRight,
    ...props 
}) => {
    return (
        <StyledButton 
            variant={variant} 
            size={size} 
            isLoading={isLoading}
            fullWidth={fullWidth}
            {...props}
        >
            {iconLeft && <span className="button-icon-left">{iconLeft}</span>}
            {children}
            {iconRight && <span className="button-icon-right">{iconRight}</span>}
        </StyledButton>
    );
};

export default Button;