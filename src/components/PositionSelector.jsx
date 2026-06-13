import React from 'react';

// ① 포지션 선택기
export const PositionSelector = ({ position, setPosition }) => (
  <div className="flex gap-2">
    <button 
      onClick={() => setPosition('long')}
      className={`flex-1 py-3 rounded-xl font-bold transition-all cursor-pointer ${position === 'long' ? 'bg-green-500 text-white shadow-lg' : 'bg-gray-200 text-gray-600'}`}
    >
      LONG
    </button>
    <button 
      onClick={() => setPosition('short')}
      className={`flex-1 py-3 rounded-xl font-bold transition-all cursor-pointer ${position === 'short' ? 'bg-red-500 text-white shadow-lg' : 'bg-gray-200 text-gray-600'}`}
    >
      SHORT
    </button>
  </div>
);