import { PositionSelector } from './PositionSelector';
import { PriceInputField } from './PriceInputField';
import { PriceOutputDisplay } from './PriceOutputDisplay';
import { PositionSizeCalculator } from './PositionSizeCalculator';

const CalculatorCard = ({ calc }) => {
  const { 
    entryPrice, setEntryPrice, profitRate, setProfitRate, 
    lossRate, setLossRate, position, setPosition, tpPrice, slPrice,
    selectedTicker, setSelectedTicker, coinPrice,
    targetRisk, setTargetRisk, entryQuantity
  } = calc;

  return (
    <div className="w-full max-w-md bg-white p-6 rounded-3xl shadow-2xl border-t-8 border-blue-600">
        {/* 타이틀 */}
        <h1 className="text-xl font-black text-gray-900 mb-6 text-center uppercase tracking-wider">
          TP/SL Calculator 📈
        </h1>

          {/* 포지션 선택 버튼 */}
          <PositionSelector 
            position={position} 
            setPosition={setPosition} 
          />

          {/* 진입 가격 입력 필드 */}
          <PriceInputField 
            label="Entry Price" 
            value={entryPrice} 
            onChange={setEntryPrice} 
            placeholder="0.00000" 
          />

          {/* 익절/손절 비율 입력 필드 조립 (공통 컴포넌트 재사용) */}
          {/* <div className="grid grid-cols-2 gap-4"> */}
          <PriceInputField 
            label="Profit(%)" 
            value={profitRate} 
            onChange={setProfitRate} 
            focusColor="green" 
            labelColor="green-600" 
          />
          <PriceInputField 
            label="Loss(%)" 
            value={lossRate} 
            onChange={setLossRate} 
            focusColor="red" 
            labelColor="red-600" 
          />
          {/* </div> */}

          {/* 목표가(TP/SL) 결과 */}
          <PriceOutputDisplay 
          tpPrice={tpPrice} 
          slPrice={slPrice} 
        />

        {/* 최종 물량 및 리스크 계산기 */}
        <PositionSizeCalculator 
          selectedTicker={selectedTicker}
          setSelectedTicker={setSelectedTicker}
          coinPrice={coinPrice}
          targetRisk={targetRisk}
          setTargetRisk={setTargetRisk}
          entryQuantity={entryQuantity}
        />          
    </div>
  );
};

export default CalculatorCard;