import { ethers } from 'ethers';

// Simple ABI for document verification contract
const contractAbi = [
  "function registerDocument(bytes32 hash, string name) public returns (bool)",
  "function verifyDocument(bytes32 hash) public view returns (bool exists, uint256 timestamp, address uploader, string name)",
  "event DocumentRegistered(bytes32 indexed hash, address indexed uploader, uint256 timestamp, string name)"
];

// Mock contract address - in real app, would be from environment variable
const CONTRACT_ADDRESS = '0x123456789abcdef123456789abcdef123456789a';

// RPC URL - in real app, would be from environment variable
const RPC_URL = 'https://ethereum-goerli.publicnode.com';

/**
 * Create ethers provider
 */
export const getProvider = () => {
  return new ethers.JsonRpcProvider(RPC_URL);
};

/**
 * Create contract instance
 */
export const getContract = (privateKey?: string) => {
  const provider = getProvider();
  
  // If privateKey is provided, create a signer
  if (privateKey) {
    const wallet = new ethers.Wallet(privateKey, provider);
    return new ethers.Contract(CONTRACT_ADDRESS, contractAbi, wallet);
  }
  
  // Otherwise return read-only contract
  return new ethers.Contract(CONTRACT_ADDRESS, contractAbi, provider);
};

/**
 * Register document hash on blockchain
 * @param hash Document hash
 * @param name Document name
 * @param privateKey User's private key
 * @returns Transaction hash
 */
export const registerDocument = async (
  hash: string,
  name: string,
  privateKey: string
): Promise<string> => {
  try {
    const contract = getContract(privateKey);
    
    // Convert hash string to bytes32
    const hashBytes = ethers.id(hash);
    
    // Send transaction
    const tx = await contract.registerDocument(hashBytes, name);
    
    // Wait for transaction to be mined
    const receipt = await tx.wait();
    
    return receipt.hash;
  } catch (error) {
    console.error('Blockchain registration error:', error);
    throw new Error('Failed to register document on blockchain');
  }
};

/**
 * Verify document hash on blockchain
 * @param hash Document hash to verify
 * @returns Document verification result
 */
export const verifyDocument = async (hash: string) => {
  try {
    const contract = getContract();
    
    // Convert hash string to bytes32
    const hashBytes = ethers.id(hash);
    
    // Call contract
    const [exists, timestamp, uploader, name] = await contract.verifyDocument(hashBytes);
    
    return {
      exists,
      timestamp: timestamp.toString(),
      uploader,
      name
    };
  } catch (error) {
    console.error('Blockchain verification error:', error);
    throw new Error('Failed to verify document on blockchain');
  }
};
