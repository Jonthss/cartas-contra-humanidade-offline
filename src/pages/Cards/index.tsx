import { Box, Flex, Text } from '@chakra-ui/react';

interface CardProps {
  message: string;
  type: 'BLACK' | 'WHITE';
}

export function Card({ message, type }: CardProps) {
  const isBlack = type === 'BLACK';

  // Limpa possíveis marcações do código original
  const textoLimpo = message.replace(/%s/g, '______');

  return (
    <Flex
      bg={isBlack ? 'black' : 'white'}
      color={isBlack ? 'white' : 'black'}
      border={isBlack ? 'none' : '2px solid black'}
      w={{ base: "150px", md: "220px" }}
      h={{ base: "220px", md: "300px" }}
      borderRadius="xl"
      p={5}
      direction="column"
      justify="space-between"
      boxShadow="lg"
      userSelect="none"
    >
      <Text 
        fontSize={{ base: "md", md: "xl" }} 
        fontWeight="bold" 
        dangerouslySetInnerHTML={{ __html: textoLimpo }} 
      />
      
      <Text fontSize="xs" fontWeight="bold" opacity={isBlack ? 0.8 : 0.5}>
        Cards Against Humanity Offline
      </Text>
    </Flex>
  );
}