import React, { useState, useEffect } from 'react';

const TradingLedger = () => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [duration, setDuration] = useState(0);

  const [fee, setFee] = useState('');             
  const [margin, setMargin] = useState('');       
  const [finalBalance, setFinalBalance] = useState(''); 

  const setNowTime = (type) => {
    const now = new Date();
    const timeString = now.toTimeString().split(' ')[0].substring(0, 5); 
    if (type === 'start') setStartTime(timeString);
    if (type === 'end') setEndTime(timeString);
  };

  useEffect(() => {
    let startRaw = startTime.replace(':', '');
    let endRaw = endTime.replace(':', '');

    if (startRaw.length === 4 && endRaw.length === 4) {
      const startH = parseInt(startRaw.substring(0, 2), 10);
      const startM = parseInt(startRaw.substring(2, 4), 10);
      const endH = parseInt(endRaw.substring(0, 2), 10);
      const endM = parseInt(endRaw.substring(2, 4), 10);

      if (startH < 24 && startM < 60 && endH < 24 && endM < 60) {
        let diffMins = (endH * 60 + endM) - (startH * 60 + startM);
        if (diffMins < 0) diffMins += 24 * 60; 
        setDuration(diffMins);
      }
    }
  }, [startTime, endTime]);

  const numFee = parseFloat(fee) || 0;
  const numMargin = parseFloat(margin) || 0;
  const numFinalBalance = parseFloat(finalBalance) || 0;

  const netPnL = (numMargin > 0 || numFinalBalance > 0) 
    ? (numFinalBalance - numMargin) - numFee 
    : 0;

  const roe = numMargin > 0 ? (netPnL / numMargin) * 100 : 0;

  const isProfit = netPnL > 0;
  const isLoss = netPnL < 0;
  const textColorClass = isProfit ? 'text-green-600' : isLoss ? 'text-red-600' : 'text-gray-900';
  const bgBoxClass = isProfit ? 'bg-green-50/60 border-green-100' : isLoss ? 'bg-red-50/60 border-red-100' : 'bg-gray-50 border-gray-100';

  return (
    <div className="h-full w-full max-w-md bg-white p-6 rounded-3xl shadow-2xl border-t-8 border-blue-600 text-gray-900 flex flex-col justify-start gap-5">
      
      <h1 className="text-xl font-black text-gray-900 text-center uppercase tracking-wider font-mono">
        📊 Trading Result Ledger
      </h1>

      <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Time Control</h2>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <label className="block text-xs text-gray-400 mb-1">Entry Time</label>
            <div className="flex gap-1">
              <input 
                type="text" 
                maxLength="5"
                placeholder="09:30" 
                value={startTime} 
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-lg px-2 py-1 text-center font-mono text-xs focus:outline-none focus:border-blue-500 text-gray-900"
              />
              <button onClick={() => setNowTime('start')} className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded text-xs font-mono text-gray-700 font-bold">NOW</button>
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Exit Time</label>
            <div className="flex gap-1">
              <input 
                type="text" 
                maxLength="5"
                placeholder="14:15" 
                value={endTime} 
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-lg px-2 py-1 text-center font-mono text-xs focus:outline-none focus:border-blue-500 text-gray-900"
              />
              <button onClick={() => setNowTime('end')} className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded text-xs font-mono text-gray-700 font-bold">NOW</button>
            </div>
          </div>
        </div>
        <div className="mt-3 pt-2 border-t border-gray-200 text-xs text-gray-500 font-mono flex justify-between">
          <span>Position Duration:</span>
          <span className="text-blue-600 font-bold">{duration} Mins</span>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-red-500 uppercase tracking-widest mb-1">Fee</label>
          <input 
            type="number" 
            placeholder="0.004499" 
            value={fee}
            onChange={(e) => setFee(e.target.value)}
            className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-3 font-mono text-base text-right focus:outline-none focus:border-blue-500 text-gray-900"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-green-600 uppercase tracking-widest mb-1">Margin</label>
          <input 
            type="number" 
            placeholder="215.39" 
            value={margin}
            onChange={(e) => setMargin(e.target.value)}
            className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-3 font-mono text-base text-right focus:outline-none focus:border-blue-500 text-gray-900"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">Final Balance</label>
          <input 
            type="number" 
            placeholder="215.59" 
            value={finalBalance}
            onChange={(e) => setFinalBalance(e.target.value)}
            className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-3 font-mono text-base text-right focus:outline-none focus:border-blue-500 text-gray-900"
          />
        </div>
      </div>

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

      <div className="p-4 bg-gray-50 text-gray-700 rounded-2xl border border-gray-100 text-center font-mono shadow-inner">
        <p className="text-[10px] font-black tracking-widest text-blue-600 uppercase mb-1">Ed Seykota's Principle</p>
        <p className="text-xs font-semibold leading-relaxed text-gray-600">
          "Systems don't anticipate the past or the future. <br />
          They just process current data."
        </p>
      </div>

      <div className="flex-grow"></div>

    </div>
  );
};

export default TradingLedger;