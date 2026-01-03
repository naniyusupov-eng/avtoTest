import RootNavigation from './src/navigation';
import { ThemeProvider } from './src/context/ThemeContext';
import './src/i18n';

import { FontSizeProvider } from './src/context/FontSizeContext';

import { PremiumProvider } from './src/context/PremiumContext';

export default function App() {
  return (
    <ThemeProvider>
      <FontSizeProvider>
        <PremiumProvider>
          <RootNavigation />
        </PremiumProvider>
      </FontSizeProvider>
    </ThemeProvider>
  );
}



