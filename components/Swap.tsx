import React, { useState } from 'react';
import { ArrowDownUp, Settings, Info, Loader2, ChevronDown } from 'lucide-react';

const Swap: React.FC = () => {
  const [fromAmount, setFromAmount] = useState<string>('1.0');
  const [toAmount, setToAmount] = useState<string>('3200.50');
  const [isSwapping, setIsSwapping] = useState(false);

  const handleSwap = () => {
    setIsSwapping(true);
    setTimeout(() => {
      setIsSwapping(false);
      // Reset or show success toast in real app
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] animate-fade-in">
      <div className="w-full max-w-md">
        <div className="flex justify-between items-center mb-4 px-2">
          <h2 className="text-2xl font-bold text-white">Trocar</h2>
          <button className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-800 rounded-full">
            <Settings size={20} />
          </button>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700/50 p-4 rounded-3xl shadow-xl space-y-2">
          {/* From Input */}
          <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-700/50 hover:border-slate-600 transition-colors">
            <div className="flex justify-between mb-2">
              <span className="text-slate-400 text-sm">Vender</span>
              <span className="text-slate-400 text-sm">Saldo: 4.5 ETH</span>
            </div>
            <div className="flex justify-between items-center">
              <input 
                type="number" 
                value={fromAmount}
                onChange={(e) => setFromAmount(e.target.value)}
                className="bg-transparent text-3xl font-bold text-white focus:outline-none w-2/3 placeholder-slate-600"
                placeholder="0.0"
              />
              <button className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 rounded-full font-bold transition-colors">
                <img src="https://cryptologos.cc/logos/ethereum-eth-logo.png?v=026" className="w-6 h-6" alt="ETH" />
                ETH
                <ChevronDown size={16} />
              </button>
            </div>
            <p className="text-slate-500 text-sm mt-2">$3,200.50</p>
          </div>

          {/* Switch Button */}
          <div className="relative h-4 flex items-center justify-center">
            <button className="absolute bg-slate-800 border-4 border-slate-900 p-2 rounded-xl text-indigo-400 hover:text-indigo-300 hover:scale-110 transition-all z-10">
              <ArrowDownUp size={16} />
            </button>
          </div>

          {/* To Input */}
          <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-700/50 hover:border-slate-600 transition-colors">
             <div className="flex justify-between mb-2">
              <span className="text-slate-400 text-sm">Comprar</span>
              <span className="text-slate-400 text-sm">Saldo: 5,430.00 USDC</span>
            </div>
            <div className="flex justify-between items-center">
              <input 
                type="number" 
                value={toAmount}
                readOnly
                className="bg-transparent text-3xl font-bold text-white focus:outline-none w-2/3 placeholder-slate-600"
                placeholder="0.0"
              />
              <button className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 rounded-full font-bold transition-colors">
                <img src="https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=026" className="w-6 h-6" alt="USDC" />
                USDC
                <ChevronDown size={16} />
              </button>
            </div>
            <p className="text-slate-500 text-sm mt-2">≈ $3,200.50 (-0.05%)</p>
          </div>

          {/* Info Accordion */}
          <div className="bg-slate-800/50 rounded-xl p-3 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400 flex items-center gap-1">Taxa <Info size={12}/></span>
              <span className="text-slate-200">1 ETH = 3,200.50 USDC</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Taxa de Rede</span>
              <span className="text-slate-200 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                $4.50
              </span>
            </div>
          </div>

          {/* Swap Button */}
          <button 
            onClick={handleSwap}
            disabled={isSwapping}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-2xl text-lg shadow-lg shadow-indigo-600/20 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSwapping ? (
              <>
                <Loader2 className="animate-spin" />
                Processando...
              </>
            ) : (
              'Realizar Troca'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Swap;