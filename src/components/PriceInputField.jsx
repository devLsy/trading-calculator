// 재사용 가능한 입력 필드
export const PriceInputField = ({ label, value, onChange, focusColor = 'blue', labelColor = 'gray-500', placeholder }) => (
  <div className="space-y-2">
    <label className={`text-sm font-bold ml-1 text-${labelColor}`}>{label}</label>
    <input 
      type="number" 
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className={`w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-${focusColor}-400 outline-none transition-all font-mono`}
      placeholder={placeholder}
    />
  </div>
);