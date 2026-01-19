export interface Asset {
  symbol: string;
  name: string;
  balance: number;
  price: number;
  change24h: number;
  value: number;
  icon: string;
}

export interface Transaction {
  id: string;
  type: 'receive' | 'send' | 'swap' | 'mint';
  asset: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

export enum ImageSize {
  Size1K = '1K',
  Size2K = '2K',
  Size4K = '4K'
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum Page {
  Dashboard = 'dashboard',
  Wallet = 'wallet',
  Swap = 'swap',
  NFT = 'nft',
  AI_Advisor = 'ai_advisor',
  Identity = 'identity'
}