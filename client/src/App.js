import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddWallet from './pages/AddWallet';
import AddExchange from './pages/AddExchange';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add-wallet" element={<AddWallet />} />
          <Route path="/add-exchange" element={<AddExchange />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App; 