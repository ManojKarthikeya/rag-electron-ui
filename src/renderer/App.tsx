import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider, Container, Heading, Stack } from '@chakra-ui/react';
import Homepage from './Homepage';
import Vector from './Vector';

export default function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path='/vector' element={<Vector />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}
