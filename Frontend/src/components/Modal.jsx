import React, { useEffect, useState } from 'react';
const API_BASE_URL = process.env.REACT_APP_API_URL || "https://www.themealdb.com/api/json/v1/1";

const Modal = ({ meal, onClose }) => {
  const [mealDetails, setMealDetails] = useState(null);

  useEffect(() => {
    const fetchMealDetails = async () => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`);
        const data = await response.json();
        setMealDetails(data.meals[0]);
      } catch (error) {
        console.error('Failed to fetch meal details:', error);
      }
    };

    fetchMealDetails();
  }, [meal.idMeal]);

  if (!mealDetails) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-hidden">
        <div className="relative">
          <img
            src={mealDetails.strMealThumb || "/placeholder.svg"}
            alt={mealDetails.strMeal}
            className="w-full h-64 object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-gray rounded-full p-2 shadow-lg hover:bg-black-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-16rem)]">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{mealDetails.strMeal}</h2>
              <p className="text-gray-600">{mealDetails.strArea} • {mealDetails.strCategory}</p>
            </div>
            <div className="bg-green-600 text-white px-2 py-1 rounded text-sm">
              {(Math.random() * 2 + 3).toFixed(1)} ★
            </div>
          </div>
          
          <div className="border-t border-b py-4 my-4">
            <h3 className="text-lg font-semibold mb-2">Instructions</h3>
            <p className="text-gray-600 whitespace-pre-line">{mealDetails.strInstructions}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 20 }).map((_, i) => {
                const ingredient = mealDetails[`strIngredient${i + 1}`];
                const measure = mealDetails[`strMeasure${i + 1}`];
                if (ingredient && measure) {
                  return (
                    <div key={i} className="flex items-center space-x-2">
                      <span className="text-orange-500">•</span>
                      <span className="text-gray-700">{ingredient}</span>
                      <span className="text-gray-500">({measure})</span>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
