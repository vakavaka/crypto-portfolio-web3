import React, { useState } from 'react';
import {
  Container,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  useToast,
  VStack
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { addExchange } from '../services/api';

function AddExchange() {
  const [exchange, setExchange] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [apiSecret, setApiSecret] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await addExchange({ name: exchange, apiKey, apiSecret });
      toast({
        title: 'Exchange added successfully',
        status: 'success',
        duration: 3000,
      });
      navigate('/');
    } catch (error) {
      toast({
        title: 'Error adding exchange',
        description: error.message,
        status: 'error',
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={8}>
        <Heading>Add Exchange</Heading>
        <Box w="100%" as="form" onSubmit={handleSubmit}>
          <FormControl isRequired mb={4}>
            <FormLabel>Exchange</FormLabel>
            <Select
              placeholder="Select exchange"
              value={exchange}
              onChange={(e) => setExchange(e.target.value)}
            >
              <option value="Binance">Binance</option>
              <option value="BitGet">BitGet</option>
            </Select>
          </FormControl>
          <FormControl isRequired mb={4}>
            <FormLabel>API Key</FormLabel>
            <Input
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired mb={4}>
            <FormLabel>API Secret</FormLabel>
            <Input
              type="password"
              value={apiSecret}
              onChange={(e) => setApiSecret(e.target.value)}
            />
          </FormControl>
          <Button
            mt={4}
            colorScheme="blue"
            type="submit"
            isLoading={isLoading}
            w="100%"
          >
            Add Exchange
          </Button>
        </Box>
      </VStack>
    </Container>
  );
}

export default AddExchange; 