import { ArrowBackIcon } from '@chakra-ui/icons';
import { Button, Container, Heading } from '@chakra-ui/react';
import React from 'react';
import { Input } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function Vector() {
    const navigate = useNavigate()
  return (
    <div style={{ margin: '10px' }}>
      <Button leftIcon={<ArrowBackIcon />} colorScheme="teal" variant="outline" onClick={() => {navigate('/')}}>
        Go back
      </Button>
      <Container maxW="2xl" margin={10}>
        <Heading marginBottom={2}>Atlas Vector Search</Heading>
        <Input placeholder='Need any movie recommendations?' ></Input>
      </Container>
    </div>
  );
}
