import React, { createContext, useState, useContext, useEffect } from 'react';
const API_BASE_URL = process.env.REACT_APP_API_URL || "https://www.themealdb.com/api/json/v1/1";

const FoodContext = createContext();

export const useFoodContext = () => {
  const context = useContext(FoodContext);
  if (!context) {
    throw new Error('useFoodContext must be used within a FoodProvider');
  }
  return context;
};

export const FoodProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedArea, setSelectedArea] = useState('Indian');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 12;
  const [filters, setFilters] = useState({
    fastDelivery: false,
    ratings4Plus: false,
    pureVeg: false,
    offers: false,
    priceRange: null,
  });

  // Reset page when filters or area changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedArea, filters]);

  useEffect(() => {
    const fetchMeals = async () => {
      setLoading(true);
      try {
        // First, try to get meals for the selected area
        const response = await fetch(`${API_BASE_URL}/filter.php?a=${selectedArea}`);
        const data = await response.json();

        if (!data.meals) {
          // If no meals found for the area, fetch all meals
          const response = await fetch(`${API_BASE_URL}/search.php?s=`);
          const allMealsData = await allMealsResponse.json();
          setError(null);
          
          // Add additional properties to each meal
          let processedMeals = (allMealsData.meals || []).map(meal => ({
            ...meal,
            rating: parseFloat((Math.random() * 2 + 3).toFixed(1)),
            price: Math.floor(Math.random() * 500 + 100),
            deliveryTime: Math.floor(Math.random() * 30 + 10),
            ordersToday: Math.floor(Math.random() * 1000 + 100),
            isVeg: Math.random() > 0.5,
            hasFastDelivery: Math.random() > 0.5,
            hasOffer: Math.random() > 0.7
          }));

          // Apply filters
          let filteredMeals = processedMeals;

          if (filters.ratings4Plus) {
            filteredMeals = filteredMeals.filter(meal => meal.rating >= 4.0);
          }

          if (filters.fastDelivery) {
            filteredMeals = filteredMeals.filter(meal => meal.hasFastDelivery);
          }

          if (filters.pureVeg) {
            filteredMeals = filteredMeals.filter(meal => meal.isVeg);
          }

          if (filters.offers) {
            filteredMeals = filteredMeals.filter(meal => meal.hasOffer);
          }

          if (filters.priceRange === '300-600') {
            filteredMeals = filteredMeals.filter(
              meal => meal.price >= 300 && meal.price <= 600
            );
          } else if (filters.priceRange === 'under300') {
            filteredMeals = filteredMeals.filter(meal => meal.price < 300);
          }

          setMeals(filteredMeals);
          setTotalPages(Math.max(1, Math.ceil(filteredMeals.length / itemsPerPage)));
        } else {
          // Process meals from the area-specific response
          let processedMeals = data.meals.map(meal => ({
            ...meal,
            rating: parseFloat((Math.random() * 2 + 3).toFixed(1)),
            price: Math.floor(Math.random() * 500 + 100),
            deliveryTime: Math.floor(Math.random() * 30 + 10),
            ordersToday: Math.floor(Math.random() * 1000 + 100),
            isVeg: Math.random() > 0.5,
            hasFastDelivery: Math.random() > 0.5,
            hasOffer: Math.random() > 0.7
          }));

          // Apply filters
          let filteredMeals = processedMeals;

          if (filters.ratings4Plus) {
            filteredMeals = filteredMeals.filter(meal => meal.rating >= 4.0);
          }

          if (filters.fastDelivery) {
            filteredMeals = filteredMeals.filter(meal => meal.hasFastDelivery);
          }

          if (filters.pureVeg) {
            filteredMeals = filteredMeals.filter(meal => meal.isVeg);
          }

          if (filters.offers) {
            filteredMeals = filteredMeals.filter(meal => meal.hasOffer);
          }

          if (filters.priceRange === '300-600') {
            filteredMeals = filteredMeals.filter(
              meal => meal.price >= 300 && meal.price <= 600
            );
          } else if (filters.priceRange === 'under300') {
            filteredMeals = filteredMeals.filter(meal => meal.price < 300);
          }

          setMeals(filteredMeals);
          setTotalPages(Math.max(1, Math.ceil(filteredMeals.length / itemsPerPage)));
        }
        setError(null);
      } catch (err) {
        console.error('Error fetching meals:', err);
        setError('Failed to fetch meals. Please try again later.');
        setMeals([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, [selectedArea, filters]);

  const toggleFilter = (filterName) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }));
  };

  const setPriceRange = (range) => {
    setFilters(prev => ({
      ...prev,
      priceRange: prev.priceRange === range ? null : range
    }));
  };

  const value = {
    meals,
    loading,
    error,
    selectedArea,
    setSelectedArea,
    sortOrder,
    setSortOrder,
    currentPage,
    setCurrentPage,
    totalPages,
    filters,
    toggleFilter,
    setPriceRange,
    itemsPerPage
  };

  return <FoodContext.Provider value={value}>{children}</FoodContext.Provider>;
};