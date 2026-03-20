const fs = require('fs');
const path = require('path');

// Lista completa de lixo eletrônico baseada na sua estrutura atual
const lixoEletronico = [
  // Pastas de Configuração e Backend antigo
  'scripts',
  '.github',
  'src/firebase',
  'src/services',
  'src/contexts',
  'src/lib',
  'src/hooks',
  'src/constants',
  'src/utils',
  // Páginas desativadas
  'src/pages/Match',
  'src/pages/Matches',
  'src/pages/Cards',
  'src/pages/NewCard',
  // Arquivos extras da Home
  'src/pages/Home/actions.tsx',
  'src/pages/Home/contribution.tsx',
  'src/pages/Home/hacked-alert.tsx',
  'src/pages/Home/header.tsx',
  'src/pages/Home/join-match.tsx',
  'src/pages/Home/tags.tsx',
  // Componentes não utilizados
  'src/components/AdBanner',
  'src/components/Avatar',
  'src/components/GoBack',
  'src/components/Maintenance',
  'src/components/PrivateRoute',
  'src/components/SomeLoading',
  'src/components/Toast',
  'src/components/add-card-link',
  'src/components/add-card-modal',
  'src/components/cookies-modal',
  'src/components/warn-modal',
  'src/components/form',
  'src/components/finish-match-button.tsx',
  'src/components/login-button.tsx',
  'src/components/pix-qrcode.tsx',
  'src/components/show-cards-owner-button.tsx',
  // Arquivos HTML e Configurações extras
  'public/atualizacoes.html',
  'public/doacoes.html',
  'public/faq.html',
  'public/sobre.html',
  'public/tutorial.html',
  'public/ads.txt',
  'public/css',
  'public/img',
  'nixpacks.toml'
];

console.log('🧹 Iniciando a faxina profunda...');

lixoEletronico.forEach(item => {
  const caminhoCompleto = path.join(__dirname, item);
  
  if (fs.existsSync(caminhoCompleto)) {
    try {
      fs.rmSync(caminhoCompleto, { recursive: true, force: true });
      console.log(`🗑️  Removido: ${item}`);
    } catch (err) {
      console.error(`❌ Erro ao remover ${item}:`, err.message);
    }
  }
});

console.log('\n✨ Projeto limpo! Agora ele está 100% focado no modo Offline.');