import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type FontSizeContextType = {
    fontSize: number;
    setFontSize: (size: number) => void;
};

const FontSizeContext = createContext<FontSizeContextType>({
    fontSize: 16,
    setFontSize: () => { },
});

export const useFontSize = () => useContext(FontSizeContext);

export const FontSizeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [fontSize, setFontSizeState] = useState(16);

    useEffect(() => {
        loadFontSize();
    }, []);

    const loadFontSize = async () => {
        try {
            const savedSize = await AsyncStorage.getItem('user-font-size');
            if (savedSize) {
                setFontSizeState(parseFloat(savedSize));
            }
        } catch (error) {
            console.error('Failed to load font size:', error);
        }
    };

    const setFontSize = async (size: number) => {
        setFontSizeState(size);
        try {
            await AsyncStorage.setItem('user-font-size', size.toString());
        } catch (error) {
            console.error('Failed to save font size:', error);
        }
    };

    return (
        <FontSizeContext.Provider value={{ fontSize, setFontSize }}>
            {children}
        </FontSizeContext.Provider>
    );
};
