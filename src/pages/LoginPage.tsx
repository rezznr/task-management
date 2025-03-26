// src/pages/LoginPage.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from "../components/Input";
import Button from "../components/Button";
import { useAuth } from "../contexts/AuthContext";

const AuthContainer = styled.div`
  max-width: 450px;
  margin: 5rem auto;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    max-width: 90%;
    margin: 3rem auto;
    padding: 1.5rem;
  }
`;

const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const AuthTitle = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.8rem;
  color: #333;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const InputLabel = styled.label`
  font-size: 0.9rem;
  font-weight: 500;
  color: #555;
`;

const StyledLink = styled(Link)`
  color: #4a6cf7;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;

  &:hover {
    color: #304bc7;
    text-decoration: underline;
  }
`;

const RegisterPrompt = styled.div`
  text-align: center;
  margin-top: 1rem;
  font-size: 0.95rem;
  color: #666;
`;

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please enter both email and password");
      return;
    }

    setLoading(true);
    try {
      await login(formData.email, formData.password);
      toast.success("Login successful! Redirecting...");
      // Add a short delay for the toast to be visible before redirect
      navigate("/products");
    } catch (err) {
      const errorMessage = `Failed to login. Please check your credentials. ${
        (err as Error).message
      }`;
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <AuthContainer>
        <AuthTitle>Welcome Back</AuthTitle>
        <AuthForm onSubmit={handleSubmit}>
          <InputGroup>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </InputGroup>

          <InputGroup>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </InputGroup>

          <Button
            type="submit"
            disabled={loading}
            style={{
              padding: "12px",
              marginTop: "10px",
              fontSize: "1rem",
              backgroundColor: loading ? "#cccccc" : "#4a6cf7",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

          <RegisterPrompt>
            Don't have an account?{" "}
            <StyledLink to="/register">Register here</StyledLink>
          </RegisterPrompt>
        </AuthForm>
      </AuthContainer>
    </>
  );
};

export default LoginPage;
