import React, { useState, useEffect } from 'react';
import TimeControl from './TimeControl';
import LedgerInput from './LedgerInput';
import LedgerResult from './LedgerResult';

const TradingLedger = () => {
  // 1. 시간 관리 상태
  const [startTime, setStartTime] = useState('');   // 시작 시간
  const [endTime, setEndTime] = useState('');       // 종료 시간  
  const [duration, setDuration] = useState(0);      // 포지션 지속 시간 (분 단위)

  // 2. 거래 결과 입력 상태
  const [fee, setFee] = useState('');                     // 수수료 입력
  const [margin, setMargin] = useState('');               // 증거금 입력
  const [finalBalance, setFinalBalance] = useState('');   // 최종 잔액 입력

  // 현재 시간 자동 입력 함수
  const setNowTime = (type) => {
    const now = new Date();
    const timeString = now.toTimeString().split(' ')[0].substring(0, 5); 
    if (type === 'start') setStartTime(timeString);
    if (type === 'end') setEndTime(timeString);
  };

  // 시간 계산 로직 (시작과 종료 시간으로 지속 시간 계산)
  useEffect(() => {
    let startRaw = startTime.replace(':', '');
    let endRaw = endTime.replace(':', '');

    if (startRaw.length === 4 && endRaw.length === 4) {
      const startH = parseInt(startRaw.substring(0, 2), 10);
      const startM = parseInt(startRaw.substring(2, 4), 10);
      const endH = parseInt(endRaw.substring(0, 2), 10);
      const endM = parseInt(endRaw.substring(2, 4), 10);

      if (startH < 24 && startM < 60 && endH < 24 && endM < 60) {
        let diffMins = (endH * 60 + endM) - (startH * 60 + startM);
        if (diffMins < 0) diffMins += 24 * 60; 
        setDuration(diffMins);
      }
    }
  }, [startTime, endTime]);

  const numFee = parseFloat(fee) || 0;
  const numMargin = parseFloat(margin) || 0;
  const numFinalBalance = parseFloat(finalBalance) || 0;

  const netPnL = (numMargin > 0 || numFinalBalance > 0) 
    ? (numFinalBalance - numMargin) - numFee 
    : 0;

  const roe = numMargin > 0 ? (netPnL / numMargin) * 100 : 0;

  const isProfit = netPnL > 0;
  const isLoss = netPnL < 0;
  const textColorClass = isProfit ? 'text-green-600' : isLoss ? 'text-red-600' : 'text-gray-900';
  const bgBoxClass = isProfit ? 'bg-green-50/60 border-green-100' : isLoss ? 'bg-red-50/60 border-red-100' : 'bg-gray-50 border-gray-100';

  return (
    <div className="h-full w-full max-w-md bg-white p-6 rounded-3xl shadow-2xl border-t-8 border-blue-600 text-gray-900 flex flex-col justify-start gap-5">
      
      <h1 className="text-xl font-black text-gray-900 text-center uppercase tracking-wider font-mono">
        📊 Trading Result Ledger
      </h1>

      <TimeControl 
        startTime={startTime}
        setStartTime={setStartTime}
        endTime={endTime}
        setEndTime={setEndTime}
        duration={duration}
        setNowTime={setNowTime}
      />

      <div className="space-y-4">
        <LedgerInput label="Fee" colorClass="text-red-500" placeholder="0.004499" value={fee} onChange={setFee} />
        <LedgerInput label="Margin" colorClass="text-green-600" placeholder="215.39" value={margin} onChange={setMargin} />
        <LedgerInput label="Final Balance" colorClass="text-blue-600" placeholder="215.59" value={finalBalance} onChange={setFinalBalance} />
      </div>

      <LedgerResult netPnL={netPnL} roe={roe} />

      <div className="p-4 bg-gray-50 text-gray-700 rounded-2xl border border-gray-100 text-center font-mono shadow-inner">
        <p className="text-[10px] font-black tracking-widest text-blue-600 uppercase mb-1">Ed Seykota's Principle</p>
        <p className="text-xs font-semibold leading-relaxed text-gray-600">
          "Systems don't anticipate the past or the future. <br />
          They just process current data."
        </p>
      </div>

      <div className="flex-grow"></div>
    </div>
  );
};

export default TradingLedger;