import { ArrowBackIcon } from '@chakra-ui/icons';
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

export default function Vector() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      console.log(searchTerm);
      if (searchTerm) {
        fetch('http://127.0.0.1:5000/vectorsearch', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query: searchTerm }),
        })
          .then((res) => res.json())
          .then((data) => {
            setMovies(data.response);
          });
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  console.log(movies);

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
        <Heading marginBottom={2}>Atlas Vector Search</Heading>
        <Input
          autoFocus
          type="text"
          autoComplete="off"
          className="live-search-field"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Need any movie recommendations?"
        ></Input>
        <SimpleGrid spacing={3} display="flex" flexDirection="row" marginTop={4}>
          {movies.map((movie) => (
            <Card maxW="sm" maxWidth={'33%'}>
              <CardBody>
                <Image
                  height={300}
                  src={movie.poster}
                  alt={movie.title}
                  borderRadius="lg"
                />
                <Stack mt="6" spacing="3">
                  <Heading size="md">{movie.title}</Heading>
                  <Text fontSize={12}>{movie.plot}</Text>
                </Stack>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </Container>
    </div>
  );
}
