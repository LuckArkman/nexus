import React from 'react';
import { ArrowUpRight, ArrowDownLeft, CreditCard, MoreHorizontal, TrendingUp, TrendingDown, Copy, Check } from 'lucide-react';
import { Asset } from '../types';

const assets: Asset[] = [
  { symbol: 'ETH', name: 'Ethereum', balance: 4.5, price: 3200.50, change24h: 2.5, value: 14402.25, icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=026' },
  { symbol: 'BTC', name: 'Bitcoin', balance: 0.15, price: 64500.00, change24h: -1.2, value: 9675.00, icon: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=026' },
  { symbol: 'SOL', name: 'Solana', balance: 145.0, price: 148.20, change24h: 5.8, value: 21489.00, icon: 'https://cryptologos.cc/logos/solana-sol-logo.png?v=026' },
  { symbol: 'USDC', name: 'USD Coin', balance: 5430.0, price: 1.00, change24h: 0.01, value: 5430.00, icon: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=026' },
];

const ActionButton: React.FC<{ icon: React.ElementType, label: string, primary?: boolean }> = ({ icon: Icon, label, primary }) => (
  <button className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl w-full transition-all ${
    primary 
    ? 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-600/20' 
    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
  }`}>
    <Icon size={24} />
    <span className="text-sm font-medium">{label}</span>
  </button>
);

const Wallet: React.FC = () => {
  const [copied, setCopied] = React.useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText("0x71C...9A2");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const totalBalance = assets.reduce((acc, asset) => acc + asset.value, 0);

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      {/* Portfolio Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700/50 p-8 rounded-3xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
           <CreditCard size={120} />
        </div>
        
        <div className="relative z-10">
          <p className="text-slate-400 mb-2">Saldo Total Estimado</p>
          <h1 className="text-5xl font-bold text-white mb-6">
            ${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h1>

          <div className="flex items-center gap-4 mb-8">
            <div className="bg-slate-700/50 px-4 py-2 rounded-full border border-slate-600 flex items-center gap-3">
              <span className="text-slate-300 font-mono">0x71C...9A2</span>
              <button onClick={copyAddress} className="text-slate-400 hover:text-white transition-colors">
                {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
              </button>
            </div>
            <div className="text-emerald-400 text-sm font-medium bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              +4.5% este mês
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 max-w-lg">
            <ActionButton icon={ArrowDownLeft} label="Receber" primary />
            <ActionButton icon={ArrowUpRight} label="Enviar" />
            <ActionButton icon={CreditCard} label="Comprar" />
            <ActionButton icon={MoreHorizontal} label="Mais" />
          </div>
        </div>
      </div>

      {/* Asset List */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4">Seus Ativos</h3>
        <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700/50 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-800/80 border-b border-slate-700">
              <tr>
                <th className="text-left p-4 text-slate-400 font-medium">Ativo</th>
                <th className="text-right p-4 text-slate-400 font-medium">Preço</th>
                <th className="text-right p-4 text-slate-400 font-medium">Saldo</th>
                <th className="text-right p-4 text-slate-400 font-medium">Valor</th>
                <th className="text-right p-4 text-slate-400 font-medium">24h</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {assets.map((asset) => (
                <tr key={asset.symbol} className="hover:bg-slate-700/30 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={asset.icon} alt={asset.name} className="w-8 h-8 rounded-full" />
                      <div>
                        <p className="font-bold text-white">{asset.name}</p>
                        <p className="text-xs text-slate-500">{asset.symbol}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-right text-slate-300">
                    ${asset.price.toLocaleString()}
                  </td>
                  <td className="p-4 text-right">
                    <p className="text-white font-medium">{asset.balance} {asset.symbol}</p>
                  </td>
                  <td className="p-4 text-right font-bold text-white">
                    ${asset.value.toLocaleString()}
                  </td>
                  <td className="p-4 text-right">
                     <div className={`inline-flex items-center gap-1 ${asset.change24h >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                       {asset.change24h >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                       {Math.abs(asset.change24h)}%
                     </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Wallet;