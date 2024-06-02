import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider, Container, Heading, Stack } from '@chakra-ui/react';
import Homepage from './Homepage';
import Vector from './Vector';
import RAG from './RAG';

export default function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path='/vector' element={<Vector />} />
          <Route path='/rag' element={<RAG />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}
