import { useState } from 'react';
import { Container, Flex, Text, Button, Box, VStack } from '@chakra-ui/react';
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

  const [indiceSelecionado, setIndiceSelecionado] = useState<number | null>(null);
  const [indiceConfirmado, setIndiceConfirmado] = useState<number | null>(null);
  const [cartaRevelada, setCartaRevelada] = useState(false);

  function handleSelecionar(index: number) {
    if (indiceSelecionado === index) {
      setIndiceSelecionado(null);
    } else {
      setIndiceSelecionado(index);
    }
  }

  function confirmarCarta() {
    if (indiceSelecionado !== null) {
      setIndiceConfirmado(indiceSelecionado);
      setIndiceSelecionado(null);
    }
  }

  function revelarCarta() {
    if (indiceConfirmado !== null && !cartaRevelada) {
      setCartaRevelada(true);
    }
  }

  function pegarNovaCarta() {
    if (indiceConfirmado !== null) {
      const novaMao = [...mao];
      novaMao[indiceConfirmado] = sortearCarta();
      setMao(novaMao);
      
      setIndiceConfirmado(null);
      setCartaRevelada(false);
    }
  }

  // TELA 2: CARTA CONFIRMADA NA MESA
  if (indiceConfirmado !== null) {
    return (
      <Container minH="100vh" centerContent justifyContent="center" maxW="full" bg="gray.50" pos="relative">
        {cartaRevelada && (
          <Button pos="absolute" top={4} right={4} colorScheme="blue" onClick={pegarNovaCarta}>
            Pegar outra carta
          </Button>
        )}

        <VStack spacing={8}>
          <Text fontSize="2xl" fontWeight="bold">
            {!cartaRevelada ? "Aguardando..." : "Sua Resposta:"}
          </Text>
          
          <Box onClick={revelarCarta} cursor={!cartaRevelada ? "pointer" : "default"}>
            <Card
              message={mao[indiceConfirmado]}
              type="WHITE"
              isFaceDown={!cartaRevelada}
            />
          </Box>

          {!cartaRevelada && (
            <Text fontSize="md" color="gray.500" animation="pulse 2s infinite">
              Toque na carta para revelar aos outros
            </Text>
          )}
        </VStack>
      </Container>
    );
  }

  // TELA 1: MÃO DE CARTAS NORMAL
  return (
    <Container minH="100vh" py={8} maxW="full" bg="gray.50">
      <Button pos="absolute" top={4} left={4} onClick={() => navigate('/')}>
        Sair da Partida
      </Button>

      <Text fontSize="2xl" fontWeight="bold" mt={16} mb={8} textAlign="center">
        Suas Cartas
      </Text>

      <Flex flexWrap="wrap" gap={8} justify="center" px={4}>
        {mao.map((carta, index) => {
          const isSelecionada = indiceSelecionado === index;

          return (
            <VStack key={index} spacing={4}>
              <Box 
                onClick={() => handleSelecionar(index)} 
                cursor="pointer"
                transition="all 0.2s"
                transform={isSelecionada ? 'translateY(-15px)' : 'none'}
                boxShadow={isSelecionada ? '0 0 0 4px #3182ce' : 'none'}
                borderRadius="xl"
              >
                <Card message={carta} type="WHITE" isFaceDown={false} />
              </Box>

              {isSelecionada ? (
                <Button colorScheme="blue" size="lg" onClick={confirmarCarta}>
                  Sim, jogar esta!
                </Button>
              ) : (
                <Box h="48px" />
              )}
            </VStack>
          );
        })}
      </Flex>
    </Container>
  );
}