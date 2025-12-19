import RootNavigation from './src/navigation';
import { ThemeProvider } from './src/context/ThemeContext';
import './src/i18n';

import { FontSizeProvider } from './src/context/FontSizeContext';

export default function App() {
  return (
    <ThemeProvider>
      <FontSizeProvider>
        <RootNavigation />
      </FontSizeProvider>
    </ThemeProvider>
  );
}



