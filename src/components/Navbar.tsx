// src/components/Navbar.tsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import Button from "./Button";
import useCart from "../contexts/CartContext";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";

const Nav = styled.nav`
  background: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #007bff;
  }
`;

const NavLinks = styled.div<{ isOpen: boolean }>`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 70%;
    flex-direction: column;
    background: white;
    padding: 2rem;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
    transform: ${({ isOpen }) =>
      isOpen ? "translateX(0)" : "translateX(100%)"};
    transition: transform 0.3s ease-in-out;
    z-index: 1001;
    justify-content: flex-start;
    gap: 2rem;
  }
`;

const StyledLink = styled(Link)<{ active?: boolean }>`
  color: ${(props) => (props.active ? "#007bff" : "#333")};
  text-decoration: none;
  font-weight: ${(props) => (props.active ? "600" : "400")};
  padding: 0.5rem 0;
  position: relative;
  transition: color 0.3s ease;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${(props) => (props.active ? "100%" : "0")};
    height: 2px;
    background-color: #007bff;
    transition: width 0.3s ease;
  }

  &:hover {
    color: #007bff;

    &:after {
      width: 100%;
    }
  }
`;

const CartBadge = styled.span`
  background: #007bff;
  color: white;
  padding: 0.15rem 0.2rem;
  border-radius: 50%;
  font-size: 0.65rem;
  position: absolute;
  top: -10px;
  right: -10px;
  min-width: 12px;
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
`;

const CartIcon = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;
  color: #333;
  font-size: 1.2rem;
  transition: color 0.3s;

  &:hover {
    color: #007bff;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #333;
  z-index: 1002;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.isOpen ? "block" : "none")};
  z-index: 999;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const { cartItems } = useCart();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleLogout = async () => {
    try {
      await logout();
      // Navigate to home page or login page after logout
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <Nav>
      <Logo to="/">TaskManager</Logo>

      <MobileMenuButton onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </MobileMenuButton>

      <Overlay isOpen={isOpen} onClick={() => setIsOpen(false)} />

      <NavLinks isOpen={isOpen}>
        <StyledLink to="/tasks" active={location.pathname === "/tasks"}>
          Tasks
        </StyledLink>

        <StyledLink to="/products" active={location.pathname === "/products"}>
          Products
        </StyledLink>

        <CartIcon to="/cart">
          <FaShoppingCart />
          {cartItems.length > 0 && <CartBadge>{cartItems.length}</CartBadge>}
        </CartIcon>

        {currentUser ? (
          <ButtonContainer>
            <StyledLink to="/profile" active={location.pathname === "/profile"}>
              Profile
            </StyledLink>
            <Button variant="secondary" onClick={handleLogout}>
              Logout
            </Button>
          </ButtonContainer>
        ) : (
          <ButtonContainer>
            <Link to="/login">
              <Button variant="secondary">Login</Button>
            </Link>
            <Link to="/register">
              <Button>Register</Button>
            </Link>
          </ButtonContainer>
        )}
      </NavLinks>
    </Nav>
  );
};

export default Navbar;
