import React from 'react';
import TimeControl from './TimeControl';
import LedgerInput from './LedgerInput';
import LedgerResult from './LedgerResult';

const TradingLedger = ({ ledger }) => {
  const {
    startTime, setStartTime,
    endTime, setEndTime,
    duration,
    fee, setFee,
    margin, setMargin,
    finalBalance, setFinalBalance,
    setNowTime,
    netPnL,
    roe
  } = ledger;

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