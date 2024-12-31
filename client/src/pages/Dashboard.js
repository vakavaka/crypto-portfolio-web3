import React, { useState, useEffect } from 'react';
import { Box, Container, Heading, SimpleGrid, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import TokenList from '../components/TokenList';
import PortfolioChart from '../components/PortfolioChart';
import { fetchPortfolioData } from '../services/api';

function Dashboard() {
  const [portfolioData, setPortfolioData] = useState(null);

  useEffect(() => {
    const loadPortfolioData = async () => {
      const data = await fetchPortfolioData();
      setPortfolioData(data);
    };
    loadPortfolioData();
  }, []);

  return (
    <Container maxW="container.xl" py={8}>
      <Box mb={8}>
        <Heading mb={4}>Crypto Portfolio</Heading>
        <SimpleGrid columns={2} spacing={4}>
          <Button as={Link} to="/add-wallet">Add Wallet</Button>
          <Button as={Link} to="/add-exchange">Add Exchange</Button>
        </SimpleGrid>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
        <Box>
          <Heading size="md" mb={4}>Portfolio Distribution</Heading>
          {portfolioData && <PortfolioChart data={portfolioData} />}
        </Box>
        <Box>
          <Heading size="md" mb={4}>Token List</Heading>
          {portfolioData && <TokenList tokens={portfolioData.tokens} />}
        </Box>
      </SimpleGrid>
    </Container>
  );
}

export default Dashboard;