import { useState, useEffect } from 'react';

export const useLedger = () => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [duration, setDuration] = useState(0);

  const [fee, setFee] = useState('');
  const [margin, setMargin] = useState('');
  const [finalBalance, setFinalBalance] = useState('');

  const setNowTime = (type) => {
    const now = new Date();
    const timeString = now.toTimeString().split(' ')[0].substring(0, 5); 
    if (type === 'start') setStartTime(timeString);
    if (type === 'end') setEndTime(timeString);
  };

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

  return {
    startTime, setStartTime,
    endTime, setEndTime,
    duration,
    fee, setFee,
    margin, setMargin,
    finalBalance, setFinalBalance,
    setNowTime,
    netPnL,
    roe
  };
};