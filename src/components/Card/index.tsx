import { Box, Flex, Text, VStack, Image } from '@chakra-ui/react';

interface CardProps {
  message?: string;
  type: 'BLACK' | 'WHITE';
  isFaceDown?: boolean;
}

export function Card({ message, type, isFaceDown = false }: CardProps) {
  const isBlack = type === 'BLACK';
  const textoLimpo = message ? message.replace(/%s/g, '______') : '';

  const corFundo = isBlack ? '#191919' : '#ffffff';
  const corTexto = isBlack ? '#ffffff' : '#191919';

  return (
    <Box
      w={{ base: "220px", md: "280px" }} // Menor no celular, original no PC
      h={{ base: "280px", md: "350px" }} // Menor no celular, original no PC
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
        borderRadius="10px"
      >
        {/* FRENTE DA CARTA */}
        <Flex
          position="absolute"
          w="100%"
          h="100%"
          bg={corFundo}
          color={corTexto}
          border={`2px solid ${corTexto}`}
          borderRadius="10px"
          padding={{ base: "1.2rem", md: "2rem 1rem" }} // Espaçamento adaptável
          direction="column"
          justify="space-between"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(0deg)",
            wordBreak: "break-word"
          }}
        >
          <Text 
            fontSize={{ base: "1.2rem", md: "1.6rem" }} // Fonte um pouco menor no celular
            textAlign="left"
            dangerouslySetInnerHTML={{ __html: textoLimpo }} 
          />
          
          <Image
            src={isBlack ? "/image-invert.png" : "/cover.png"}
            alt="CAH Logo"
            h={{ base: "30px", md: "40px" }}
            w="auto"
            objectFit="contain"
            alignSelf="flex-start"
          />
        </Flex>

        {/* VERSO DA CARTA */}
        <Flex
          position="absolute"
          w="100%"
          h="100%"
          bg={corFundo}
          color={corTexto}
          border={`2px solid ${corTexto}`}
          borderRadius="10px"
          padding="2rem 1rem"
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
            <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" textAlign="center" opacity={isBlack ? 1 : 0.8}>Cards</Text>
            <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" textAlign="center" opacity={isBlack ? 1 : 0.8}>Against</Text>
            <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" textAlign="center" opacity={isBlack ? 1 : 0.8}>Humanity</Text>
            <Text fontSize={{ base: "md", md: "lg" }} fontWeight="bold" textAlign="center" opacity={isBlack ? 0.8 : 0.6} mt={1}>Offline</Text>
          </VStack>
        </Flex>
      </Box>
    </Box>
  );
}