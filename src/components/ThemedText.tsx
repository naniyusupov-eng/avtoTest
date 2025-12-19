import React from 'react';
import { Text as RNText, TextProps, StyleSheet } from 'react-native';
import { useFontSize } from '../context/FontSizeContext';
import { useTheme } from '../context/ThemeContext';

export const Text: React.FC<TextProps> = (props) => {
    const { fontSize } = useFontSize();
    const { isDark } = useTheme();

    // Default base font size in our design is often 16 or 14.
    // The user chooses a px value (e.g. 18px).
    // If the element has explicit fontSize in style, we should probably scale it?
    // User request: "px tanlanganda barcha harflarga amal qilsin" -> "When px is chosen, it should apply to all letters".
    // This implies forcing the size, OR scaling.
    // If I force everything to 20px, headers will look small and captions large.
    // Scaling is safer. 
    // Scale = userFontSize / 16 (assuming 16 is standard).

    // However, the prompt says "12 to 30px... choose px". 
    // If user picks 30px, they expect BIG text.

    const scale = fontSize / 16;

    // We need to flatten style to find fontSize.
    const flatStyle = StyleSheet.flatten(props.style);
    const originalSize = flatStyle?.fontSize || 16;
    const newSize = originalSize * scale;

    // Also handle color for theme if not specified
    const defaultColor = isDark ? '#FFF' : '#000';

    return (
        <RNText
            {...props}
            style={[
                { color: defaultColor },
                props.style,
                { fontSize: newSize }
            ]}
        />
    );
};
