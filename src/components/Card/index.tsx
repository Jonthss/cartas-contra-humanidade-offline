import { Box, Flex, Text, VStack, Image } from '@chakra-ui/react';

interface CardProps {
  message?: string;
  type: 'BLACK' | 'WHITE';
  isFaceDown?: boolean;
}

export function Card({ message, type, isFaceDown = false }: CardProps) {
  const isBlack = type === 'BLACK';
  const textoLimpo = message ? message.replace(/%s/g, '______') : '';

  return (
    <Box
      w={{ base: "150px", md: "220px" }}
      h={{ base: "220px", md: "300px" }}
      style={{ perspective: "1000px" }}
      userSelect="none"
    >
      <Box
        w="100%"
        h="100%"
        position="relative"
        style={{
          transition: "transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1)",
          transformStyle: "preserve-3d",
          transform: isFaceDown ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
        boxShadow="lg"
        borderRadius="xl"
      >
        {/* FRENTE DA CARTA (Texto da Pergunta/Resposta) */}
        <Flex
          position="absolute"
          w="100%"
          h="100%"
          bg={isBlack ? 'black' : 'white'}
          color={isBlack ? 'white' : 'black'}
          border={isBlack ? 'none' : '2px solid black'}
          borderRadius="xl"
          
          /* 1. ESPAÇAMENTO DAS BORDAS: 
             p={5} é o padrão. Se na foto o texto está mais colado na borda, mude para p={3} ou p={4}.
             Se estiver mais afastado das bordas, mude para p={6} ou p={8}. */
          p={5} 
          
          direction="column"
          
          /* 2. COMPORTAMENTO DA IMAGEM E DO TEXTO:
             Se na sua foto a imagem está fixada lá no fundo da carta, mantenha justify="space-between".
             Se na sua foto a imagem fica LOGO ABAIXO do texto, mude para justify="flex-start" */
          justify="space-between" 
          
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(0deg)"
          }}
        >
          <Text 
            fontSize={{ base: "md", md: "xl" }} 
            fontWeight="bold" 
            dangerouslySetInnerHTML={{ __html: textoLimpo }} 
          />
          
          <Image
            src="/cover.png"
            alt="CAH Logo"
            h="auto" // Altura da foto
            w="auto"
            objectFit="contain"
            alignSelf="flex-start"
            filter={isBlack ? 'invert(100%)' : 'none'}
            opacity={isBlack ? 0.9 : 0.6}
            
            /* 3. DISTÂNCIA ENTRE FOTO E TEXTO:
               Você pode adicionar a propriedade "mt" (margin-top) aqui para empurrar a foto para baixo.
               Exemplo: mt={4} ou mt={8} (Só fará diferença se você mudou o justify ali em cima para flex-start) */
          />
        </Flex>

        {/* VERSO DA CARTA (Logo Offline) */}
        <Flex
          position="absolute"
          w="100%"
          h="100%"
          bg={isBlack ? 'black' : 'white'}
          color={isBlack ? 'white' : 'black'}
          border={isBlack ? 'none' : '2px solid black'}
          borderRadius="xl"
          p={5}
          direction="column"
          justify="center"
          align="center"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
        >
          <VStack spacing={0} align="center">
            <Text fontSize="2xl" fontWeight="bold" textAlign="center" opacity={isBlack ? 1 : 0.8}>Cards</Text>
            <Text fontSize="2xl" fontWeight="bold" textAlign="center" opacity={isBlack ? 1 : 0.8}>Against</Text>
            <Text fontSize="2xl" fontWeight="bold" textAlign="center" opacity={isBlack ? 1 : 0.8}>Humanity</Text>
            <Text fontSize="lg" fontWeight="bold" textAlign="center" opacity={isBlack ? 0.8 : 0.6} mt={1}>Offline</Text>
          </VStack>
        </Flex>
      </Box>
    </Box>
  );
}