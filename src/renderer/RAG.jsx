import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  Divider,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Input } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Markdown from 'react-markdown'

const opts = "Sure, here are the three movies you requested: **The Killer** * A suspenseful thriller with intense action sequences and a high adrenaline plot. * The film features a great performance from Brad Pitt and is a must-see for fans of thrillers. * The film has a unique and atmospheric tone that sets it apart from other thrillers. **The Stunt Man** * A high-octane action film with stunning stunt work and breathtaking performances. * The film features some of the most daring stunts ever filmed, and the results are truly awe-inspiring. * The film is a adrenaline-pumping ride from start to finish. **The Accidental Spy** * A hilarious and entertaining spy spoof that features a lot of action and comedy. * The film is full of quotable lines and memorable characters. * The film is a great choice for fans of spy movies and those who enjoy a good laugh."

export default function RAG() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [response, setResponse] = useState([]);

  return (
    <div style={{ margin: '10px' }}>
      <Button
        leftIcon={<ArrowBackIcon />}
        colorScheme="teal"
        variant="outline"
        onClick={() => {
          navigate('/');
        }}
      >
        Go back
      </Button>
      <Container maxW="4xl" margin={6} centerContent>
        <Heading marginBottom={2}>RAG with GEMMA:2B</Heading>
        <Stack direction="row" width="80%" marginTop={4} spacing={4}>
          <Input
            autoFocus
            type="text"
            autoComplete="off"
            className="live-search-field"
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Need any movie recommendations?"
          ></Input>
          <Button
            rightIcon={<ArrowForwardIcon />}
            colorScheme="teal"
            variant="outline"
            onClick={() => {
              if (searchTerm) {
                fetch('http://127.0.0.1:5000/rag', {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ query: searchTerm }),
                })
                  .then((res) => res.json())
                  .then((data) => {
                    setResponse(data.response);
                  });
              }
            }}
          >
            Search
          </Button>
        </Stack>
      </Container>
      <Container margin={10} maxW="4xl">
        <Markdown disallowedElements={[":"]}>{response}</Markdown>
      </Container>
    </div>
  );
}
