import RootNavigation from './src/navigation';
import { ThemeProvider } from './src/context/ThemeContext';
import './src/i18n';

export default function App() {
  return (
    <ThemeProvider>
      <RootNavigation />
    </ThemeProvider>
  );
}



