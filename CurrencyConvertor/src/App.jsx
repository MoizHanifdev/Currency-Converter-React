import { useState } from 'react'
import './App.css'
import InputBox from './Components/InputBox'
import useCurrenyInfo from './Hooks/useCurrencyInfo'

function App() {
  const [Amount, setAmount] = useState("");
  const [From, setFrom] = useState("usd")
  const [To, setTo] = useState("inr")
  const [ConvertedAmount, setConvertedAmount] = useState(0)

  const currencyInfo = useCurrenyInfo(From)

  const options = Object.keys(currencyInfo)

  const swap = ()=>{
    setFrom(To);
    setTo(From);
    setConvertedAmount(Amount)
    setAmount(ConvertedAmount)
  }

  const convert = ()=>{
    setConvertedAmount(Amount * currencyInfo[To])
  }

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundColor: `blue`,
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={Amount}
                currencyOptions={options}
                onCurrencyChange={()=>setAmount(Amount)}
                selectCurrency={From}
                onAmountChange={(amount)=>setAmount(amount)} 
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swap}
              >
                swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={ConvertedAmount}
                currencyOptions={options}
                onCurrencyChange={(currency)=>setTo(currency)}
                selectCurrency={To}
                
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
              Convert {From.toUpperCase()} to {To.toUpperCase()} 
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App
