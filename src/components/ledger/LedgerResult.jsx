import React from 'react';

const LedgerResult = ({ netPnL, roe }) => {
  const isProfit = netPnL > 0;
  const isLoss = netPnL < 0;
  
  const textColorClass = isProfit ? 'text-green-600' : isLoss ? 'text-red-600' : 'text-gray-900';
  const bgBoxClass = isProfit ? 'bg-green-50/60 border-green-100' : isLoss ? 'bg-red-50/60 border-red-100' : 'bg-gray-50 border-gray-100';

  return (
    <div className={`p-4 rounded-2xl border font-mono space-y-3 ${bgBoxClass} transition-colors duration-200 shadow-sm`}>
      <div className="flex justify-between items-baseline border-b border-gray-200/40 pb-2">
        <span className="text-xs font-black text-gray-400 uppercase tracking-wider">Net PnL</span>
        <span className={`text-xl font-black font-mono ${textColorClass}`}>
          {isProfit ? '+' : ''}{netPnL.toFixed(4)} <span className="text-xs">USDT</span>
        </span>
      </div>
      <div className="flex justify-between items-baseline">
        <span className="text-xs font-black text-gray-400 uppercase tracking-wider">Net ROE</span>
        <span className={`text-lg font-black font-mono ${textColorClass}`}>
          {isProfit ? '+' : ''}{roe.toFixed(2)} %
        </span>
      </div>
    </div>
  );
};

export default LedgerResult;