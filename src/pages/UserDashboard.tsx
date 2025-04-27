
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import Logo from '@/components/Logo';
import FileUpload from '@/components/FileUpload';
import VerificationStatus, { VerificationStatus as Status } from '@/components/VerificationStatus';
import { verifyDocument } from '@/utils/api';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{
    status: Status;
    hash: string;
    timestamp?: string;
  } | null>(null);

  // Check if user is logged in
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
    }
  }, [navigate]);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    // Clear previous verification
    setVerificationResult(null);
  };

  const handleVerify = async () => {
    if (!selectedFile) {
      toast.error('Please select a file first');
      return;
    }

    try {
      setIsVerifying(true);
      setVerificationResult({
        status: 'pending',
        hash: '',
      });

      const result = await verifyDocument(selectedFile);
      
      // Add a bit more delay to show the pending state
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setVerificationResult({
        status: result.verified ? 'verified' : 'notVerified',
        hash: result.hash,
        timestamp: result.documentInfo?.timestamp,
      });
      
      if (result.verified) {
        toast.success('Document verification successful!');
      } else {
        toast.info('Document not found in blockchain records');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to verify document');
      setVerificationResult({
        status: 'error',
        hash: '',
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
    toast.info('You have been logged out');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full py-4 px-6 flex items-center justify-between glass-card">
        <Logo />
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-300">User Dashboard</span>
          <Button variant="outline" onClick={handleLogout} className="text-white/80 border-white/20">
            Logout
          </Button>
        </div>
      </header>

      <div className="flex-1 p-6 max-w-4xl mx-auto w-full flex flex-col items-center justify-center">
        <Card className="w-full glass-card border-blokdoc-cyan/20">
          <CardHeader className="text-center">
            <CardTitle>Verify Document</CardTitle>
            <CardDescription>
              Upload a document to check if it has been registered on the blockchain
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <FileUpload
                onFileSelect={handleFileSelect}
                label="Upload Document for Verification"
                buttonText="Select Document"
              />

              <Button
                onClick={handleVerify}
                disabled={!selectedFile || isVerifying}
                className="w-full bg-gradient-to-r from-blokdoc-cyan to-blokdoc-purple hover:opacity-90"
              >
                {isVerifying ? (
                  <span className="flex items-center">
                    <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
                    Verifying...
                  </span>
                ) : (
                  'Verify Document'
                )}
              </Button>

              {verificationResult && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-3">Verification Result</h3>
                  <VerificationStatus
                    status={verificationResult.status}
                    hash={verificationResult.hash}
                    timestamp={verificationResult.timestamp}
                  />
                  
                  {verificationResult.status === 'verified' && (
                    <div className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-md">
                      <h4 className="font-medium text-green-400 mb-2">Document Authenticity Confirmed</h4>
                      <p className="text-sm text-gray-300">
                        This document has been verified as authentic. The document hash matches the 
                        one recorded on the blockchain, confirming it has not been tampered with since registration.
                      </p>
                    </div>
                  )}
                  
                  {verificationResult.status === 'notVerified' && (
                    <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-md">
                      <h4 className="font-medium text-red-400 mb-2">Document Not Found</h4>
                      <p className="text-sm text-gray-300">
                        This document has not been registered on the blockchain. This could mean the document is new, 
                        or it may have been altered since registration.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDashboard;
