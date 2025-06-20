// src/components/Navbar.jsx
import { useEffect, useState, useContext } from 'react';
import { NearContext } from '@/wallets/near';

export const Navbar = ({ onRouteChange }) => {
    const { signedAccountId, wallet } = useContext(NearContext);
    const [action, setAction] = useState(() => () => {});
    const [label, setLabel] = useState('Connecting...');

    useEffect(() => {
        if (!wallet) {
            setLabel('Loading Wallet...');
            return;
        }

        if (signedAccountId) {
            setAction(() => wallet.signOut);
            const displayAccountId = signedAccountId.length > 20 
                                     ? `${signedAccountId.substring(0, 8)}...${signedAccountId.substring(signedAccountId.length - 8)}`
                                     : signedAccountId;
            setLabel(`Connected: ${displayAccountId}`);
        } else {
            setAction(() => wallet.signIn);
            setLabel('Connect Wallet');
        }
    }, [signedAccountId, wallet]);

    return (
        <nav className="fixed top-0 w-full z-20 py-4" style={{ backgroundColor: '#2D2A4F' }}>
            <div className="container mx-auto flex items-center justify-between px-6">

                <div 
                    className="text-2xl font-bold text-purple-400 cursor-pointer" 
                    onClick={() => onRouteChange('home')} 
                >
                    FundFlow
                </div>

                {/* Navigation Links (Desktop) */}
                <ul className="hidden md:flex space-x-8">
                    {["Explore", "Create",].map((item) => ( // ADDED "Completed" here
                        <li 
                            key={item} 
                            className="text-gray-300 text-lg font-medium hover:text-white cursor-pointer transition-colors duration-200" 
                            onClick={() => onRouteChange(item.toLowerCase())}
                        >
                            {item}
                        </li>
                    ))}
                </ul>

                <button
                    className={`
                        px-6 py-2 rounded-full font-semibold text-white transition-all duration-300
                        ${signedAccountId 
                            ? 'bg-gray-700 hover:bg-gray-600 border border-gray-600'
                            : 'bg-purple-600 hover:bg-purple-700 border border-purple-500'
                        }
                    `}
                    onClick={action}
                    disabled={label === 'Loading Wallet...' || label === 'Connecting...'}
                >
                    {label}
                </button>


            </div>
        </nav>
    );
};