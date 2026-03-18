import { useState } from 'react';
import { Container, Flex, Text, Button, Box } from '@chakra-ui/react';
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
    sortearCarta(),
    sortearCarta(),
    sortearCarta(),
    sortearCarta(),
  ]);

  function jogarCarta(index: number) {
    const novaMao = [...mao];
    novaMao[index] = sortearCarta();
    setMao(novaMao);
  }

  return (
    <Container minH="100vh" py={8} maxW="full" bg="gray.50">
      <Button pos="absolute" top={4} left={4} onClick={() => navigate('/')}>
        Voltar para o Menu
      </Button>

      <Text fontSize="2xl" fontWeight="bold" mt={16} mb={8} textAlign="center">
        Suas Cartas (Toque para jogar)
      </Text>

      <Flex flexWrap="wrap" gap={4} justify="center">
        {mao.map((carta, index) => (
          <Box 
            key={index} 
            onClick={() => jogarCarta(index)} 
            cursor="pointer"
            transition="all 0.1s"
            _active={{ transform: 'scale(0.95)' }}
            _hover={{ transform: 'translateY(-5px)' }}
          >
            <Card message={carta} type="WHITE" />
          </Box>
        ))}
      </Flex>
    </Container>
  );
}