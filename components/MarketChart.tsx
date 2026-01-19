import React, { useState, useEffect, useCallback } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowRightLeft, TrendingUp, Maximize2, Minimize2, Activity } from 'lucide-react';

interface CandleData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  range: [number, number];
}

const tokens = ['BTC', 'ETH', 'SOL', 'AVAX', 'BNB'];
const quotes = ['USD', 'BTC', 'ETH'];

// Custom Shape for Candlestick
const Candlestick = (props: any) => {
  const { x, y, width, height, payload } = props;
  const { open, close, high, low } = payload;
  
  const isUp = close >= open;
  const color = isUp ? '#10b981' : '#f43f5e'; // Emerald-500 : Rose-500
  
  // y represents the top pixel (high value)
  // height represents the pixel height of the range (high - low)
  
  const range = high - low;
  const ratio = range === 0 ? 0 : height / range;
  
  const bodyTop = y + (high - Math.max(open, close)) * ratio;
  const bodyHeight = Math.abs(open - close) * ratio;
  
  return (
    <g>
      {/* Wick */}
      <line 
        x1={x + width / 2} 
        y1={y} 
        x2={x + width / 2} 
        y2={y + height} 
        stroke={color} 
        strokeWidth={1.5} 
      />
      {/* Body */}
      <rect 
        x={x + 1} 
        y={bodyTop} 
        width={Math.max(1, width - 2)} 
        height={Math.max(1, bodyHeight)} 
        fill={color} 
      />
    </g>
  );
};

const MarketChart: React.FC = () => {
  const [baseToken, setBaseToken] = useState('BTC');
  const [quoteToken, setQuoteToken] = useState('USD');
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [data, setData] = useState<CandleData[]>([]);

  // Function to generate initial historical data
  const generateInitialData = useCallback((base: string, quote: string) => {
    const res: CandleData[] = [];
    // Simulation base price
    let price = base === 'BTC' ? 65000 : base === 'ETH' ? 3400 : base === 'SOL' ? 145 : base === 'AVAX' ? 35 : 600;
    
    // Adjust for quote
    if (quote === 'BTC' && base !== 'BTC') price /= 65000;
    if (quote === 'ETH' && base !== 'ETH') price /= 3400;
    
    // Seed randomization
    price = price * (1 + (Math.random() * 0.1 - 0.05));

    const now = new Date();
    // Generate 45 candles
    for (let i = 45; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      const volatility = 0.03;
      const change = 1 + (Math.random() * volatility - volatility / 2);
      const close = price * change;
      const open = price;
      // Ensure high/low contain open/close
      const high = Math.max(open, close) * (1 + Math.random() * 0.015);
      const low = Math.min(open, close) * (1 - Math.random() * 0.015);
      
      res.push({
        time: date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
        open, high, low, close,
        range: [low, high]
      });
      price = close;
    }
    return res;
  }, []);

  // Initialize data on token change
  useEffect(() => {
    setData(generateInitialData(baseToken, quoteToken));
  }, [baseToken, quoteToken, generateInitialData]);

  // Real-time data simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setData(currentData => {
        if (currentData.length === 0) return currentData;

        const newData = [...currentData];
        const lastCandle = { ...newData[newData.length - 1] };
        
        // Simulate live market movement
        const volatility = 0.005; // 0.5% volatility per tick
        const movement = 1 + (Math.random() * volatility - volatility / 2);
        
        const newPrice = lastCandle.close * movement;
        
        // Update candle stats
        lastCandle.close = newPrice;
        lastCandle.high = Math.max(lastCandle.high, newPrice);
        lastCandle.low = Math.min(lastCandle.low, newPrice);
        lastCandle.range = [lastCandle.low, lastCandle.high];
        
        newData[newData.length - 1] = lastCandle;
        return newData;
      });
    }, 1000); // Updates every second

    return () => clearInterval(interval);
  }, []);

  const currentPrice = data.length > 0 ? data[data.length - 1].close : 0;
  const prevPrice = data.length > 1 ? data[data.length - 2].close : 0;
  const change = prevPrice !== 0 ? ((currentPrice - prevPrice) / prevPrice) * 100 : 0;
  const isPositive = change >= 0;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      return (
        <div className="bg-slate-900 border border-slate-700 p-3 rounded-lg shadow-xl text-xs">
          <p className="text-slate-400 mb-1">{label}</p>
          <div className="space-y-1">
            <p className="flex justify-between gap-4"><span className="text-slate-500">High:</span> <span className="text-slate-200 font-mono">{d.high.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span></p>
            <p className="flex justify-between gap-4"><span className="text-slate-500">Open:</span> <span className={d.close >= d.open ? "text-emerald-400 font-mono" : "text-rose-400 font-mono"}>{d.open.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span></p>
            <p className="flex justify-between gap-4"><span className="text-slate-500">Close:</span> <span className={d.close >= d.open ? "text-emerald-400 font-mono" : "text-rose-400 font-mono"}>{d.close.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span></p>
            <p className="flex justify-between gap-4"><span className="text-slate-500">Low:</span> <span className="text-slate-200 font-mono">{d.low.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span></p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`
      ${isFullScreen 
        ? 'fixed inset-0 z-50 bg-slate-900 p-8' 
        : 'bg-slate-800/50 backdrop-blur-md border border-slate-700/50 p-6 rounded-2xl h-full'} 
      flex flex-col transition-all duration-300 animate-fade-in relative
    `}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <TrendingUp size={18} className="text-indigo-400" />
              Mercado
            </h3>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs text-emerald-500 font-medium">AO VIVO</span>
          </div>
          <p className="text-slate-400 text-sm font-medium mt-1">
            {baseToken}/{quoteToken}
            <span className={`ml-2 text-sm ${isPositive ? 'text-emerald-400' : 'text-rose-400'} transition-colors duration-300`}>
              {currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
              <span className="ml-1 text-xs">({isPositive ? '+' : ''}{change.toFixed(2)}%)</span>
            </span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-900/80 p-1 rounded-xl border border-slate-700/50">
            <div className="relative">
              <select 
                value={baseToken}
                onChange={(e) => setBaseToken(e.target.value)}
                className="appearance-none bg-transparent text-white text-xs font-bold pl-3 pr-8 py-2 rounded-lg cursor-pointer hover:bg-slate-800 transition-colors focus:outline-none"
              >
                {tokens.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            
            <div className="text-slate-600">
              <ArrowRightLeft size={14} />
            </div>
            
            <div className="relative">
              <select 
                value={quoteToken}
                onChange={(e) => setQuoteToken(e.target.value)}
                className="appearance-none bg-transparent text-white text-xs font-bold pl-3 pr-8 py-2 rounded-lg cursor-pointer hover:bg-slate-800 transition-colors focus:outline-none"
              >
                {quotes.filter(q => q !== baseToken).map(q => <option key={q} value={q}>{q}</option>)}
              </select>
            </div>
          </div>

          <button 
            onClick={() => setIsFullScreen(!isFullScreen)}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg transition-colors border border-slate-700/50"
            title={isFullScreen ? "Sair da tela cheia" : "Tela cheia"}
          >
            {isFullScreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
        </div>
      </div>

      <div className="flex-1 w-full min-h-[300px]">
        {data.length > 0 && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.3} />
              <XAxis 
                dataKey="time" 
                stroke="#64748b" 
                tickLine={false} 
                axisLine={false} 
                tick={{ fontSize: 10, fill: '#64748b' }} 
                minTickGap={30}
              />
              <YAxis 
                stroke="#64748b" 
                tickLine={false} 
                axisLine={false} 
                domain={['auto', 'auto']}
                tickFormatter={(val) => val >= 1000 ? `${(val/1000).toFixed(1)}k` : val.toFixed(2)}
                tick={{ fontSize: 10, fill: '#64748b' }} 
                width={40}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#334155', opacity: 0.1 }} />
              <Bar 
                dataKey="range" 
                shape={<Candlestick />} 
                isAnimationActive={false}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default MarketChart;