
/**
 * Utility functions for document hashing
 */

/**
 * Generates a SHA-256 hash from a file
 * @param file The file to hash
 * @returns Promise with the hash as a hex string
 */
export const generateFileHash = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = async (event) => {
      try {
        if (!event.target?.result) {
          throw new Error('Failed to read file');
        }
        
        // Convert file to ArrayBuffer
        const arrayBuffer = event.target.result as ArrayBuffer;
        
        // Use built-in crypto API to create SHA-256 hash
        const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
        
        // Convert hash to hex string
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray
          .map(b => b.toString(16).padStart(2, '0'))
          .join('');
        
        resolve(hashHex);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };
    
    // Read file as ArrayBuffer
    reader.readAsArrayBuffer(file);
  });
};

/**
 * Function to check if two hashes match
 * @param hash1 First hash to compare
 * @param hash2 Second hash to compare
 * @returns Boolean indicating if hashes match
 */
export const compareHashes = (hash1: string, hash2: string): boolean => {
  return hash1.toLowerCase() === hash2.toLowerCase();
};
