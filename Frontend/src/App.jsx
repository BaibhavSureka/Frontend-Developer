import React from 'react';
import Header from './components/Header';
import Filters from './components/Filters';
import FoodItems from './components/FoodItems';
import Footer from './components/Footer';
import { FoodProvider } from './context/FoodContext';

function App() {
  return (
    <FoodProvider>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow">
          <Filters />
          <div className="max-w-[1200px] mx-auto">
            <FoodItems />
          </div>
        </main>
        <Footer />
      </div>
    </FoodProvider>
  );
}

export default App;

