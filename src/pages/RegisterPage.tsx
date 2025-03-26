// src/pages/RegisterPage.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Input from "../components/Input";
import Button from "../components/Button";
import { useAuth } from "../contexts/AuthContext";

const RegisterPage = () => {
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup(formData.email, formData.password);
    } catch (err) {
      setError(
        (err as Error).message || "Failed to create account. Please try again."
      );
    }
  };

  return (
    <AuthContainer>
      <AuthTitle>Register</AuthTitle>
      <AuthForm onSubmit={handleSubmit}>
        <Input
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
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
        <Input
          type="password"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
          }
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button type="submit">Register</Button>
        <div>
          Already have an account? <Link to="/login">Login here</Link>
        </div>
      </AuthForm>
    </AuthContainer>
  );
};

export default RegisterPage;

// Reuse styled components from LoginPage
const { AuthContainer, AuthForm, AuthTitle, ErrorMessage } = {
  AuthContainer: styled.div`
    max-width: 400px;
    margin: 4rem auto;
    padding: 2rem;
    border: 1px solid #ddd;
    border-radius: 8px;
  `,
  AuthForm: styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
  `,
  AuthTitle: styled.h2`
    text-align: center;
    margin-bottom: 2rem;
  `,
  ErrorMessage: styled.div`
    color: #dc3545;
    font-size: 0.9rem;
    margin-top: -0.5rem;
  `,
};
