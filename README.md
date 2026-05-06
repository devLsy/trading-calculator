# Trading Calculator

트레이딩 포지션 진입 시 목표 수익률(TP)과 손절 비율(SL)을 실시간으로 계산하는 미니멀 웹 도구입니다.

## 🚀 Key Features
- **Real-time Calculation**: 진입가 입력 시 즉시 TP/SL 산출.
- **Flexible Ratio**: 0.8% 등 가변적인 목표 수치 설정 가능.
- **Minimal Design**: 불필요한 요소 제거, 본질에 집중한 UI.

## 🛠 Tech Stack
- React
- Vite
- Tailwind CSS (Optional)

## 💡 Philosophy
"Simple is the best."

## TroubleShooting
tailwindcss 환경설정 시 vite와의 설정 충돌 때문에 
``
npm install @tailwindcss/vite
``
명령어로 혹시 몰라 패키지 추가 설치

vite 설정 수정
``
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'  // 추가
// https://vite.dev/config/
export default defineConfig({
  // 아래도 tailwindcss() 추가
  plugins: [react(), tailwindcss()],
})
``
