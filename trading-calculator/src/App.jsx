import { useEffect, useRef, useState } from 'react';

function App() {
  // 1. 진입가 (Entry Price)
  const [entryPrice, setEntryPrice] = useState(0);
  // 2. 목표 수익률 (Profit Rate %): 0.8% 등 목표 수치
  const [profitRate, setProfitRate] = useState(0);
  // 3. 목표 손실률 (Loss Rate %): 0.8% 등 방어 수치
  const [lossRate, setLossRate] = useState(0);
  // 4. 포지션 방향 (Position): 'long' 또는 'short' 선택
  const [position, setPosition] = useState('long');
  // 5. TP 가격 (Take Profit): 계산 결과값을 담을 상태
  const [tpPrice, setTpPrice] = useState(0);
  // 6. SL 가격 (Stop Loss): 계산 결과값을 담을 상태
  const [slPrice, setSlPrice] = useState(0);

  useEffect(() => {
    if (!entryPrice || !profitRate || !lossRate || !position) return;
    
    const entry = parseFloat(entryPrice);
    const pRate = parseFloat(profitRate) / 100;
    const lRate = parseFloat(lossRate) / 100;

    // 소수점 6자리 올림 처리
    const roundUp = (num, precision) => {
      const factor = Math.pow(10, precision);
      return Math.ceil(num * factor) / factor;
    };
    // 소수점 6자리 내림 처리
    const roundDown = (num, precision) => {
      const factor = Math.pow(10, precision);
      return Math.floor(num * factor) / factor;
    };

    if (position === 'long') {
        // 롱: TP는 진입가 위로 올림, SL은 진입가 아래로 내림
        setTpPrice(roundUp(entry * (1 + pRate), 6));
        setSlPrice(roundDown(entry * (1 - lRate), 6));
    } else if (position === 'short') {
      // 숏: TP는 진입가 아래로 내림, SL은 진입가 위로 올림
      setTpPrice(roundUp(entry * (1 - pRate), 6));
      setSlPrice(roundDown(entry * (1 + lRate), 6));
    }
  }, [entryPrice, profitRate, lossRate, position]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
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
                className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-green-400 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-500 ml-1 text-red-600">손실률 (%)</label>
              <input 
                type="number" 
                value={lossRate}
                onChange={(e) => setLossRate(Number(e.target.value))}
                className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-red-400 outline-none transition-all"
              />
            </div>
          </div>

          {/* 결과 출력 */}
          <div className="mt-8 p-6 bg-blue-50 rounded-2xl border-2 border-blue-100 space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-600">Take Profit (TP)</span>
              <span className="text-2xl font-black text-green-600 font-mono">{tpPrice.toFixed(5)}</span>
            </div>
            <div className="flex justify-between items-center border-t border-blue-100 pt-4">
              <span className="font-bold text-gray-600">Stop Loss (SL)</span>
              <span className="text-2xl font-black text-red-600 font-mono">{slPrice.toFixed(5)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 

export default App
