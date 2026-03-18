import { useState } from 'react';
import { Container, Flex, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/Card';
import { deck } from '../../data/cards';

export function Mesa() {
  const navigate = useNavigate();

  function sortearCarta() {
    const randomIndex = Math.floor(Math.random() * deck.blackCards.length);
    return deck.blackCards[randomIndex];
  }

  const [pergunta, setPergunta] = useState(sortearCarta());

  return (
    <Container minH="100vh" centerContent justifyContent="center" maxW="full" bg="gray.50">
      <Button pos="absolute" top={4} left={4} onClick={() => navigate('/')}>
        Voltar para o Menu
      </Button>

      <Flex direction="column" align="center" gap={8} mt={12}>
        <Card message={pergunta} type="BLACK" />
        
        <Button 
          size="lg" 
          colorScheme="blue" 
          onClick={() => setPergunta(sortearCarta())}
        >
          Sortear Nova Pergunta
        </Button>
      </Flex>
    </Container>
  );
}