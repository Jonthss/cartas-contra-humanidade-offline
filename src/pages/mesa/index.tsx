import { useState, useEffect } from 'react';
import {
  Container, Button, Box, VStack, HStack, Text, Badge,
  // NOVOS IMPORTS DO CHAKRA PARA O MENU LATERAL
  Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton,
  useDisclosure, Flex, IconButton
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/Card';
import { deck } from '../../data/cards';

interface Player {
  id: string;
  name: string;
  score: number;
}

export function Mesa() {
  const navigate = useNavigate();
  
  // Hook do Chakra para controlar abrir/fechar o menu lateral
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const [players, setPlayers] = useState<Player[]>([]);

  // Carrega os jogadores salvos
  useEffect(() => {
    const saved = localStorage.getItem('cah-players');
    if (saved) setPlayers(JSON.parse(saved));
  }, []);

  function sortearCarta() {
    const randomIndex = Math.floor(Math.random() * deck.blackCards.length);
    return deck.blackCards[randomIndex];
  }

  const [pergunta, setPergunta] = useState(sortearCarta());

  // Lógica de pontos (mantida igual)
  function saveAndSortPlayers(updatedPlayers: Player[]) {
    updatedPlayers.sort((a, b) => b.score - a.score);
    setPlayers(updatedPlayers);
    localStorage.setItem('cah-players', JSON.stringify(updatedPlayers));
  }

  function addPoint(id: string) {
    saveAndSortPlayers(players.map(p => {
      if (p.id === id) return { ...p, score: p.score + 1 };
      return p;
    }));
  }

  function removePoint(id: string) {
    saveAndSortPlayers(players.map(p => {
      if (p.id === id && p.score > 0) return { ...p, score: p.score - 1 };
      return p;
    }));
  }

  return (
    <Container minH="100vh" centerContent justifyContent="center" maxW="full" bg="gray.50" py={10} pos="relative">
      
      {/* BOTÃO SAIR (FIXO ESQUERDA) */}
      <Button 
        pos="fixed" top={4} left={4} zIndex={10} 
        _active={{ transform: 'none' }} onClick={() => navigate('/')}
      >
        Sair da Partida
      </Button>

      {/* NOVO BOTÃO DO PLACAR (FIXO DIREITA)
          Ele é um IconButton (botão só com ícone) usando o caractere ☰ */}
      {players.length > 0 && (
        <IconButton
          aria-label="Abrir Placar"
          icon={<Text fontSize="2xl">☰</Text>}
          pos="fixed" top={4} right={4} zIndex={10}
          colorScheme="blackAlpha" bg="black" color="white"
          _active={{ transform: 'none' }}
          onClick={onOpen} // Abre o Drawer
        />
      )}

      {/* ÁREA CENTRAL DA CARTA (Limpa sem o placar embaixo) */}
      <VStack spacing={10} mt={8}>
        <Box>
          <Card message={pergunta} type="BLACK" isFaceDown={false} />
        </Box>
        
        <Button 
          size="lg" colorScheme="blue" h="16" px={8} fontSize="xl"
          onClick={() => setPergunta(sortearCarta())}
        >
          Sortear Nova Pergunta
        </Button>
      </VStack>

      {/* COMPONENTE DO MENU LATERAL (DRAWER) */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
        <DrawerOverlay /> {/* Escurece o fundo do jogo */}
        <DrawerContent bg="gray.100">
          <DrawerCloseButton size="lg" mt={2} /> {/* Botão X para fechar */}
          <DrawerHeader borderBottom="2px solid black" fontSize="2xl" pt={6}>
            🏆 Placar da Rodada
          </DrawerHeader>

          <DrawerBody py={6}>
            <VStack spacing={3} align="stretch">
              {players.map((player, index) => (
                <Flex 
                  key={player.id} 
                  justify="space-between" align="center"
                  bg="white" p={3} borderRadius="lg" boxShadow="sm" border="1px solid #E2E8F0"
                >
                  <HStack spacing={3}>
                    <Badge 
                      colorScheme={index === 0 && player.score > 0 ? "yellow" : "gray"} 
                      fontSize="lg" px={2} py={1} borderRadius="md" minW="55px" textAlign="center"
                    >
                      {player.score} pts
                    </Badge>
                    <Text fontWeight="bold" fontSize="lg" isTruncated maxW="150px">
                      {player.name}
                    </Text>
                  </HStack>

                  <HStack spacing={1}>
                    <Button size="sm" colorScheme="red" variant="outline" onClick={() => removePoint(player.id)}>
                      -1
                  </Button>
                    <Button size="sm" colorScheme="green" onClick={() => addPoint(player.id)}>
                      +1 Ponto
                  </Button>
                  </HStack>
                </Flex>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Container>
  );
}