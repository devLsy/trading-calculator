import React from 'react';

const TimeControl = ({ startTime, setStartTime, endTime, setEndTime, duration, setNowTime }) => {
  return (
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
  );
};

export default TimeControl;