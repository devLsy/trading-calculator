import { useState, useEffect } from 'react';

export const useCalculator = () => {
  // 1. 진입가 (Entry Price)
  const [entryPrice, setEntryPrice] = useState(0);
  // 2. 목표 수익률 (Profit Rate %): 0.8% 등 목표 수치
  const [profitRate, setProfitRate] = useState(0.8);
  // 3. 목표 손실률 (Loss Rate %): 0.8% 등 방어 수치
  const [lossRate, setLossRate] = useState(0.8);
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
    } else {
      setTpPrice(roundUp(entry * (1 - pRate), 6));
      setSlPrice(roundDown(entry * (1 + lRate), 6));
    }
  }, [entryPrice, profitRate, lossRate, position]);

  return {
    entryPrice, setEntryPrice,
    profitRate, setProfitRate,
    lossRate, setLossRate,
    position, setPosition,
    tpPrice, slPrice
  };
};