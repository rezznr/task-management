import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FiAlertTriangle, FiArrowLeft, FiHome, FiClock } from "react-icons/fi";

const NotFoundContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  min-height: 90vh;
  display: flex;
  align-items: center;
`;

const NotFoundContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 3rem 2rem;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
`;

const ErrorCode = styled.h1`
  font-size: 8rem;
  font-weight: 700;
  color: #6366f1;
  margin: 0;
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin: 1.5rem 0;
  color: #1e293b;
`;

const Message = styled.p`
  font-size: 1.25rem;
  color: #64748b;
  max-width: 600px;
  margin: 0 auto 2rem;
`;

const CountdownMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  font-size: 1.1rem;
  color: #64748b;

  svg {
    color: #6366f1;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const Button = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 1.1rem;
`;

const PrimaryButton = styled(Button)`
  background-color: #6366f1;
  color: white;
  box-shadow: 0 4px 6px rgba(99, 102, 241, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(99, 102, 241, 0.4);
  }
`;

const SecondaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 1.1rem;
  background-color: rgba(99, 102, 241, 0.1);
  color: #6366f1;
  border: 1px solid rgba(99, 102, 241, 0.3);
  cursor: pointer;

  &:hover {
    background-color: rgba(99, 102, 241, 0.2);
    transform: translateY(-2px);
  }
`;

const ErrorIcon = styled(FiAlertTriangle)`
  font-size: 5rem;
  color: #6366f1;
  margin-bottom: 1rem;
`;

const NotFoundPage: React.FC = () => {
  const [counter, setCounter] = useState<number>(10);

  // Countdown effect that will redirect after 10 seconds
  useEffect(() => {
    if (counter > 0) {
      const timer = setTimeout(() => setCounter(counter - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      window.location.href = "/";
    }
  }, [counter]);

  return (
    <NotFoundContainer>
      <NotFoundContent>
        <ErrorIcon />
        <ErrorCode>404</ErrorCode>
        <Title>Oops! Halaman tidak ditemukan</Title>
        <Message>
          Halaman yang Anda cari mungkin telah dihapus, dipindahkan, atau tidak
          tersedia.
        </Message>

        <CountdownMessage>
          <FiClock size={20} />
          <span>
            Anda akan dialihkan ke halaman utama dalam {counter} detik
          </span>
        </CountdownMessage>

        <ButtonContainer>
          <PrimaryButton to="/">
            <FiHome /> Kembali ke Beranda
          </PrimaryButton>
          <SecondaryButton onClick={() => window.history.back()}>
            <FiArrowLeft /> Kembali ke Halaman Sebelumnya
          </SecondaryButton>
        </ButtonContainer>
      </NotFoundContent>
    </NotFoundContainer>
  );
};

export default NotFoundPage;
