const { Web3 } = require('web3');
const ERC20_ABI = require('../constants/erc20.abi.json');

const web3 = new Web3(process.env.ETH_NODE_URL);

exports.getTokenBalances = async (address) => {
  // This is a simplified version. In a real app, you'd need to:
  // 1. Get a list of ERC20 tokens for the address (e.g., from Etherscan API)
  // 2. Get balance for each token using the token contract
  // 3. Get token metadata (name, decimals, etc.)
  
  // Example implementation for a single token (USDT)
  const USDT_ADDRESS = '0xdAC17F958D2ee523a2206206994597C13D831ec7';
  const contract = new web3.eth.Contract(ERC20_ABI, USDT_ADDRESS);
  
  const balance = await contract.methods.balanceOf(address).call();
  const decimals = await contract.methods.decimals().call();
  
  return [{
    symbol: 'USDT',
    name: 'Tether USD',
    balance: balance / Math.pow(10, decimals),
    address: USDT_ADDRESS
  }];
}; 