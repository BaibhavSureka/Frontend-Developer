import React, { useState } from 'react';
import { useFoodContext } from '../context/FoodContext';
import Modal from './Modal';

const FoodItems = () => {
  const { meals, loading, error, sortOrder, currentPage, setCurrentPage, totalPages } = useFoodContext();
  const [selectedMeal, setSelectedMeal] = useState(null);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="text-center text-red-500">{error}</div>
      </div>
    );
  }

  const sortedMeals = [...meals].sort((a, b) =>
    sortOrder === 'asc'
      ? a.strMeal.localeCompare(b.strMeal)
      : b.strMeal.localeCompare(a.strMeal)
  );

  const itemsPerPage = 12;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedMeals = sortedMeals.slice(startIndex, endIndex);

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {displayedMeals.map((meal) => (
          <div
            key={meal.idMeal}
            onClick={() => setSelectedMeal(meal)}
            className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
          >
            <div className="relative">
              <img
                src={meal.strMealThumb || "/placeholder.svg"}
                alt={meal.strMeal}
                className="w-full aspect-video object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-800 text-lg leading-tight line-clamp-2">
                  {meal.strMeal}
                </h3>
                <span className="flex items-center bg-green-600 text-white px-2 py-1 rounded text-sm font-medium">
                  {(Math.random() * 2 + 3).toFixed(1)} ★
                </span>
              </div>
              
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{Math.floor(Math.random() * 30 + 10)} mins</span>
                <span className="mx-2">•</span>
                <span>₹{Math.floor(Math.random() * 200 + 100)} for one</span>
              </div>
              
              <div className="text-sm text-gray-500 flex items-center">
                <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span>{Math.floor(Math.random() * 1000 + 100)} orders placed today</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 flex justify-center items-center space-x-4">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors duration-200"
        >
          Previous
        </button>
        
        <div className="flex items-center space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200 ${
                currentPage === page
                  ? 'bg-orange-500 text-white'
                  : 'text-black-700 hover:bg-black-100'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
        
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors duration-200"
        >
          Next
        </button>
      </div>

      {selectedMeal && (
        <Modal meal={selectedMeal} onClose={() => setSelectedMeal(null)} />
      )}
    </div>
  );
};

export default FoodItems;
