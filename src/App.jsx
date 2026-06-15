import React from 'react';
import { useCalculator } from "./hooks/useCalculator";  
import CalculatorCard from './components/calculator/CalculatorCard';
import TradingLedger from './components/ledger/TradingLedger';
    
function App() {
  const calc = useCalculator(); 
  
return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 md:p-8">
      
      <div className="flex flex-col lg:flex-row items-center lg:items-stretch justify-center gap-6 w-full max-w-5xl">
        
        {/* LEFT: 세팅 입력 카드 */}
        <div className="w-full max-w-md flex flex-col">
          <CalculatorCard calc={calc} />
        </div>
        
        {/* RIGHT: 최종 결과 장부 카드 */}
        <div className="w-full max-w-md flex flex-col">
          <TradingLedger calc={calc} />
        </div>
        
      </div>
    </div>
  );
} 

export default App
