import React, { useState, useEffect } from "react";
import { useFoodContext } from "../context/FoodContext";
const API_BASE_URL = process.env.REACT_APP_API_URL || "https://www.themealdb.com/api/json/v1/1";

const Filters = () => {
  const {
    setSelectedArea,
    sortOrder,
    setSortOrder,
    filters,
    toggleFilter,
    setPriceRange,
  } = useFoodContext();

  const [areas, setAreas] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });
  const filterButtonRef = React.useRef(null);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/list.php?a=list`);
        const data = await response.json();
        setAreas(data.meals.map((meal) => meal.strArea));
      } catch (error) {
        console.error("Failed to fetch areas:", error);
      }
    };
    fetchAreas();
  }, []);

  useEffect(() => {
    if (showDropdown && filterButtonRef.current) {
      const rect = filterButtonRef.current.getBoundingClientRect();
      setButtonPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
  }, [showDropdown]);

  const filterButtons = [
    { id: "fastDelivery", label: "Fast Delivery" },
    { id: "ratings4Plus", label: "Ratings 4.0+" },
    { id: "pureVeg", label: "Pure Veg" },
    { id: "offers", label: "Offers" },
  ];

  return (
    <div className="bg-white border-b border-gray-200 mt-16">
      <div className="max-w-[1200px] mx-auto px-4 py-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Restaurants with online food delivery
        </h1>

        <div className="flex items-center space-x-4 overflow-x-auto pb-4 scrollbar-hide">
          {/* Area Filter Dropdown */}
          <div className="relative flex-shrink-0">
            <button
              ref={filterButtonRef}
              onClick={() => setShowDropdown(!showDropdown)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-full flex items-center space-x-2 hover:border-gray-400 transition-colors duration-200 min-w-max"
            >
              <svg
                className="h-5 w-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
              <span className="text-gray-700">Filter</span>
            </button>

            {showDropdown && (
              <div
                className="fixed bg-white rounded-lg shadow-xl border border-gray-200 z-50"
                style={{
                  top: `${buttonPosition.top}px`,
                  left: `${buttonPosition.left}px`,
                  width: '288px',
                  maxHeight: '80vh',
                  overflow: 'auto'
                }}
              >
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-gray-800">Filter By Area</h3>
                    <button
                      onClick={() => setShowDropdown(false)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="space-y-2">
                    {areas.map((area) => (
                      <label
                        key={area}
                        className="flex items-center space-x-3 cursor-pointer p-2 hover:bg-gray-50 rounded-md"
                      >
                        <input
                          type="radio"
                          name="area"
                          value={area}
                          onChange={() => {
                            setSelectedArea(area);
                            setShowDropdown(false);
                          }}
                          className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300"
                        />
                        <span className="text-gray-700">{area}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Filter Buttons */}
          {filterButtons.map((button) => (
            <button
              key={button.id}
              onClick={() => toggleFilter(button.id)}
              className={`px-4 py-2 rounded-full border transition-colors duration-200 min-w-max ${
                filters[button.id]
                  ? "bg-orange-50 border-orange-500 text-orange-500"
                  : "bg-white border-gray-300 text-black hover:border-gray-400"
              }`}
            >
              {button.label}
            </button>
          ))}

          {/* Price Range Filters */}
          <button
            onClick={() => setPriceRange("300-600")}
            className={`px-4 py-2 rounded-full border transition-colors duration-200 min-w-max ${
              filters.priceRange === "300-600"
                ? "bg-orange-50 border-orange-500 text-orange-500"
                : "bg-white border-gray-300 text-black hover:border-gray-400"
            }`}
          >
            Rs. 300-Rs. 600
          </button>

          <button
            onClick={() => setPriceRange("under300")}
            className={`px-4 py-2 rounded-full border transition-colors duration-200 min-w-max ${
              filters.priceRange === "under300"
                ? "bg-orange-50 border-orange-500 text-orange-500"
                : "bg-white border-gray-300 text-black hover:border-gray-400"
            }`}
          >
            Less than Rs. 300
          </button>

          {/* Sort Dropdown */}
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className={`px-4 py-2 rounded-full border transition-colors duration-200 min-w-max ${
              sortOrder === "asc" || sortOrder === "desc"
                ? "bg-orange-50 border-orange-500 text-orange-500"
                : "bg-white border-gray-300 text-black hover:border-gray-400"
            } focus:outline-none focus:border-gray-400`}
          >
            <option value="asc">Sort A-Z</option>
            <option value="desc">Sort Z-A</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filters;