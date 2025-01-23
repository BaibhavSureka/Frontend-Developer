## Technical Assignment

### Overview
This project involves building a Food Menu Landing Page using **React**. The primary focus is to demonstrate technical skills, creativity in design, and user experience. The landing page allows users to explore food items with features like filtering, sorting, pagination, and a detailed modal view for selected items.

The deployed application mimics the design and theme of [Swiggy](https://www.swiggy.com/) while fetching real-time data from the [TheMealDB API](https://www.themealdb.com/api.php). The app is fully responsive and works seamlessly across various devices and screen sizes.

### Deployed Application
- Live Link: [Food Menu App](https://food-menu-app-amber.vercel.app/)
---

## Features

### 1. Header Section
- Includes a logo and a non-functional search bar for aesthetic purposes.

### 2. Filters Section
- Dropdown for filtering food items by area using data from TheMealDB API.
- Radio box selection to choose an area and update the displayed food items dynamically.
- "Sort By" functionality to sort food items alphabetically.

### 3. Food Items Section
- Displays Indian food items by default.
- Each food card includes:
  - Image
  - Name
  - Randomly generated ratings
- Clicking a food item opens a **Modal** with additional details.
- Includes **Pagination** for navigating through the food items.

### 4. Footer Section
- A simple footer for visual balance.

---

## Technology Stack
- **Frontend**: React
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Hosting**: Vercel

---

## API Reference
Data is fetched from [TheMealDB API](https://www.themealdb.com/api.php). Key endpoints used:
- **Filter by Area**: `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
- **Food Items by Area**: `https://www.themealdb.com/api/json/v1/1/filter.php?a=<area>`
- **Food Item Details**: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=<meal_id>`

---

## How to Run the Application Locally

### Prerequisites
- **Node.js** and **npm** installed on your system.

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/BaibhavSureka/food-menu-app.git
   ```

2. Navigate to the project directory:
   ```bash
   cd food-menu-app
   ```

3. Install dependencies:
   ```bash
    npm install
   ```
   
4. Start the development server:
   ```bash
    npm start
   ```

5. Open the application in your browser at http://localhost:5173.

---

### File Structure
   ```bash
  <food-menu-app>
  ├── public/
  ├── src/
  │   ├── components/
  │   │   ├── Header.jsx
  │   │   ├── Filters.jsx
  │   │   ├── FoodItems.jsx
  │   │   ├── Modal.jsx
  │   │   └── Footer.jsx
  │   ├── App.js
  │   ├── index.js
  │   └── context/
  │       └── FoodContext.jsx
  ├── package.json
  └── README.md
```

---

## Additional Details
1. The app mimics the design and color scheme of Swiggy.
2. Designed to ensure a smooth user experience with responsiveness across all devices.
3. Focused on minimal library usage for a clean and efficient implementation.
