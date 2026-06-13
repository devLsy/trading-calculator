import React from 'react';
import { useCalculator } from "./hooks/useCalculator";  
import CalculatorCard from './components/CalculatorCard';

function App() {
  const calc = useCalculator();
  
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <CalculatorCard calc={calc} />
    </div>
  );
} 

export default App
