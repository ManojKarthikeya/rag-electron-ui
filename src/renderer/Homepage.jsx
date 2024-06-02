import React from 'react';
import { Button, ButtonGroup } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import './App.css';
import Gemma from '../../assets/Gemma.png';
import { ChakraProvider, Container, Heading, Stack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function Homepage() {
    const navigate = useNavigate()
  return (
    <Container centerContent maxW="3xl" style={{ marginTop: 70 }}>
      <Heading style={{ marginBottom: 50 }}>
        Retrieval-Augmented Generation (RAG)
      </Heading>
      <img
        width="260"
        alt="icon"
        src="https://webimages.mongodb.com/_com_assets/cms/kuyjf3vea2hg34taa-horizontal_default_slate_blue.svg?auto=format%252Ccompress"
      />
      <Heading>+</Heading>
      <img src={Gemma} width="200" style={{ marginBottom: 40 }} />
      <Text fontSize={20} fontWeight={600}>
        Interact directly with your mongoDB database using human language.
      </Text>
      <Text fontSize={20} fontWeight={600}>
        Built using Atlas Vector Search, Gemma 2B, GTE-Large, Electron JS &
        React.
      </Text>
      <Stack direction="row" spacing={3} align="center" marginTop={9}>
        <Button colorScheme="teal" variant="outline" onClick={() => {navigate('/vector')}}>
          Use Vector Search
        </Button>
        <Button colorScheme="teal" variant="outline">
          Use RAG
        </Button>
      </Stack>
    </Container>
  );
}

export default Homepage;
