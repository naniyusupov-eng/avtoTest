import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type PremiumContextType = {
    isPremium: boolean; // No Ads
    hasComments: boolean; // Comments Access
    unlockPremium: () => Promise<void>; // Dev/Test helper
    unlockComments: () => Promise<void>; // Dev/Test helper
    resetPurchases: () => Promise<void>;
};

const PremiumContext = createContext<PremiumContextType>({
    isPremium: false,
    hasComments: false,
    unlockPremium: async () => { },
    unlockComments: async () => { },
    resetPurchases: async () => { },
});

export const PremiumProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isPremium, setIsPremium] = useState(false);
    const [hasComments, setHasComments] = useState(false);

    useEffect(() => {
        loadStatus();
    }, []);

    const loadStatus = async () => {
        try {
            const premium = await AsyncStorage.getItem('isPremium');
            const comments = await AsyncStorage.getItem('hasComments');
            setIsPremium(premium === 'true');
            setHasComments(comments === 'true');
        } catch (e) {
            console.error(e);
        }
    };

    const unlockPremium = async () => {
        await AsyncStorage.setItem('isPremium', 'true');
        setIsPremium(true);
    };

    const unlockComments = async () => {
        await AsyncStorage.setItem('hasComments', 'true');
        setHasComments(true);
    };

    const resetPurchases = async () => {
        await AsyncStorage.removeItem('isPremium');
        await AsyncStorage.removeItem('hasComments');
        setIsPremium(false);
        setHasComments(false);
    };

    return (
        <PremiumContext.Provider value={{ isPremium, hasComments, unlockPremium, unlockComments, resetPurchases }}>
            {children}
        </PremiumContext.Provider>
    );
};

export const usePremium = () => useContext(PremiumContext);
