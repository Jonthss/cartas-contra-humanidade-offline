import { useState } from 'react';
import { Container, Flex, Text, Box } from '@chakra-ui/react';
import { Card } from '@/components/Card';
import { GoBack } from '@/components/GoBack';
import { deck } from '../../data/cards';

export function Jogador(): JSX.Element {
  function sortearCartaBranca() {
    const randomIndex = Math.floor(Math.random() * deck.whiteCards.length);
    return deck.whiteCards[randomIndex];
  }

  // Inicia com 4 cartas aleatórias
  const [mao, setMao] = useState([
    sortearCartaBranca(),
    sortearCartaBranca(),
    sortearCartaBranca(),
    sortearCartaBranca(),
  ]);

  // Troca a carta que foi clicada por uma nova
  function jogarCarta(index: number) {
    const novaMao = [...mao];
    novaMao[index] = sortearCartaBranca();
    setMao(novaMao);
  }

  return (
    <Container maxW="container.md" minH="100vh" py={8} pos="relative">
      <Box pos="absolute" top="4" left="4">
        <GoBack />
      </Box>

      <Text fontSize="2xl" fontWeight="bold" mt={12} mb={8} textAlign="center">
        Suas Cartas (Toque para usar)
      </Text>

      <Flex flexWrap="wrap" gap={6} justify="center">
        {mao.map((carta, index) => (
          <Box 
            key={index} 
            onClick={() => jogarCarta(index)} 
            cursor="pointer"
            transition="transform 0.2s"
            _hover={{ transform: 'scale(1.05)' }}
            _active={{ transform: 'scale(0.95)' }}
          >
            {/* O SEGREDO ESTÁ NESTA LINHA ABAIXO: */}
            <Card message={carta} type="WHITE" animationType="auto" />
          </Box>
        ))}
      </Flex>
    </Container>
  );
}