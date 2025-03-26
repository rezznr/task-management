// src/pages/ProductPage.tsx
import { useState, useEffect, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  FiShoppingCart,
  FiFilter,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import Button from "../components/Button";
import ProductCard from "../components/ProductCard";
import useCart from "../contexts/CartContext";
import Input from "../components/Input";
import Select from "../components/Select";
import Loader from "../components/Loader";
import { Product } from "../contexts/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { mockProducts } from "../data/Product";

const ProductPageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  background: #f9fafb;
  min-height: 100vh;
`;

const PageTitle = styled.h1`
  font-size: 2.2rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 0.5rem;
`;

const PageSubtitle = styled.p`
  font-size: 1rem;
  color: #4a5568;
  margin-bottom: 2rem;
`;

const ProductHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1.5rem;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 300px;

  svg {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #718096;
  }
`;

const StyledInput = styled(Input)`
  padding-left: 2.5rem !important;
  border-radius: 4px;
  border: 1px solid #e2e8f0;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.75rem;
  padding: 0.5rem 0 2rem;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  margin-top: 3rem;
  padding: 1rem 0;
`;

const PageInfo = styled.div`
  font-size: 1rem;
  color: #4a5568;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const PageNumber = styled.span`
  font-weight: 600;
  color: #2d3748;
  background: white;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 3rem;
  color: #718096;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  font-size: 1.1rem;

  svg {
    font-size: 3rem;
    margin-bottom: 1rem;
    opacity: 0.5;
  }
`;

const CartSummary = styled.div`
  background: white;
  padding: 1.25rem 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const CartCount = styled.span`
  background: #4299e1;
  color: white;
  font-size: 0.8rem;
  font-weight: 600;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
`;

const ViewCartButton = styled(Link)`
  background: #4299e1;
  color: white;
  padding: 0.5rem 1.25rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    background: #3182ce;
  }

  svg {
    font-size: 1.1rem;
  }
`;

const CategoryTabs = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
  scrollbar-width: thin;
  width: 100%;
  max-width: 100%; /* Ensure it doesn't exceed parent width */
  flex-wrap: nowrap; /* Prevent wrapping to new line */
  white-space: nowrap; /* Keep all tabs in a single line */

  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #cbd5e0;
    border-radius: 4px;
  }

  @media (max-width: 768px) {
    gap: 0.4rem;
    margin-bottom: 1rem;
  }

  @media (max-width: 480px) {
    padding-bottom: 0.75rem;
    gap: 0.3rem;
    margin: 0 -1rem 1rem -1rem; /* Extend to screen edges */
    padding: 0 1rem 0.75rem 1rem; /* Add horizontal padding */
    width: calc(100% + 2rem); /* Compensate for negative margins */
  }
`;

const CategoryTab = styled.button<{ active: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 20px;
  white-space: nowrap;
  font-size: 0.9rem;
  border: none;
  background: ${(props) => (props.active ? "#4299e1" : "white")};
  color: ${(props) => (props.active ? "white" : "#4a5568")};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    padding: 0.45rem 0.9rem;
    font-size: 0.85rem;
  }

  @media (max-width: 480px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }
`;

const ProductPage = () => {
  const { cartItems, addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const itemsPerPage = 6;

  // Mock API call dengan delay
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      // Simulasi API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setProducts(mockProducts);
      setError("");
    } catch (err) {
      setError(
        (err as Error).message ||
          "Failed to load products. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(products.map((p) => p.category));
    return ["all", ...Array.from(cats)];
  }, [products]);

  // Filter and sort products
  const processedProducts = useMemo(() => {
    let filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    switch (sortOption) {
      case "price_asc":
        return [...filtered].sort((a, b) => a.price - b.price);
      case "price_desc":
        return [...filtered].sort((a, b) => b.price - a.price);
      case "name_asc":
        return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
      default:
        return filtered;
    }
  }, [products, searchQuery, sortOption, selectedCategory]);

  // Pagination
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return processedProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [processedProducts, currentPage]);

  const totalPages = Math.ceil(processedProducts.length / itemsPerPage);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortOption, selectedCategory]);

  if (loading) return <Loader />;

  if (error) return <ErrorMessage>{error}</ErrorMessage>;

  return (
    <ProductPageContainer>
      <CartSummary>
        <div>
          <h2>Shopping Cart</h2>
          <p>
            You have <strong>{cartItems.length}</strong> items in your cart
          </p>
        </div>
        <ViewCartButton to="/cart">
          <FiShoppingCart /> View Cart
          {cartItems.length > 0 && <CartCount>{cartItems.length}</CartCount>}
        </ViewCartButton>
      </CartSummary>

      <PageTitle>Explore Our Products</PageTitle>
      <PageSubtitle>Find the perfect products that fit your needs</PageSubtitle>

      <ProductHeader>
        <CategoryTabs>
          {categories.map((category) => (
            <CategoryTab
              key={category}
              active={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </CategoryTab>
          ))}
        </CategoryTabs>

        <FilterContainer>
          <SearchContainer>
            <StyledInput
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchContainer>

          <Select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            options={[
              { value: "", label: "Sort By" },
              { value: "price_asc", label: "Price: Low to High" },
              { value: "price_desc", label: "Price: High to Low" },
              { value: "name_asc", label: "Name: A-Z" },
            ]}
            icon={<FiFilter />}
          />
        </FilterContainer>
      </ProductHeader>

      <AnimatePresence>
        {paginatedProducts.length === 0 ? (
          <ErrorMessage>
            <div>No products found matching your criteria</div>
            <p>Try adjusting your search or filter settings</p>
            <Button
              variant="secondary"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setSortOption("");
              }}
            >
              Clear Filters
            </Button>
          </ErrorMessage>
        ) : (
          <>
            <ProductGrid>
              {paginatedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProductCard
                    product={product}
                    onAddToCart={() => addToCart(product)}
                  />
                </motion.div>
              ))}
            </ProductGrid>

            {totalPages > 1 && (
              <PaginationContainer>
                <Button
                  variant="secondary"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  disabled={currentPage === 1}
                >
                  <FiChevronLeft /> Previous
                </Button>

                <PageInfo>
                  Page <PageNumber>{currentPage}</PageNumber> of {totalPages}
                </PageInfo>

                <Button
                  variant="secondary"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next <FiChevronRight />
                </Button>
              </PaginationContainer>
            )}
          </>
        )}
      </AnimatePresence>
    </ProductPageContainer>
  );
};

export default ProductPage;
