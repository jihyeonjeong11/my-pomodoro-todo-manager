import { ThemeProvider } from 'styled-components';
import MainPage from 'components';
import themes from 'styles/themes';

export default function Home() {
  return (
    <main>
      <ThemeProvider theme={themes.defaultTheme}>
        <MainPage />
      </ThemeProvider>
    </main>
  );
}
