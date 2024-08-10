import { ThemeProvider } from 'styled-components';
import MainPage from 'components';
import themes from 'styles/themes';
import { useRef } from 'react';
import { useWallpaper } from '@/components/common/hooks/useWallpaper';

export default function Home() {
  const vantaRef = useRef(null);
  useWallpaper(vantaRef);

  return (
    <main>
      <ThemeProvider theme={themes.defaultTheme}>
        <div className="fill-page" ref={vantaRef}>
          <MainPage />
        </div>
      </ThemeProvider>
    </main>
  );
}
