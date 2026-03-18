import { useState } from 'react';
import { Container, Flex, Text, Button, Box, VStack, Badge } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/Card';
import { deck } from '../../data/cards';

export function Jogador() {
  const navigate = useNavigate();

  function sortearCarta() {
    const randomIndex = Math.floor(Math.random() * deck.whiteCards.length);
    return deck.whiteCards[randomIndex];
  }

  const [mao, setMao] = useState([
    sortearCarta(), sortearCarta(), sortearCarta(), sortearCarta(),
  ]);

  // Agora guardamos uma LISTA de números (para saber a ordem das cartas)
  const [selecionadas, setSelecionadas] = useState<number[]>([]);
  const [confirmadas, setConfirmadas] = useState<number[]>([]);
  const [cartaRevelada, setCartaRevelada] = useState(false);

  // Seleciona e desmarca as cartas mantendo a ordem dos cliques
  function handleSelecionar(index: number) {
    if (selecionadas.includes(index)) {
      setSelecionadas(selecionadas.filter((i) => i !== index));
    } else {
      if (selecionadas.length < 4) {
        setSelecionadas([...selecionadas, index]);
      }
    }
  }

  function confirmarCarta() {
    if (selecionadas.length > 0) {
      setConfirmadas(selecionadas);
      setSelecionadas([]);
    }
  }

  function revelarCarta() {
    if (confirmadas.length > 0 && !cartaRevelada) {
      setCartaRevelada(true);
    }
  }

  // Troca APENAS as cartas que foram usadas na rodada
  function pegarNovaCarta() {
    if (confirmadas.length > 0) {
      const novaMao = [...mao];
      confirmadas.forEach((index) => {
        novaMao[index] = sortearCarta();
      });
      setMao(novaMao);
      
      setConfirmadas([]);
      setCartaRevelada(false);
    }
  }

  function cancelarEscolha() {
    setConfirmadas([]);
    setSelecionadas([]);
    setCartaRevelada(false);
  }

  // TELA 2: CARTAS CONFIRMADAS NA MESA
  if (confirmadas.length > 0) {
    return (
      <Container minH="100vh" centerContent justifyContent="center" maxW="full" bg="gray.50" py={8}>
        
        <Button pos="fixed" top={4} left={4} zIndex={10} _active={{ transform: 'none' }} onClick={() => navigate('/')}>
          Sair da Partida
        </Button>

        <VStack spacing={8} w="full">
          <Text fontSize="2xl" fontWeight="bold" textAlign="center">
            {!cartaRevelada ? "Aguardando..." : "Sua(s) Resposta(s):"}
          </Text>
          
          {/* Caixa que agrupa e alinha todas as cartas jogadas */}
          <Flex 
            gap={6} 
            wrap="wrap" 
            justify="center" 
            onClick={revelarCarta} 
            cursor={!cartaRevelada ? "pointer" : "default"}
          >
            {confirmadas.map((indiceDaMao, pos) => (
              <VStack key={indiceDaMao}>
                {/* Mostra qual é a 1ª e a 2ª carta apenas quando reveladas */}
                {confirmadas.length > 1 && cartaRevelada && (
                  <Badge colorScheme="blue" fontSize="md" px={2} borderRadius="md">
                    {pos + 1}ª Carta
                  </Badge>
                )}
                <Card
                  message={mao[indiceDaMao]}
                  type="WHITE"
                  isFaceDown={!cartaRevelada}
                />
              </VStack>
            ))}
          </Flex>

          {!cartaRevelada ? (
            <VStack spacing={4}>
              <Text fontSize="md" color="gray.500" animation="pulse 2s infinite" textAlign="center">
                Toque nas cartas para revelar aos outros
              </Text>
              <Button colorScheme="red" variant="ghost" size="lg" onClick={cancelarEscolha}>
                Cancelar Escolha
              </Button>
            </VStack>
          ) : (
            <Button colorScheme="blue" size="lg" onClick={pegarNovaCarta}>
              Pegar {confirmadas.length > 1 ? "Novas Cartas" : "Outra Carta"}
            </Button>
          )}
        </VStack>
      </Container>
    );
  }

  // TELA 1: MÃO DE CARTAS NORMAL
  return (
    <Container minH="100vh" py={8} maxW="full" bg="gray.50">
      
      <Button pos="fixed" top={4} left={4} zIndex={10} _active={{ transform: 'none' }} onClick={() => navigate('/')}>
        Sair da Partida
      </Button>

      <Text fontSize="2xl" fontWeight="bold" mt={16} mb={8} textAlign="center">
        Suas Cartas
      </Text>

      {/* Adicionado um pb (padding-bottom) para a última carta não ficar escondida atrás do botão */}
      {/* Mão de cartas com efeito de Carrossel (Deslizante) */}
      <Flex 
        w="full"
        overflowX="auto" 
        flexWrap="nowrap" 
        gap={6} 
        px="20%" 
        pt={8} /* <-- CORREÇÃO: Adicionamos esse respiro no topo para a carta poder pular livremente! */
        pb={32}
        css={{
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          '&::-webkit-scrollbar': { display: 'none' },
          scrollbarWidth: 'none',
        }}
      >
        {mao.map((carta, index) => {
          const indexNaSelecao = selecionadas.indexOf(index);
          const isSelecionada = indexNaSelecao !== -1;
          const numeroOrdem = indexNaSelecao + 1;

          return (
            <Box 
              key={index}
              flexShrink={0} 
              scrollSnapAlign="center" 
              onClick={() => handleSelecionar(index)} 
              cursor="pointer"
              transition="all 0.2s"
              transform={isSelecionada ? 'translateY(-15px)' : 'none'}
              boxShadow={isSelecionada ? '0 0 0 4px #3182ce' : 'none'}
              borderRadius="10px"
              position="relative" 
              zIndex={isSelecionada ? 10 : 1} /* <-- Previne que a carta fique atrás das outras */
            >
              {isSelecionada && selecionadas.length > 1 && (
                <Badge
                  position="absolute" top="-4" right="-4" colorScheme="blue"
                  fontSize="xl" px={3} py={1} borderRadius="full" zIndex={2} boxShadow="md"
                >
                  {numeroOrdem}º
                </Badge>
              )}
              <Card message={carta} type="WHITE" isFaceDown={false} />
            </Box>
          );
        })}
      </Flex>
    </Container>
  );
}