// ③ 타겟 가격(TP/SL) 출력판
export const PriceOutputDisplay = ({ tpPrice, slPrice }) => (
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
);