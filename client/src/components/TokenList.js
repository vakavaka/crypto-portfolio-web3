import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Box,
  Skeleton
} from '@chakra-ui/react';

function TokenList({ tokens }) {
  if (!tokens) {
    return <Skeleton height="400px" />;
  }

  return (
    <Box overflowX="auto">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Token</Th>
            <Th>Balance</Th>
            <Th isNumeric>Value (USD)</Th>
            <Th isNumeric>24h Change</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tokens.map((token) => (
            <Tr key={token.symbol}>
              <Td>
                <Text fontWeight="bold">{token.symbol}</Text>
                <Text fontSize="sm" color="gray.600">{token.name}</Text>
              </Td>
              <Td>{token.balance}</Td>
              <Td isNumeric>${token.valueUSD.toFixed(2)}</Td>
              <Td isNumeric>
                <Text color={token.change24h >= 0 ? 'green.500' : 'red.500'}>
                  {token.change24h.toFixed(2)}%
                </Text>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default TokenList;