import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Activity, DollarSign, Maximize2, Minimize2, Globe } from 'lucide-react';
import MarketChart from './MarketChart';

const initialChartData = [
  { name: 'Jan', value: 4000 },
  { name: 'Fev', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Abr', value: 4500 },
  { name: 'Mai', value: 6800 },
  { name: 'Jun', value: 8500 },
  { name: 'Jul', value: 11000 },
];

interface Transaction {
  id: number;
  desc: string;
  time: string;
  amount: string;
  value: string;
  location: string;
}

const StatCard: React.FC<{ title: string; value: string; change: string; isPositive: boolean; icon: React.ElementType }> = ({ title, value, change, isPositive, icon: Icon }) => (
  <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700/50 p-6 rounded-2xl">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-lg ${isPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
        <Icon size={24} />
      </div>
      <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
        {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
        {change}
      </div>
    </div>
    <h3 className="text-slate-400 text-sm font-medium">{title}</h3>
    <p className="text-2xl font-bold text-slate-100 mt-1">{value}</p>
  </div>
);

const Dashboard: React.FC = () => {
  const [isPortfolioFullScreen, setIsPortfolioFullScreen] = useState(false);
  const [chartData, setChartData] = useState(initialChartData);
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, desc: "Swap ETH para USDC", time: "Agora", amount: "- 0.5 ETH", value: "+ 1,800 USDC", location: "Nova York, EUA" },
    { id: 2, desc: "Mint NFT Collection", time: "2 min atrás", amount: "- 0.05 ETH", value: "Rare Item", location: "Londres, UK" },
    { id: 3, desc: "Liquidez Adicionada", time: "5 min atrás", amount: "5000 UNI", value: "$25,000", location: "Tóquio, JP" },
  ]);

  // Simulate real-time portfolio value changes
  useEffect(() => {
    const interval = setInterval(() => {
      setChartData(prev => {
        const newData = [...prev];
        const lastItem = { ...newData[newData.length - 1] };
        
        // Random slight fluctuation to simulate real-time value
        const fluctuation = 1 + (Math.random() * 0.02 - 0.01);
        lastItem.value = Math.max(0, lastItem.value * fluctuation);
        
        newData[newData.length - 1] = lastItem;
        return newData;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Simulate incoming global transactions
  useEffect(() => {
    const interval = setInterval(() => {
      const locations = ["Singapura", "Berlim, DE", "São Paulo, BR", "Seoul, KR", "Paris, FR", "Dubai, UAE"];
      const actions = ["Compra de BTC", "Venda de SOL", "Staking ETH", "Yield Farming", "Transferência"];
      
      const newTx: Transaction = {
        id: Date.now(),
        desc: actions[Math.floor(Math.random() * actions.length)],
        time: "Agora",
        amount: "---",
        value: `$${(Math.random() * 5000 + 100).toFixed(2)}`,
        location: locations[Math.floor(Math.random() * locations.length)]
      };

      setTransactions(prev => [newTx, ...prev].slice(0, 5));
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white">Visão Geral</h2>
          <p className="text-slate-400 mt-1">Bem-vindo de volta, 0x123...456</p>
        </div>
        <div className="bg-indigo-600/20 text-indigo-400 px-4 py-2 rounded-full text-sm border border-indigo-600/30 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></div>
          Mainnet Conectada
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Saldo Total" value="$42,593.00" change="+12.5%" isPositive={true} icon={DollarSign} />
        <StatCard title="Rendimento (APY)" value="8.2%" change="+1.2%" isPositive={true} icon={Activity} />
        <StatCard title="Perda Impermanente" value="$124.50" change="-0.8%" isPositive={false} icon={TrendingDown} />
        <StatCard title="Valor em NFTs" value="4.5 ETH" change="+5.4%" isPositive={true} icon={TrendingUp} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className={`
          ${isPortfolioFullScreen 
            ? 'fixed inset-0 z-[100] bg-slate-900 p-8 flex flex-col' 
            : 'xl:col-span-2 bg-slate-800/50 backdrop-blur-md border border-slate-700/50 p-6 rounded-2xl h-[400px] flex flex-col relative transition-all duration-300'}
        `}>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-white">Desempenho da Carteira</h3>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
            </div>
            <button 
              onClick={() => setIsPortfolioFullScreen(!isPortfolioFullScreen)}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg transition-colors border border-slate-700/50"
              title={isPortfolioFullScreen ? "Sair da tela cheia" : "Tela cheia"}
            >
              {isPortfolioFullScreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            </button>
          </div>
          
          <div className="flex-1 w-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '0.5rem', color: '#f8fafc' }}
                  itemStyle={{ color: '#818cf8' }}
                  formatter={(value: number) => [`$${value.toFixed(2)}`, 'Valor']}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#6366f1" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="h-[400px]">
          <MarketChart />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700/50 p-6 rounded-2xl">
          <div className="flex justify-between items-center mb-4">
             <h3 className="text-xl font-bold text-white">Transações Globais</h3>
             <div className="flex items-center gap-2 text-xs text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded-full">
               <Globe size={12} />
               <span>Tempo Real</span>
             </div>
          </div>
          <div className="space-y-4">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-3 hover:bg-slate-700/30 rounded-lg transition-colors cursor-pointer animate-fade-in-down">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-slate-300">
                    <Activity size={20} />
                  </div>
                  <div>
                    <p className="text-white font-medium">{tx.desc}</p>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      {tx.time} • {tx.location}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold">{tx.amount}</p>
                  <p className="text-emerald-400 text-sm font-medium">{tx.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

         <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 backdrop-blur-md border border-indigo-500/20 p-6 rounded-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-xl font-bold text-white mb-2">Nexus AI Advisor</h3>
            <p className="text-indigo-200 mb-4">Obtenha insights personalizados sobre seu portfólio.</p>
            <button className="bg-white text-indigo-900 px-6 py-2 rounded-lg font-bold hover:bg-indigo-50 transition-colors">
              Conversar Agora
            </button>
          </div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-500 rounded-full blur-3xl opacity-30"></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;