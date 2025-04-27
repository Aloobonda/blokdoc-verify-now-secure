
import { toast } from 'sonner';
import { generateFileHash } from './hash';

// Base URL for API - in real app, would be from environment variable
const API_BASE_URL = '/api';

interface UploadResponse {
  success: boolean;
  hash: string;
  timestamp: string;
  txHash?: string;
}

interface VerifyResponse {
  success: boolean;
  verified: boolean;
  hash: string;
  documentInfo?: {
    timestamp: string;
    uploader: string;
    name: string;
  };
}

/**
 * Upload a document to the blockchain via API
 * @param file Document file to upload
 * @param name Document name
 */
export const uploadDocument = async (
  file: File, 
  name: string
): Promise<UploadResponse> => {
  try {
    // Generate hash client-side
    const hash = await generateFileHash(file);
    
    // In a real app, we'd upload file to server
    // Here we'll just simulate the API call
    
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulated successful response
    return {
      success: true,
      hash,
      timestamp: new Date().toISOString(),
      txHash: `0x${Math.random().toString(16).substring(2, 42)}`
    };
    
    /* Real implementation would be:
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    
    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to upload document');
    }
    
    return await response.json();
    */
  } catch (error) {
    console.error('Upload error:', error);
    toast.error('Failed to upload document');
    throw error;
  }
};

/**
 * Verify a document against the blockchain
 * @param file Document file to verify
 */
export const verifyDocument = async (file: File): Promise<VerifyResponse> => {
  try {
    // Generate hash client-side
    const hash = await generateFileHash(file);
    
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Randomly determine if the document is verified (for demo purposes)
    const verified = Math.random() > 0.3;
    
    // Simulated response
    return {
      success: true,
      verified,
      hash,
      ...(verified && {
        documentInfo: {
          timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
          uploader: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
          name: file.name,
        }
      })
    };
    
    /* Real implementation would be:
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch(`${API_BASE_URL}/verify`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to verify document');
    }
    
    return await response.json();
    */
  } catch (error) {
    console.error('Verification error:', error);
    toast.error('Failed to verify document');
    throw error;
  }
};

/**
 * Get all documents for a specific user (for admin dashboard)
 * @param userAddress User Ethereum address
 */
export const getUserDocuments = async (userAddress: string = '0x0') => {
  // Simulate API request delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Define valid status types to match Document interface
  const validStatuses: Array<"verified" | "notVerified" | "pending" | "error"> = [
    "verified", "notVerified", "pending", "error"
  ];
  
  // Simulated data with proper status types
  return Array(5).fill(null).map((_, index) => ({
    id: `doc-${index}`,
    name: `Document ${index + 1}.pdf`,
    hash: `0x${Math.random().toString(16).substring(2, 66)}`,
    timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    status: Math.random() > 0.2 ? "verified" : "pending" as "verified" | "notVerified" | "pending" | "error"
  }));
};
