import { Container, Flex, Button, Heading } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export function Home(): JSX.Element {
  const navigate = useNavigate();

  return (
    <Container maxW="container.sm" minH="100vh" centerContent justifyContent="center">
      <Heading mb={10} textAlign="center">Cards Against Humanity</Heading>
      
      <Flex direction="column" gap={6} w="full" px={4}>
        <Button 
          size="lg" 
          bg="black" 
          color="white" 
          h="20" 
          fontSize="xl"
          _hover={{ bg: 'gray.800' }}
          onClick={() => navigate('/mesa')}
        >
          Baralho de Perguntas (Mesa)
        </Button>
        
        <Button 
          size="lg" 
          bg="white" 
          color="black" 
          border="2px solid black"
          h="20" 
          fontSize="xl"
          _hover={{ bg: 'gray.100' }}
          onClick={() => navigate('/jogador')}
        >
          Cartas de Respostas (Jogador)
        </Button>
      </Flex>
    </Container>
  );
}