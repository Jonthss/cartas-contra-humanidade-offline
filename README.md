# 🃏 Cards Against Humanity - Edição Offline

Uma versão web progressiva, gratuita e **100% offline** do clássico jogo de cartas para maiores. 

Este projeto foi totalmente reestruturado para funcionar sem a necessidade de servidores, logins ou banco de dados. Ideal para jogar presencialmente com amigos: use uma tela central para a **Mesa** e os celulares de cada jogador para as **Mãos de Cartas**!

## ✨ Funcionalidades de Destaque

* 🚫 **100% Offline:** O jogo funciona inteiramente no navegador após o primeiro carregamento.
* 📱 **Experiência Mobile Nativa:**
    * **Carrossel de Cartas:** Deslize (swipe) para navegar pelas cartas da sua mão.
* 🏆 **Sistema de Placar:** Menu lateral (drawer) na tela da Mesa para gerenciar jogadores e pontuações em tempo real.
* 🎴 **Suporte a Combinações:** Escolha e ordene até 4 cartas brancas para responder perguntas complexas.
* 🎨 **Interface Responsiva:** Visual fiel ao original, otimizado para qualquer tamanho de tela.

---

## 🎮 Como Jogar (Dinâmica Local)

O jogo simula a experiência do baralho físico usando tecnologia web:

### 1. A Mesa (Tela Central)
1. Abra o jogo em uma tela comum (PC, Tablet ou TV).
2. No Menu Inicial, adicione os nomes dos participantes.
3. Clique em **"Baralho de Perguntas (Mesa)"**.
4. Esta tela exibirá a pergunta da rodada. Use o ícone de menu (☰) no canto para abrir o placar e pontuar o vencedor.

### 2. Os Jogadores (Celulares Individuais)
1. Cada amigo abre o link do jogo em seu próprio celular.
2. Seleciona **"Cartas de Respostas (Jogador)"**.
3. Escolha a(s) carta(s) mais engraçada(s) e clique em **"Jogar"**.
4. A carta ficará "de costas" no celular. Quando todos jogarem, revele a sua resposta para o grupo!

---

## 🚀 Tecnologias Utilizadas

* **React + TypeScript**
* **Vite** 
* **Chakra UI** 
* **Framer Motion** 
* **LocalStorage**

---

## 🛠️ Instalação e Execução

Atualmente o projeto já está online por meio do Netlify: 

https://cartasjonjon.netlify.app/

Se desejar rodar o projeto localmente para desenvolvimento:

1.  **Instale as dependências:**
    ```bash
    npm install
    ```
2.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
3.  **Para gerar a versão de produção:**
    ```bash
    npm run build
    ```

---

## 📂 Personalização de Cartas

Você pode adicionar suas próprias piadas internas ou expansões editando o arquivo:
`src/data/cards.ts`

Basta seguir o formato das listas `blackCards` (perguntas com `%s` para lacunas) e `whiteCards` (respostas).

---

## ⚖️ Aviso Legal

Este é um projeto não oficial inspirado no jogo "Cards Against Humanity". O conteúdo original é distribuído sob licença **Creative Commons (BY-NC-SA 2.0)**. Este software é gratuito e não possui fins lucrativos.
