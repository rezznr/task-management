// src/components/Select.tsx
import React, { ReactNode } from 'react';
import styled from 'styled-components';

const SelectWrapper = styled.div`
    position: relative;
    display: inline-block;
    width: 100%;
`;

const StyledSelect = styled.select`
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    background-color: white;
    padding-right: 2.5rem;
    appearance: none;
    width: 100%;
`;

const IconWrapper = styled.div`
    position: absolute;
    top: 50%;
    right: 0.8rem;
    transform: translateY(-50%);
    pointer-events: none;
    display: flex;
    align-items: center;
`;

interface SelectProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: Array<{ value: string; label: string }>;
    icon?: ReactNode;
}

const Select: React.FC<SelectProps> = ({ value, onChange, options, icon }) => {
    return (
        <SelectWrapper>
            <StyledSelect value={value} onChange={onChange}>
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </StyledSelect>
            {icon && <IconWrapper>{icon}</IconWrapper>}
        </SelectWrapper>
    );
};

export default Select;