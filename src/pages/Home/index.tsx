import { useState, useEffect } from 'react';
import { Container, Flex, Button, Heading, Input, VStack, HStack, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

interface Player {
  id: string;
  name: string;
  score: number;
}

export function Home(): JSX.Element {
  const navigate = useNavigate();
  const [players, setPlayers] = useState<Player[]>([]);
  const [newPlayerName, setNewPlayerName] = useState('');

  // Carrega os jogadores salvos na memória ao abrir a tela
  useEffect(() => {
    const saved = localStorage.getItem('cah-players');
    if (saved) setPlayers(JSON.parse(saved));
  }, []);

  // Adiciona um novo jogador na memória
  function addPlayer() {
    if (!newPlayerName.trim()) return; // Não deixa adicionar nome vazio
    
    const newPlayer = { id: Date.now().toString(), name: newPlayerName.trim(), score: 0 };
    const updated = [...players, newPlayer];
    
    setPlayers(updated);
    localStorage.setItem('cah-players', JSON.stringify(updated));
    setNewPlayerName(''); // Limpa o campo de texto
  }

  // Remove um jogador da lista
  function removePlayer(id: string) {
    const updated = players.filter(p => p.id !== id);
    setPlayers(updated);
    localStorage.setItem('cah-players', JSON.stringify(updated));
  }

  return (
    <Container maxW="container.sm" minH="100vh" py={10}>
      <Heading mb={10} textAlign="center">Cards Against Humanity Offline</Heading>
      
      <Flex direction="column" gap={6} w="full" px={4} mb={10}>
        <Button 
          size="lg" bg="black" color="white" h="20" fontSize="xl"
          _hover={{ bg: 'gray.800' }} onClick={() => navigate('/mesa')}
        >
          Baralho de Perguntas (Mesa)
        </Button>
        
        <Button 
          size="lg" bg="white" color="black" border="2px solid black" h="20" fontSize="xl"
          _hover={{ bg: 'gray.100' }} onClick={() => navigate('/jogador')}
        >
          Cartas de Respostas (Jogador)
        </Button>
      </Flex>

      {/* SESSÃO DE GERENCIAR JOGADORES */}
      <VStack spacing={4} w="full" px={4} align="stretch">
        <Text fontSize="xl" fontWeight="bold" borderBottom="2px solid black" pb={2}>
          Jogadores da Partida
        </Text>

        <HStack>
          <Input 
            placeholder="Nome do jogador..." 
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addPlayer()} // Adiciona ao apertar Enter
          />
          <Button colorScheme="green" onClick={addPlayer}>Adicionar</Button>
        </HStack>

        <VStack align="stretch" spacing={2} mt={4}>
          {players.map(player => (
            <HStack key={player.id} justify="space-between" bg="gray.100" p={3} borderRadius="md">
              <Text fontWeight="bold" fontSize="lg">{player.name}</Text>
              <Button size="sm" colorScheme="red" variant="ghost" onClick={() => removePlayer(player.id)}>
                X
              </Button>
            </HStack>
          ))}
          
          {players.length === 0 && (
            <Text color="gray.500" textAlign="center" mt={4}>
              Nenhum jogador adicionado.
            </Text>
          )}
        </VStack>
      </VStack>
    </Container>
  );
}