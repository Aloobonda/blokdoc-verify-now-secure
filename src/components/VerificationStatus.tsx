
import React from 'react';
import { CheckIcon, InfoIcon } from 'lucide-react';

export type VerificationStatus = 'verified' | 'notVerified' | 'pending' | 'error';

interface VerificationStatusProps {
  status: VerificationStatus;
  timestamp?: string;
  hash?: string;
}

const VerificationStatus: React.FC<VerificationStatusProps> = ({ 
  status, 
  timestamp,
  hash 
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'verified':
        return {
          icon: <CheckIcon className="h-6 w-6" />,
          color: 'text-green-500',
          bgColor: 'bg-green-500/20',
          borderColor: 'border-green-500/30',
          text: 'Verified'
        };
      case 'notVerified':
        return {
          icon: <InfoIcon className="h-6 w-6" />,
          color: 'text-red-500',
          bgColor: 'bg-red-500/20',
          borderColor: 'border-red-500/30',
          text: 'Not Verified'
        };
      case 'pending':
        return {
          icon: <div className="h-4 w-4 rounded-full border-2 border-yellow-500 border-t-transparent animate-spin"></div>,
          color: 'text-yellow-500',
          bgColor: 'bg-yellow-500/20',
          borderColor: 'border-yellow-500/30',
          text: 'Verification in Progress'
        };
      case 'error':
        return {
          icon: <InfoIcon className="h-6 w-6" />,
          color: 'text-red-500',
          bgColor: 'bg-red-500/20',
          borderColor: 'border-red-500/30',
          text: 'Error Verifying'
        };
      default:
        return {
          icon: <InfoIcon className="h-6 w-6" />,
          color: 'text-gray-500',
          bgColor: 'bg-gray-500/20',
          borderColor: 'border-gray-500/30',
          text: 'Unknown Status'
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className={`rounded-lg p-4 ${config.bgColor} ${config.borderColor} border`}>
      <div className="flex items-center">
        <div className={`${config.color} mr-3`}>
          {config.icon}
        </div>
        <div>
          <h4 className={`font-medium ${config.color}`}>{config.text}</h4>
          {hash && (
            <p className="text-xs text-gray-300 truncate mt-1">
              Hash: {hash.substring(0, 15)}...{hash.substring(hash.length - 6)}
            </p>
          )}
          {timestamp && (
            <p className="text-xs text-gray-400 mt-1">
              {new Date(timestamp).toLocaleString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerificationStatus;
