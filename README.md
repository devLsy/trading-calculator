# Trading Calculator

트레이딩 포지션 진입 시 목표 수익률(TP)과 손절 비율(SL)을 실시간으로 계산하는 미니멀 웹 도구입니다.

* **배포 URL**: [https://trading-calculator-20e5c.web.app/)
  > 💡 **Tip**: `Ctrl + 클릭`을 하시면 새 창에서 편하게 열어보실 수 있습니다.

## 🚀 Key Features
- **Real-time Calculation**: 진입가 입력 시 즉시 TP/SL 산출.
- **Conservative Logic**: 수익은 올림(RoundUp), 손실은 내림(RoundDown) 처리하여 시드 보호.
- **Flexible Ratio**: 0.8% 등 정밀한 소수점 단위 목표 수치 설정 가능.
- **Minimal Design**: Tailwind CSS 기반의 직관적이고 본질에 집중한 UI.

## 📸 Screenshots
![Initial UI](https://github.com/user-attachments/assets/cfbb1d90-0edd-40c4-9b04-f2dce5173fd0)

## 🛠 Tech Stack
- **Framework**: React (Vite)
- **Styling**: Tailwind CSS v4
- **Architecture**: Custom Hooks (`useCalculator`) 기반 로직 분리

## 💡 Philosophy
"Simple is the best."

---

## 🛠 Troubleshooting

### Tailwind CSS v4 환경 설정 이슈
Vite 환경에서 Tailwind CSS가 정상적으로 렌더링되지 않는 경우, 최신 v4 규격에 맞게 플러그인을 설치하고 설정을 수정해야 합니다.

**1. 패키지 추가 설치**
```bash
npm install @tailwindcss/vite
```

**2. vite.config.js 수정**
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
})
```

**3. index.css 수정**
```css
@import "tailwindcss";
```
## 📦 Deployment

수정된 소스코드를 실제 웹 서비스에 반영하기 위한 절차입니다. 빌드(`dist` 폴더 생성) 후 배포 순서를 반드시 지켜야 합니다.

**최신 소스 빌드 (Build) 및 배포**
리액트 코드를 브라우저가 읽을 수 있는 정적 파일로 변환하여 `dist` 폴더에 생성합니다.
```bash
npm run build && firebase deploy
```
