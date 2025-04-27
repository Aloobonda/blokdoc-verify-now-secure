
# BlokDoc - Blockchain-Based Document Verification System

BlokDoc is a full-stack DApp (Decentralized Application) that enables secure document verification using blockchain technology. The system allows users to verify the authenticity of documents while administrators can register new documents on the blockchain.

## Features

- **3D Animated Background:** Immersive user experience with a dynamic, animated 3D background
- **User Authentication:** Simple login system with role-based access
- **Admin Dashboard:** Upload and register documents on the blockchain
- **User Dashboard:** Verify document authenticity against the blockchain
- **Document Hashing:** Uses SHA-256 to generate unique document fingerprints
- **Blockchain Integration:** Uses Ethers.js to interact with Ethereum smart contracts

## Technology Stack

### Frontend
- React.js with TypeScript
- Vite as build tool
- Three.js with React Three Fiber for 3D animations
- Tailwind CSS for styling
- shadcn/ui for UI components

### Backend (Placeholder/Mock Implementation)
- API service functions for document processing
- File hashing using Web Crypto API

### Blockchain Integration
- Ethers.js for blockchain interaction
- Configurable for any EVM-compatible blockchain

## Project Structure

```
blokdoc/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Background.tsx # 3D animated background
│   │   ├── FileUpload.tsx # File upload component
│   │   ├── Logo.tsx       # Application logo
│   │   └── VerificationStatus.tsx # Document verification result display
│   │
│   ├── pages/             # Application pages/routes
│   │   ├── Index.tsx      # Landing page
│   │   ├── Login.tsx      # Authentication page
│   │   ├── AdminDashboard.tsx # Admin interface
│   │   ├── UserDashboard.tsx  # User verification interface
│   │   └── NotFound.tsx    # 404 page
│   │
│   ├── utils/             # Utility functions
│   │   ├── api.ts         # API service functions (mock implementation)
│   │   ├── blockchain.ts  # Ethereum interaction via ethers.js
│   │   └── hash.ts        # Document hashing functions
│   │
│   ├── App.tsx            # Application entry point and routing
│   └── main.tsx           # Main rendering point
│
└── README.md              # Project documentation
```

## Environment Setup

Create a `.env` file in the root directory with the following variables:

```
# Blockchain Configuration
VITE_RPC_URL=https://ethereum-goerli.publicnode.com
VITE_CONTRACT_ADDRESS=0x123456789abcdef123456789abcdef123456789a
VITE_PRIVATE_KEY=your_private_key_here  # Only required for admin functionality
```

> Note: Never commit your private key to version control. In production, use proper key management solutions.

## Running the Project

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/blokdoc.git
   cd blokdoc
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:8080
   ```

## Demo Credentials

For testing purposes, you can use the following credentials:

- **Admin Access:**
  - Username: `admin`
  - Password: `admin`

- **User Access:**
  - Username: `user`
  - Password: `user`

## Smart Contract Integration

The frontend is designed to interact with a document verification smart contract that has at least these functions:

```solidity
// Functions the frontend expects to be available
function registerDocument(bytes32 hash, string name) public returns (bool);
function verifyDocument(bytes32 hash) public view returns (bool exists, uint256 timestamp, address uploader, string name);

// Events the frontend listens for
event DocumentRegistered(bytes32 indexed hash, address indexed uploader, uint256 timestamp, string name);
```

## License

MIT License
