import React, { useState } from 'react';
import {
  Container,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  VStack
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { addWallet } from '../services/api';

function AddWallet() {
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await addWallet({ address });
      toast({
        title: 'Wallet added successfully',
        status: 'success',
        duration: 3000,
      });
      navigate('/');
    } catch (error) {
      toast({
        title: 'Error adding wallet',
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
        <Heading>Add ERC20 Wallet</Heading>
        <Box w="100%" as="form" onSubmit={handleSubmit}>
          <FormControl isRequired>
            <FormLabel>Wallet Address</FormLabel>
            <Input
              placeholder="Enter ERC20 wallet address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </FormControl>
          <Button
            mt={4}
            colorScheme="blue"
            type="submit"
            isLoading={isLoading}
            w="100%"
          >
            Add Wallet
          </Button>
        </Box>
      </VStack>
    </Container>
  );
}

export default AddWallet; 