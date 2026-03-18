import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Mesa } from './pages/mesa'; // Confirme se a sua pasta está com "m" minúsculo ou maiúsculo
import { Jogador } from './pages/Jogador';

import '@fontsource/roboto/400.css';
import '@fontsource/roboto/700.css';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mesa" element={<Mesa />} />
      <Route path="/jogador" element={<Jogador />} />
    </Routes>
  );
}