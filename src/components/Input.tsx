// src/components/Input.tsx
import styled, { css } from 'styled-components';
import { ChangeEventHandler, useState } from 'react';

interface InputProps {
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    placeholder?: string;
    type?: string;
    label?: string;
    error?: string;
    icon?: React.ReactNode;
    inputSize?: 'small' | 'medium' | 'large';
    fullWidth?: boolean;
    showClearButton?: boolean;
    maxLength?: number;
    showCharCount?: boolean;
}

interface StyledInputWrapperProps {
    hasError?: boolean;
    hasFocus?: boolean;
    disabled?: boolean;
    size?: 'small' | 'medium' | 'large';
    fullWidth?: boolean;
}

const InputWrapper = styled.div<{ fullWidth?: boolean }>`
    display: flex;
    flex-direction: column;
    margin-bottom: 1.25rem;
    width: ${props => props.fullWidth ? '100%' : 'auto'};
    min-width: ${props => props.fullWidth ? 'auto' : '280px'};
    
    @media (max-width: 768px) {
        width: 100%;
        min-width: 100%;
    }
`;

const LabelWrapper = styled.div<{ hasFocus?: boolean; hasValue?: boolean }>`
    position: relative;
    margin-bottom: 0.5rem;
    transition: all 0.2s ease;
`;

const Label = styled.label<{ hasFocus?: boolean; hasValue?: boolean; hasError?: boolean }>`
    font-size: 0.875rem;
    font-weight: 500;
    color: ${props => props.hasError ? '#dc3545' : props.hasFocus ? '#3a7dda' : '#555'};
    transition: all 0.2s ease;
    display: block;
    transform-origin: left top;
    
    ${props => (props.hasFocus || props.hasValue) && css`
        transform: translateY(0);
        font-size: 0.75rem;
    `}
`;

const InputContainer = styled.div<StyledInputWrapperProps>`
    display: flex;
    align-items: center;
    background-color: ${props => props.disabled ? '#f8f9fa' : '#fff'};
    border: 2px solid ${props => {
        if (props.hasError) return '#dc3545';
        if (props.hasFocus) return '#3a7dda';
        return '#d1d9e6';
    }};
    border-radius: 8px;
    transition: all 0.3s ease;
    box-shadow: ${props => props.hasFocus 
        ? '0 0 0 3px rgba(58, 125, 218, 0.2)' 
        : props.hasError 
        ? '0 0 0 3px rgba(220, 53, 69, 0.1)'
        : '0 2px 4px rgba(0, 0, 0, 0.04)'};
    overflow: hidden;
    width: ${props => props.fullWidth ? '100%' : 'auto'};
    position: relative;

    &:hover {
        border-color: ${props => props.disabled ? '#d1d9e6' : props.hasError ? '#dc3545' : '#3a7dda'};
    }

    ${props => props.disabled && css`
        opacity: 0.7;
        cursor: not-allowed;
    `}

    ${props => {
        switch(props.size) {
            case 'small':
                return css`padding: 0.4rem 0.7rem;`;
            case 'large':
                return css`padding: 0.8rem 1.1rem;`;
            default:
                return css`padding: 0.6rem 0.9rem;`;
        }
    }}
    
    @media (max-width: 576px) {
        ${props => {
            switch(props.size) {
                case 'small':
                    return css`padding: 0.35rem 0.6rem;`;
                case 'large':
                    return css`padding: 0.7rem 0.9rem;`;
                default:
                    return css`padding: 0.5rem 0.8rem;`;
            }
        }}
    }
`;

const StyledInput = styled.input`
    flex: 1;
    border: none;
    background: transparent;
    font-size: 1rem;
    color: #333;
    padding: 0.45rem;
    width: 100%;
    transition: all 0.2s;
    
    @media (max-width: 576px) {
        font-size: 0.95rem;
        padding: 0.4rem;
    }

    &:focus {
        outline: none;
    }

    &::placeholder {
        color: #adb5bd;
        opacity: 0.8;
        transition: opacity 0.2s;
    }

    &:focus::placeholder {
        opacity: 0.6;
    }

    &:disabled {
        cursor: not-allowed;
    }
`;

const IconWrapper = styled.div`
    display: flex;
    align-items: center;
    padding: 0 0.5rem 0 0;
    color: #6c757d;
    transition: color 0.2s;
`;

const ClearButton = styled.button`
    background: #f1f3f5;
    border: none;
    color: #6c757d;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    font-size: 0.85rem;
    transition: all 0.2s;
    margin-left: 0.5rem;
    
    &:hover {
        background: #dee2e6;
        color: #495057;
    }
    
    &:active {
        transform: scale(0.95);
    }
`;

const ErrorMessage = styled.div`
    color: #dc3545;
    font-size: 0.75rem;
    margin-top: 0.35rem;
    display: flex;
    align-items: center;
    
    &:before {
        content: '⚠️';
        margin-right: 0.35rem;
        font-size: 0.75rem;
    }

    @media (max-width: 576px) {
        font-size: 0.7rem;
    }
`;

const CharCount = styled.div<{ isNearLimit?: boolean }>`
    font-size: 0.7rem;
    text-align: right;
    margin-top: 0.3rem;
    color: ${props => props.isNearLimit ? '#dc3545' : '#6c757d'};
    transition: color 0.2s;
`;

const Input: React.FC<InputProps & React.InputHTMLAttributes<HTMLInputElement>> = ({ 
    value, 
    onChange, 
    placeholder, 
    type = 'text',
    label,
    error,
    icon,
    inputSize = 'medium',
    fullWidth = false,
    showClearButton = false,
    maxLength,
    showCharCount,
    disabled,
    ...props 
}) => {
    const [hasFocus, setHasFocus] = useState(false);
    const hasValue = value !== '';
    
    const handleClear = () => {
        const event = {
            target: { value: '' }
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(event);
    };

    const isNearLimit = Boolean(maxLength && typeof value === 'string' && value.length > maxLength * 0.8);

    return (
        <InputWrapper fullWidth={fullWidth}>
            {label && (
                <LabelWrapper hasFocus={hasFocus} hasValue={hasValue}>
                    <Label hasFocus={hasFocus} hasValue={hasValue} hasError={!!error}>
                        {label}
                    </Label>
                </LabelWrapper>
            )}
            <InputContainer 
                hasError={!!error} 
                hasFocus={hasFocus}
                disabled={disabled}
                size={inputSize}
                fullWidth={fullWidth}
            >
                {icon && <IconWrapper>{icon}</IconWrapper>}
                <StyledInput
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    onFocus={() => setHasFocus(true)}
                    onBlur={() => setHasFocus(false)}
                    maxLength={maxLength}
                    aria-invalid={!!error}
                    aria-describedby={error ? `${label}-error` : undefined}
                    {...props}
                />
                {showClearButton && value && !disabled && (
                    <ClearButton 
                        onClick={handleClear} 
                        type="button"
                        aria-label="Clear input"
                    >
                        ×
                    </ClearButton>
                )}
            </InputContainer>
            {error && <ErrorMessage id={`${label}-error`}>{error}</ErrorMessage>}
            {showCharCount && maxLength && (
                <CharCount isNearLimit={isNearLimit}>
                    {value.length}/{maxLength}
                </CharCount>
            )}
        </InputWrapper>
    );
};

export default Input;