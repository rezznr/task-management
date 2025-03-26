// src/pages/LoginPage.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Input from "../components/Input";
import Button from "../components/Button";
import { useAuth } from "../contexts/AuthContext";

const AuthContainer = styled.div`
  max-width: 400px;
  margin: 4rem auto;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const AuthTitle = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 0.9rem;
  margin-top: -0.5rem;
`;

const LoginPage = () => {
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
    } catch (err) {
      setError(
        (err as Error).message ||
          "Failed to login. Please check your credentials."
      );
    }
  };
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  return (
    <AuthContainer>
      <AuthTitle>Login</AuthTitle>
      <AuthForm onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <Input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button type="submit">Login</Button>
        <div>
          Don't have an account? <Link to="/register">Register here</Link>
        </div>
      </AuthForm>
    </AuthContainer>
  );
};

export default LoginPage;
