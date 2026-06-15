// 포지션 사이즈 계산기 섹션
export const PositionSizeCalculator = ({ selectedTicker, setSelectedTicker, coinPrice, targetRisk, setTargetRisk, entryQuantity }) => (
  <div className="mt-6 pt-6 border-t-2 border-dashed border-gray-200 space-y-4">
    <h3 className="text-sm font-black text-gray-800 uppercase tracking-wide">Position Size</h3>

    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="text-xs font-bold text-gray-500 ml-1">Ticker</label>
        <select
          value={selectedTicker}
          onChange={(e) => setSelectedTicker(e.target.value)}
          className="w-full p-3 bg-gray-50 border-2 border-gray-100 rounded-xl outline-none font-mono font-bold text-gray-700 cursor-pointer"
        >
          <option value="BTCUSDT">BTCUSDT</option>
          <option value="ETHUSDT">ETHUSDT</option>
          <option value="ADAUSDT">ADAUSDT</option>
          <option value="DOGEUSDT">DOGEUSDT</option>
          <option value="XRPUSDT">XRPUSDT</option>
          <option value="SOLUSDT">SOLUSDT</option>
        </select>
      </div>
      <div className="space-y-2">
        <label className="text-xs font-bold text-gray-500 ml-1">Live Price</label>
        <div className="w-full p-3 bg-gray-100 border-2 border-gray-100 rounded-xl font-mono font-bold text-gray-800 text-center">
          ${coinPrice > 0 ? coinPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 5 }) : 'Loading...'}
        </div>
      </div>
    </div>

    <div className="space-y-2">
      <label className="text-xs font-bold text-gray-500 ml-1">Risk Amount</label>
      <input 
        type="number"   
        value={targetRisk}
        onChange={(e) => setTargetRisk(Number(e.target.value))}
        className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-purple-400 outline-none transition-all font-mono font-bold text-center text-purple-700"
        placeholder="1"
      />
    </div>

    <div className="p-4 bg-purple-50 rounded-2xl border-2 border-purple-100 text-center">
      <span className="block text-xs text-purple-600 font-bold uppercase tracking-wider mb-1">Order Qty</span>
      <span className="text-3xl font-black text-purple-900 font-mono">
        {entryQuantity > 0 ? entryQuantity.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 }) : '0'}
      </span>
    </div>
  </div>
);