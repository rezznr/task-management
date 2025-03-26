// src/pages/RegisterPage.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from "../components/Input";
import Button from "../components/Button";
import { useAuth } from "../contexts/AuthContext";

const RegisterPage = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    general: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    // Reset errors
    Object.keys(newErrors).forEach(
      (key) => (newErrors[key as keyof typeof errors] = "")
    );

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please correct the form errors");
      return;
    }

    setIsLoading(true);
    try {
      await signup(formData.email, formData.password);
      toast.success("Account created successfully!");
      setTimeout(() => navigate("/products"), 2000);
    } catch (err) {
      const errorMessage = (err as Error).message || "Failed to create account";
      toast.error(errorMessage);
      setErrors({
        ...errors,
        general: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContainer>
      <ToastContainer position="top-right" autoClose={3000} />
      <AuthCard>
        <AuthTitle>Create Account</AuthTitle>
        <AuthForm onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              error={errors.name}
            />
            {errors.name && <ErrorText>{errors.name}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              error={errors.email}
            />
            {errors.email && <ErrorText>{errors.email}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              error={errors.password}
            />
            {errors.password && <ErrorText>{errors.password}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              error={errors.confirmPassword}
            />
            {errors.confirmPassword && (
              <ErrorText>{errors.confirmPassword}</ErrorText>
            )}
          </FormGroup>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Register"}
          </Button>

          <LoginLink>
            Already have an account? <StyledLink to="/login">Login</StyledLink>
          </LoginLink>
        </AuthForm>
      </AuthCard>
    </AuthContainer>
  );
};

export default RegisterPage;

const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: #f9fafb;
`;

const AuthCard = styled.div`
  width: 100%;
  max-width: 450px;
  padding: 2.5rem;
  border-radius: 12px;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const AuthTitle = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  color: #1a202c;
  font-size: 1.75rem;
  font-weight: 600;
`;

const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #4a5568;
`;

const ErrorText = styled.p`
  color: #e53e3e;
  font-size: 0.75rem;
  margin-top: 0.25rem;
`;

const LoginLink = styled.div`
  text-align: center;
  margin-top: 1rem;
  font-size: 0.875rem;
  color: #4a5568;
`;

const StyledLink = styled(Link)`
  color: #3182ce;
  font-weight: 500;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
