import React from 'react';
import { Shield, Fingerprint, Globe, CheckCircle, Share2, Award, Lock, ExternalLink } from 'lucide-react';

const Identity: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Identity Header */}
      <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700/50 rounded-3xl overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-indigo-900 to-purple-900 relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        </div>
        <div className="px-8 pb-8 relative">
          <div className="flex justify-between items-end -mt-12 mb-6">
            <div className="flex items-end gap-6">
              <div className="w-24 h-24 rounded-2xl bg-slate-900 p-1 border-4 border-slate-900">
                <img src="https://picsum.photos/200" alt="Avatar" className="w-full h-full rounded-xl object-cover" />
              </div>
              <div className="mb-2">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  CryptoNomad.eth 
                  <CheckCircle size={20} fill="currentColor" className="text-slate-900 bg-indigo-400 rounded-full" />
                </h2>
                <p className="text-slate-400 font-mono text-sm flex items-center gap-2">
                  did:nexus:71c9...a2 
                  <Share2 size={14} className="cursor-pointer hover:text-white" />
                </p>
              </div>
            </div>
            <button className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm">
              Editar Perfil
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
              <p className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-1">Reputação</p>
              <div className="flex items-center gap-2">
                <Shield className="text-emerald-400" size={20} />
                <span className="text-xl font-bold text-white">98/100</span>
              </div>
            </div>
            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
              <p className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-1">Conta Criada</p>
              <div className="flex items-center gap-2">
                <Globe className="text-blue-400" size={20} />
                <span className="text-xl font-bold text-white">742 Dias</span>
              </div>
            </div>
            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
              <p className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-1">Nível de Privacidade</p>
              <div className="flex items-center gap-2">
                <Lock className="text-purple-400" size={20} />
                <span className="text-xl font-bold text-white">Alta</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Credentials Column */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Award className="text-indigo-400" />
            Credenciais Verificáveis
          </h3>
          
          <div className="space-y-3">
            {[
              { title: "KYC Verificado", issuer: "Nexus ID", date: "2023-05-12", icon: Fingerprint, color: "text-emerald-400", bg: "bg-emerald-500/10" },
              { title: "Participante Genesis", issuer: "Nexus Protocol", date: "2022-01-01", icon: Globe, color: "text-purple-400", bg: "bg-purple-500/10" },
              { title: "Provedor de Liquidez", issuer: "Uniswap", date: "2023-08-20", icon: Award, color: "text-amber-400", bg: "bg-amber-500/10" },
            ].map((cred, i) => (
              <div key={i} className="bg-slate-800/50 backdrop-blur-md border border-slate-700/50 p-4 rounded-xl flex items-center justify-between hover:border-indigo-500/30 transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full ${cred.bg} flex items-center justify-center ${cred.color}`}>
                    <cred.icon size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white group-hover:text-indigo-400 transition-colors">{cred.title}</h4>
                    <p className="text-sm text-slate-500">Emitido por: {cred.issuer}</p>
                  </div>
                </div>
                <div className="text-right">
                   <p className="text-xs text-slate-500">{cred.date}</p>
                   <span className="text-xs text-emerald-500 flex items-center gap-1 justify-end mt-1">
                     <CheckCircle size={10} /> Válido
                   </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
           <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Lock className="text-indigo-400" />
            Configurações
          </h3>
          <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700/50 p-6 rounded-2xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-white">Perfil Público</p>
                <p className="text-xs text-slate-500">Visível para todos</p>
              </div>
              <div className="w-10 h-5 bg-indigo-600 rounded-full relative cursor-pointer">
                <div className="w-3 h-3 bg-white rounded-full absolute right-1 top-1"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-white">Dados On-Chain</p>
                <p className="text-xs text-slate-500">Histórico de tx</p>
              </div>
              <div className="w-10 h-5 bg-indigo-600 rounded-full relative cursor-pointer">
                <div className="w-3 h-3 bg-white rounded-full absolute right-1 top-1"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-white">Notificações</p>
                <p className="text-xs text-slate-500">E-mail e Push</p>
              </div>
              <div className="w-10 h-5 bg-slate-600 rounded-full relative cursor-pointer">
                <div className="w-3 h-3 bg-white rounded-full absolute left-1 top-1"></div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-slate-700">
               <button className="w-full py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm text-white transition-colors flex items-center justify-center gap-2">
                 <ExternalLink size={14} />
                 Gerenciar Chaves
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Identity;