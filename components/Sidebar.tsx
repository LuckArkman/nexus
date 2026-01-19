import React from 'react';
import { LayoutDashboard, Wallet, Repeat, Image as ImageIcon, Bot, Fingerprint, LogOut } from 'lucide-react';
import { Page } from '../types';

interface SidebarProps {
  currentPage: Page;
  setPage: (page: Page) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setPage }) => {
  const navItems = [
    { id: Page.Dashboard, label: 'Painel', icon: LayoutDashboard },
    { id: Page.Wallet, label: 'Carteira', icon: Wallet },
    { id: Page.Swap, label: 'DeFi Swap', icon: Repeat },
    { id: Page.NFT, label: 'Estúdio NFT', icon: ImageIcon },
    { id: Page.AI_Advisor, label: 'Nexus AI', icon: Bot },
    { id: Page.Identity, label: 'Identidade', icon: Fingerprint },
  ];

  return (
    <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen fixed left-0 top-0 z-50">
      <div className="p-6">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
          NEXUS
        </h1>
        <p className="text-xs text-slate-500 tracking-widest mt-1">DEFI PROTOCOL</p>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-600/30 shadow-[0_0_15px_rgba(99,102,241,0.2)]'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-red-400 w-full transition-colors">
          <LogOut size={20} />
          <span>Desconectar</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;