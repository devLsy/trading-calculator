const CalculatorCard = ({ calc }) => {
  const { 
    entryPrice, setEntryPrice, profitRate, setProfitRate, 
    lossRate, setLossRate, position, setPosition, tpPrice, slPrice,
    selectedTicker, setSelectedTicker, coinPrice,
    targetRisk, setTargetRisk, entryQuantity
  } = calc;

  return (
    <div className="w-full max-w-md bg-white p-6 rounded-3xl shadow-2xl border-t-8 border-blue-600">
        <h1 className="text-xl font-black text-gray-900 mb-6 text-center uppercase tracking-wider">
          TP/SL Calculator 📈
        </h1>

        <div className="space-y-4">
          {/* 포지션 선택 버튼 */}
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

          {/* 입력 필드들 */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-500 ml-1">진입가 (Entry Price)</label>
            <input 
              type="number" 
              value={entryPrice}
              onChange={(e) => setEntryPrice(Number(e.target.value))}
              className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-blue-400 outline-none transition-all font-mono"
              placeholder="0.00000"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-500 ml-1 text-green-600">수익률 (%)</label>
              <input 
                type="number" 
                value={profitRate}
                onChange={(e) => setProfitRate(Number(e.target.value))}
                className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-green-400 outline-none transition-all font-mono"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-500 ml-1 text-red-600">손실률 (%)</label>
              <input 
                type="number" 
                value={lossRate}
                onChange={(e) => setLossRate(Number(e.target.value))}
                className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-red-400 outline-none transition-all font-mono"
              />
            </div>
          </div>

          {/* 결과 출력 */}
          <div className="p-6 bg-blue-50 rounded-2xl border-2 border-blue-100 space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-600">Take Profit (TP)</span>
              <span className="text-2xl font-black text-green-600 font-mono">{tpPrice.toFixed(5)}</span>
            </div>
            <div className="flex justify-between items-center border-t border-blue-100 pt-4">
              <span className="font-bold text-gray-600">Stop Loss (SL)</span>
              <span className="text-2xl font-black text-red-600 font-mono">{slPrice.toFixed(5)}</span>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t-2 border-dashed border-gray-200 space-y-4">
            <h3 className="text-sm font-black text-gray-800 uppercase tracking-wide">
              📊 물량 역산
            </h3>

            {/* 코인 선택 및 실시간 가격 레이아웃 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 ml-1">타겟 자산 (Ticker)</label>
                <select
                  value={selectedTicker}
                  onChange={(e) => setSelectedTicker(e.target.value)}
                  className="w-full p-3 bg-gray-50 border-2 border-gray-100 rounded-xl outline-none font-mono font-bold text-gray-700 cursor-pointer"
                >
                  <option value="BTCUSDT">BTCUSDT</option>
                  <option value="ETHUSDT">ETHUSDT</option>
                  <option value="ADAUSDT">ADAUSDT</option>
                  <option value="XRPUSDT">XRPUSDT</option>
                  <option value="DOGEUSDT">DOGEUSDT</option>
                  <option value="SOLUSDT">SOLUSDT</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 ml-1">실시간 가격 (API)</label>
                <div className="w-full p-3 bg-gray-100 border-2 border-gray-100 rounded-xl font-mono font-bold text-gray-800 text-center">
                  ${coinPrice > 0 ? coinPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 5 }) : 'Loading...'}
                </div>
              </div>
            </div>

            {/* 목표 기대 수익/손실 제어판 (0.05 ➔ 0.1 전환) */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-bold text-gray-500">목표 리스크 (기대 손익 금액)</label>
              </div>
              <input 
                type="number" 
                value={targetRisk}
                onChange={(e) => setTargetRisk(Number(e.target.value))}
                className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-purple-400 outline-none transition-all font-mono font-bold text-center text-purple-700"
                placeholder="1"
              />
            </div>

            {/* 최종 물량 계산 결과 출력 기지 */}
            <div className="p-4 bg-purple-50 rounded-2xl border-2 border-purple-100 text-center">
              <span className="block text-xs text-purple-600 font-bold uppercase tracking-wider mb-1">
                리스크 통제 기준 최적 진입 수량 (Qty)
              </span>
              <span className="text-3xl font-black text-purple-900 font-mono">
                {entryQuantity > 0 ? entryQuantity.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 }) : '0.0000'}
              </span>
            </div>
          </div>

        </div>
      </div>
  );
};

export default CalculatorCard;