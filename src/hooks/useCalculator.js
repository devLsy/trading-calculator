import { useState, useEffect } from 'react';

export const useCalculator = () => {
  // 1. 진입가 (Entry Price)
  const [entryPrice, setEntryPrice] = useState(0);
  // 2. 목표 수익률 (Profit Rate %): 0.8% 등 목표 수치
  const [profitRate, setProfitRate] = useState(1);
  // 3. 목표 손실률 (Loss Rate %): 0.8% 등 방어 수치
  const [lossRate, setLossRate] = useState(0);
  // 4. 포지션 방향 (Position): 'long' 또는 'short' 선택
  const [position, setPosition] = useState('long');
  // 5. TP 가격 (Take Profit): 계산 결과값을 담을 상태
  const [tpPrice, setTpPrice] = useState(0);
  // 6. SL 가격 (Stop Loss): 계산 결과값을 담을 상태
  const [slPrice, setSlPrice] = useState(0);

  // --- 💡 증액 프로세스 및 API용 추가 상태 자산 ---
  const [selectedTicker, setSelectedTicker] = useState('BTCUSDT'); // 선택된 코인
  const [coinPrice, setCoinPrice] = useState(0);                   // API 실시간 가격
  const [targetRisk, setTargetRisk] = useState(0);              // 표본 타겟 리스크(목표로 하는 손익률)
  const [entryQuantity, setEntryQuantity] = useState(0);           // 역산된 최종 진입 수량

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
    } else {
      setTpPrice(roundUp(entry * (1 - pRate), 6));
      setSlPrice(roundDown(entry * (1 + lRate), 6));
    }

    // 💡 수량 역산 세부 연산 (진입가와 손실률 기준)
    const risk = parseFloat(targetRisk);
    if (risk && entry && lRate) {
      // 공식: 목표 리스크 금액 / (진입가 * 손실률)
      const exactQty = risk / (entry * lRate);
      setEntryQuantity(roundDown(exactQty, 4)); // 수량은 안전하게 소수점 4자리 내림 정산
    } else {
      setEntryQuantity(0);
    }

  }, [entryPrice, profitRate, lossRate, position, targetRisk]);

  // 2. 💡 바이낸스 선물 Public API 실시간 데이터 연동 커널 (10초 주기)
  useEffect(() => {
    let isMounted = true;

    const fetchPrice = async () => {
      try {
        const response = await fetch(`https://fapi.binance.com/fapi/v1/ticker/price?symbol=${selectedTicker}`);
        const data = await response.json();
        if (isMounted && data.price) {
          setCoinPrice(parseFloat(data.price));
        }
      } catch (error) {
        console.error("바이낸스 API 단가 로드 실패:", error);
      }
    };

    fetchPrice();
    const priceInterval = setInterval(fetchPrice, 10000); // 10초마다 갱신

    return () => {
      isMounted = false;
      clearInterval(priceInterval);
    };
  }, [selectedTicker]);

  return {
    entryPrice, setEntryPrice,
    profitRate, setProfitRate,
    lossRate, setLossRate,
    position, setPosition,
    tpPrice, slPrice,
    selectedTicker, setSelectedTicker,
    coinPrice,
    targetRisk, setTargetRisk,
    entryQuantity
  };
};