import React, { useState } from 'react';
import { Sparkles, Download, Image as ImageIcon, Loader2 } from 'lucide-react';
import { ImageSize } from '../types';
import { generateNFTArt } from '../services/gemini';

const NFTGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState<ImageSize>(ImageSize.Size1K);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const imageData = await generateNFTArt(prompt, size);
      setGeneratedImage(imageData);
    } catch (err: any) {
      console.error(err);
      setError("Erro ao gerar imagem. Verifique se a chave API foi selecionada.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
          Estúdio NFT AI
        </h2>
        <p className="text-slate-400 max-w-xl mx-auto">
          Crie ativos digitais únicos usando o poder do modelo Gemini Nano Banana Pro. 
          Escolha a resolução e descreva sua visão.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700/50 p-6 rounded-2xl space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Prompt Criativo</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ex: Um cyberpunk samurai em uma cidade neon chuvosa, estilo synthwave..."
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 h-32 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Resolução</label>
              <div className="grid grid-cols-3 gap-3">
                {[ImageSize.Size1K, ImageSize.Size2K, ImageSize.Size4K].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`py-2 px-4 rounded-lg font-medium transition-all ${
                      size === s
                        ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25'
                        : 'bg-slate-700/50 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isLoading || !prompt}
              className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                isLoading || !prompt
                  ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]'
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Gerando Arte...
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  Gerar NFT
                </>
              )}
            </button>
            
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm">
                {error}
              </div>
            )}
          </div>

          <div className="bg-indigo-900/20 border border-indigo-500/20 p-4 rounded-xl">
             <h4 className="flex items-center gap-2 text-indigo-400 font-medium mb-2">
               <ImageIcon size={16} />
               Dica Profissional
             </h4>
             <p className="text-sm text-indigo-200/70">
               Para melhores resultados em 4K, inclua detalhes sobre iluminação (ex: "cinematic lighting") e estilo artístico (ex: "oil painting", "3d render").
             </p>
          </div>
        </div>

        {/* Preview Area */}
        <div className="bg-slate-800/30 border border-slate-700/30 rounded-2xl p-4 flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden group">
          {generatedImage ? (
            <>
              <img 
                src={generatedImage} 
                alt="Generated NFT" 
                className="w-full h-auto rounded-xl shadow-2xl" 
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <button className="bg-white text-black px-6 py-2 rounded-full font-bold flex items-center gap-2 hover:bg-slate-200 transition-colors">
                   <Download size={18} /> Download
                </button>
                <button className="bg-purple-600 text-white px-6 py-2 rounded-full font-bold flex items-center gap-2 hover:bg-purple-500 transition-colors">
                   <Sparkles size={18} /> Mint NFT
                </button>
              </div>
            </>
          ) : (
            <div className="text-center text-slate-500">
              <div className="w-24 h-24 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-4 border border-slate-700 border-dashed">
                <ImageIcon size={40} className="opacity-50" />
              </div>
              <p>Sua obra de arte aparecerá aqui</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NFTGenerator;