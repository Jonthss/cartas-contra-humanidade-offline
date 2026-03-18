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

  const [selecionadas, setSelecionadas] = useState<number[]>([]);
  const [confirmadas, setConfirmadas] = useState<number[]>([]);
  const [cartaRevelada, setCartaRevelada] = useState(false);

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
      setConfirmadas([...selecionadas]);
      setSelecionadas([]);
    }
  }

  function revelarCarta() {
    if (confirmadas.length > 0 && !cartaRevelada) {
      setCartaRevelada(true);
    }
  }

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

  // =========================================================================
  // TELA 2: CARTAS JOGADAS NA "MESA" (AGORA EM CARROSSEL)
  // =========================================================================
  if (confirmadas.length > 0) {
    return (
      <Container minH="100vh" maxW="full" bg="gray.50" py={8} px={0} overflow="hidden">
        <Button 
          pos="fixed" top={4} left={4} zIndex={100} 
          _active={{ transform: 'none' }} onClick={() => navigate('/')}
        >
          Sair da Partida
        </Button>

        <VStack spacing={8} w="full" mt={16}>
          <Text fontSize="2xl" fontWeight="bold" textAlign="center">
            {!cartaRevelada ? "Aguardando..." : "Sua(s) Resposta(s):"}
          </Text>
          
          {/* NOVO CARROSSEL DE RESPOSTAS */}
          <Flex 
            w="full"
            overflowX="auto" 
            flexWrap="nowrap" 
            gap={6} 
            px="15%" 
            pt={10} 
            pb={10} 
            onClick={revelarCarta} // Clicar em qualquer lugar do carrossel revela
            cursor={!cartaRevelada ? "pointer" : "default"}
            css={{
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
              '&::-webkit-scrollbar': { display: 'none' },
              scrollbarWidth: 'none',
            }}
          >
            {confirmadas.map((indiceDaMao, pos) => (
              <Box 
                key={indiceDaMao}
                flexShrink={0} 
                scrollSnapAlign="center" 
                borderRadius="10px"
                position="relative" 
              >
                {/* Mostra qual é a 1ª e a 2ª carta apenas quando reveladas */}
                {confirmadas.length > 1 && cartaRevelada && (
                  <Badge 
                    position="absolute" top="-4" left="50%" transform="translateX(-50%)" 
                    colorScheme="blue" fontSize="md" px={2} borderRadius="md" zIndex={10}
                  >
                    {pos + 1}ª Carta
                  </Badge>
                )}
                <Card
                  message={mao[indiceDaMao]}
                  type="WHITE"
                  isFaceDown={!cartaRevelada}
                />
              </Box>
            ))}
          </Flex>

          {!cartaRevelada ? (
            <VStack spacing={4} px={6}>
              <Text fontSize="md" color="gray.500" animation="pulse 2s infinite" textAlign="center">
                Toque nas cartas para revelar aos outros (deslize se houver várias)
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

  // =========================================================================
  // TELA 1: SELEÇÃO DAS CARTAS (MÃO) (MANTIDA IGUAL)
  // =========================================================================
  return (
    <Container minH="100vh" py={8} maxW="full" bg="gray.50" px={0} overflow="hidden">
      <Button 
        pos="fixed" top={4} left={4} zIndex={100} 
        _active={{ transform: 'none' }} onClick={() => navigate('/')}
      >
        Sair da Partida
      </Button>

      <Text fontSize="2xl" fontWeight="bold" mt={16} mb={8} textAlign="center">
        Suas Cartas
      </Text>

      <Flex 
        w="full"
        overflowX="auto" 
        flexWrap="nowrap" 
        gap={6} 
        px="15%" 
        pt={16} 
        pb={40}
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
              transform={isSelecionada ? 'translateY(-20px)' : 'none'}
              boxShadow={isSelecionada ? '0 0 0 4px #3182ce' : 'none'}
              borderRadius="10px"
              position="relative" 
              zIndex={isSelecionada ? 10 : 1}
            >
              {isSelecionada && selecionadas.length > 1 && (
                <Badge
                  position="absolute" top="-5" right="-5" colorScheme="blue"
                  fontSize="2xl" px={3} py={1} borderRadius="full" zIndex={20} boxShadow="lg"
                >
                  {numeroOrdem}º
                </Badge>
              )}
              <Card message={carta} type="WHITE" isFaceDown={false} />
            </Box>
          );
        })}
      </Flex>

      {selecionadas.length > 0 && (
        <Box 
          pos="fixed" 
          bottom={0} 
          left={0} 
          w="100%" 
          p={6} 
          bgGradient="linear(to-t, gray.50 80%, transparent)" 
          zIndex={200}
        >
          <Button 
            colorScheme="blue" 
            size="lg" 
            h="16" 
            w="full"
            fontSize="xl" 
            boxShadow="dark-lg" 
            onClick={confirmarCarta}
          >
            Jogar {selecionadas.length} {selecionadas.length === 1 ? 'carta' : 'cartas'}!
          </Button>
        </Box>
      )}
    </Container>
  );
}