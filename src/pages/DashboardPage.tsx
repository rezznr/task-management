// src/pages/DashboardPage.tsx
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  FiCheckCircle,
  FiShoppingCart,
  FiList,
  FiUsers,
  FiLock,
  FiLayout,
  FiArrowRight,
  FiCalendar,
  FiPackage,
} from "react-icons/fi";

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const HeroSection = styled.section`
  text-align: center;
  padding: 5rem 2rem;
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
  border-radius: 1rem;
  color: white;
  margin-bottom: 4rem;
  box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3);

  h1 {
    font-size: 3rem;
    margin-bottom: 1.5rem;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    font-weight: 700;
  }

  p {
    font-size: 1.35rem;
    margin-bottom: 2.5rem;
    opacity: 0.9;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
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
  background-color: white;
  color: #6366f1;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const SecondaryButton = styled(Button)`
  background-color: rgba(255, 255, 255, 0.15);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.5);

  &:hover {
    background-color: rgba(255, 255, 255, 0.25);
    transform: translateY(-2px);
  }
`;

const QuickAccessSection = styled.section`
  margin: 4rem 0;
`;

const QuickAccessGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const QuickAccessCard = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.5rem 2rem;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  text-decoration: none;
  border: 1px solid #f0f0f0;
  color: inherit;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(99, 102, 241, 0.15);
    border-color: #6366f1;
  }

  .icon-circle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: #f0f4ff;
    margin-bottom: 1.5rem;
    color: #6366f1;
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #1e293b;
  }

  p {
    text-align: center;
    color: #64748b;
    margin-bottom: 1.5rem;
  }
`;

const ViewMoreButton = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6366f1;
  font-weight: 600;
  margin-top: auto;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
`;

const FeatureCard = styled.div`
  padding: 2.5rem;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
  border: 1px solid #f0f0f0;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
    border-color: #e2e8f0;
  }

  h3 {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.25rem;
    color: #4f46e5;
    font-size: 1.25rem;
  }

  p {
    color: #64748b;
    line-height: 1.6;
  }
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin: 4rem 0;
`;

const StatCard = styled.div`
  text-align: center;
  padding: 2.5rem;
  background: #f8fafc;
  border-radius: 1rem;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;

  &:hover {
    background: #fff;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  }

  h2 {
    font-size: 3rem;
    color: #4f46e5;
    margin: 1rem 0;
    font-weight: 700;
  }

  p {
    color: #64748b;
    font-weight: 500;
  }
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #1e293b;
  position: relative;
  padding-bottom: 1rem;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, #6366f1, #a855f7);
    border-radius: 2px;
  }
`;

const CtaSection = styled.section`
  text-align: center;
  padding: 5rem 2rem;
  background: linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%);
  border-radius: 1rem;
  margin: 4rem 0;
  border: 1px solid #e2e8f0;

  h2 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    color: #1e293b;
  }

  p {
    font-size: 1.25rem;
    color: #64748b;
    margin-bottom: 2.5rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const DashboardPage = () => {
  return (
    <DashboardContainer>
      <HeroSection>
        <h1>TaskMaster</h1>
        <p>
          Your All-in-One Productivity Solution for Task Management & E-Commerce
        </p>
        <ButtonContainer>
          <PrimaryButton to="/register">
            Get Started <FiArrowRight />
          </PrimaryButton>
          <SecondaryButton to="/features">Learn More</SecondaryButton>
        </ButtonContainer>
      </HeroSection>

      <QuickAccessSection>
        <SectionTitle>Quick Access</SectionTitle>
        <QuickAccessGrid>
          <QuickAccessCard to="/tasks">
            <div className="icon-circle">
              <FiCalendar size={36} />
            </div>
            <h3>Task Management</h3>
            <p>Create, organize, and track your daily tasks and projects</p>
            <ViewMoreButton>
              View Tasks <FiArrowRight />
            </ViewMoreButton>
          </QuickAccessCard>

          <QuickAccessCard to="/products">
            <div className="icon-circle">
              <FiPackage size={36} />
            </div>
            <h3>Product Catalog</h3>
            <p>Browse and manage your products and inventory</p>
            <ViewMoreButton>
              View Products <FiArrowRight />
            </ViewMoreButton>
          </QuickAccessCard>
        </QuickAccessGrid>
      </QuickAccessSection>

      <StatsContainer>
        <StatCard>
          <FiCheckCircle size={40} color="#4f46e5" />
          <h2>1.5K+</h2>
          <p>Tasks Completed</p>
        </StatCard>
        <StatCard>
          <FiShoppingCart size={40} color="#4f46e5" />
          <h2>500+</h2>
          <p>Products Available</p>
        </StatCard>
        <StatCard>
          <FiUsers size={40} color="#4f46e5" />
          <h2>10K+</h2>
          <p>Active Users</p>
        </StatCard>
      </StatsContainer>

      <section>
        <SectionTitle>Powerful Features</SectionTitle>

        <FeatureGrid>
          <FeatureCard>
            <h3>
              <FiList size={22} /> Smart Task Management
            </h3>
            <p>
              Create, organize, and prioritize tasks with advanced filtering
              options. Set deadlines, reminders, and track progress in
              real-time.
            </p>
          </FeatureCard>

          <FeatureCard>
            <h3>
              <FiShoppingCart size={22} /> Integrated E-Commerce
            </h3>
            <p>
              Browse and manage products, track orders, and handle inventory all
              within the same platform.
            </p>
          </FeatureCard>

          <FeatureCard>
            <h3>
              <FiLock size={22} /> Secure Authentication
            </h3>
            <p>
              Enterprise-grade security with encrypted user authentication and
              role-based access control.
            </p>
          </FeatureCard>

          <FeatureCard>
            <h3>
              <FiLayout size={22} /> Responsive Design
            </h3>
            <p>
              Fully responsive interface that works seamlessly across all
              devices and screen sizes.
            </p>
          </FeatureCard>
        </FeatureGrid>
      </section>

      <CtaSection>
        <h2>Ready to Boost Your Productivity?</h2>
        <p>
          Join thousands of satisfied users and streamline your workflow today
        </p>
        <PrimaryButton to="/register">
          Start Free Trial <FiArrowRight />
        </PrimaryButton>
      </CtaSection>
    </DashboardContainer>
  );
};

export default DashboardPage;
