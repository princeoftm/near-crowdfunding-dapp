import { useEffect, useState } from 'react';
import { NetworkId } from './config.js';
import { NearContext, Wallet } from '@/wallets/near';
import "./App.css";
import Index from './pages/Index.jsx';

// Wallet instance
const wallet = new Wallet({ NetworkId: NetworkId });

// Optional: Create an access key so the user does not need to sign transactions. Read more about access keys here: https://docs.near.org/concepts/protocol/access-keys
// const wallet = new Wallet({ networkId: NetworkId, createAccessKeyFor: HelloNearContract });

function App() {
  const [signedAccountId, setSignedAccountId] = useState(null);

  useEffect(() => {
    wallet.startUp(setSignedAccountId);
  }, []);

  return (
    <NearContext.Provider value={{ wallet, signedAccountId }}>
      <Index />
    </NearContext.Provider>
  )
}

export default App
