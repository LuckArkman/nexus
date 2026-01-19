import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import NFTGenerator from './components/NFTGenerator';
import AIChat from './components/AIChat';
import Wallet from './components/Wallet';
import Swap from './components/Swap';
import Identity from './components/Identity';
import { Page } from './types';
import { Bell, Search } from 'lucide-react';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Dashboard);

  const renderContent = () => {
    switch (currentPage) {
      case Page.Dashboard:
        return <Dashboard />;
      case Page.Wallet:
        return <Wallet />;
      case Page.Swap:
        return <Swap />;
      case Page.NFT:
        return <NFTGenerator />;
      case Page.AI_Advisor:
        return <AIChat />;
      case Page.Identity:
        return <Identity />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-96 text-slate-500">
            <div className="w-16 h-16 border-2 border-slate-700 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">🚧</span>
            </div>
            <h3 className="text-xl font-medium text-slate-300">Em Desenvolvimento</h3>
            <p>O módulo {currentPage} estará disponível em breve na Nexus V2.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans selection:bg-indigo-500/30">
      <Sidebar currentPage={currentPage} setPage={setCurrentPage} />
      
      <main className="ml-64 min-h-screen">
        {/* Topbar */}
        <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4 bg-slate-800/50 rounded-lg px-4 py-2 w-96 border border-slate-700/50 focus-within:border-indigo-500/50 transition-colors">
            <Search size={18} className="text-slate-500" />
            <input 
              type="text" 
              placeholder="Buscar tokens, coleções ou transações..." 
              className="bg-transparent border-none focus:outline-none w-full text-sm text-slate-200 placeholder-slate-500"
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="relative text-slate-400 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full"></span>
            </button>
            
            <div className="flex items-center gap-3 pl-6 border-l border-slate-800">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-white">0x71C...9A2</p>
                <p className="text-xs text-emerald-400">Conectado</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-0.5">
                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                   <img src="https://picsum.photos/40/40" alt="Avatar" className="rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;