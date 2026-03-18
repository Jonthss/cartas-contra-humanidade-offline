import { useState } from 'react';
import { Container, Flex, Button, Box } from '@chakra-ui/react';
import { Card } from '@/components/Card';
import { GoBack } from '@/components/GoBack';
import { deck } from '../../data/cards';

export function Mesa(): JSX.Element {
  function sortearCarta() {
    const randomIndex = Math.floor(Math.random() * deck.blackCards.length);
    return deck.blackCards[randomIndex];
  }

  const [perguntaAtual, setPerguntaAtual] = useState(sortearCarta);

  return (
    <Container minH="100vh" centerContent justifyContent="center" pos="relative">
      <Box pos="absolute" top="4" left="4">
        <GoBack />
      </Box>

      <Flex direction="column" align="center" gap={8} mt={10}>
        {/* Olha a mudança aqui embaixo! */}
        <Card message={perguntaAtual} type="BLACK" animationType="auto" />
        
        <Button 
          size="lg" 
          colorScheme="blue" 
          onClick={() => setPerguntaAtual(sortearCarta())}
        >
          Sortear / Pular Pergunta
        </Button>
      </Flex>
    </Container>
  );
}