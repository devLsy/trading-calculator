import { useEffect, useRef, useState } from 'react';

function App() {
  const [count, setCount] = useState(0)

  return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl border-4 border-blue-500">
        <h1 className="text-2xl font-bold text-gray-800">
          Tailwind Test 🚀
        </h1>
        <p className="text-blue-600 mt-2">
          이 박스가 보이고 파란색 테두리가 있다면 팩트상 성공입니다.
        </p>
      </div>
    </div>  
  )
}

export default App
