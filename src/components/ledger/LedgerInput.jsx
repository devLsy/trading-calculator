import React from 'react';

const LedgerInput = ({ label, colorClass, placeholder, value, onChange }) => {
  return (
    <div>
      <label className={`block text-xs font-bold ${colorClass} uppercase tracking-widest mb-1`}>{label}</label>
      <input 
        type="number" 
        placeholder={placeholder} 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-3 font-mono text-base text-right focus:outline-none focus:border-blue-500 text-gray-900"
      />
    </div>
  );
};

export default LedgerInput;