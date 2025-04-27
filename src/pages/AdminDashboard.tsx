
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import Logo from '@/components/Logo';
import FileUpload from '@/components/FileUpload';
import VerificationStatus from '@/components/VerificationStatus';
import { uploadDocument, getUserDocuments } from '@/utils/api';
import { CheckIcon, UploadIcon, FileIcon } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  hash: string;
  timestamp: string;
  status: 'verified' | 'notVerified' | 'pending' | 'error';
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentName, setDocumentName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedHash, setUploadedHash] = useState<string | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is logged in as admin
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
      return;
    }
    
    try {
      const parsedUser = JSON.parse(user);
      if (parsedUser.role !== 'admin') {
        navigate('/login');
        toast.error('Admin access required');
      }
    } catch (e) {
      navigate('/login');
    }
    
    // Fetch documents
    fetchDocuments();
  }, [navigate]);
  
  const fetchDocuments = async () => {
    try {
      setIsLoading(true);
      const docs = await getUserDocuments();
      setDocuments(docs);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch documents');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    // Set default document name from file name (without extension)
    const nameWithoutExtension = file.name.split('.').slice(0, -1).join('.');
    setDocumentName(nameWithoutExtension);
  };
  
  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select a file first');
      return;
    }
    
    if (!documentName.trim()) {
      toast.error('Please enter a document name');
      return;
    }
    
    try {
      setIsUploading(true);
      
      const result = await uploadDocument(selectedFile, documentName);
      
      setUploadedHash(result.hash);
      toast.success('Document uploaded and registered on blockchain!');
      
      // Add new document to the list
      setDocuments(prev => [{
        id: `doc-${Date.now()}`,
        name: documentName,
        hash: result.hash,
        timestamp: result.timestamp,
        status: 'verified'
      }, ...prev]);
      
      // Reset form
      setSelectedFile(null);
      setDocumentName('');
    } catch (error) {
      console.error(error);
      toast.error('Failed to upload document');
    } finally {
      setIsUploading(false);
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
          <span className="text-sm text-gray-300">Admin Panel</span>
          <Button variant="outline" onClick={handleLogout} className="text-white/80 border-white/20">
            Logout
          </Button>
        </div>
      </header>
      
      <div className="flex-1 p-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Upload Section */}
          <div className="lg:col-span-5">
            <Card className="glass-card border-blokdoc-cyan/20">
              <CardHeader>
                <CardTitle>Register Document</CardTitle>
                <CardDescription>
                  Upload a document to register its hash on the blockchain
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <FileUpload onFileSelect={handleFileSelect} />
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Document Name</label>
                    <Input
                      value={documentName}
                      onChange={(e) => setDocumentName(e.target.value)}
                      placeholder="Enter document name"
                      className="border-gray-700 bg-gray-800/50"
                    />
                  </div>
                  
                  <Button 
                    onClick={handleUpload}
                    disabled={!selectedFile || !documentName || isUploading}
                    className="w-full bg-gradient-to-r from-blokdoc-cyan to-blokdoc-purple hover:opacity-90"
                  >
                    {isUploading ? (
                      <span className="flex items-center">
                        <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
                        Registering...
                      </span>
                    ) : (
                      <>
                        <UploadIcon className="w-4 h-4 mr-2" />
                        Register Document
                      </>
                    )}
                  </Button>
                  
                  {uploadedHash && (
                    <div className="p-4 bg-blokdoc-blue/30 rounded-md border border-blokdoc-cyan/20">
                      <div className="flex items-center mb-2">
                        <CheckIcon className="w-5 h-5 text-green-500 mr-2" />
                        <span className="font-medium">Document Registered</span>
                      </div>
                      <p className="text-xs text-gray-400">Hash: {uploadedHash}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Documents List */}
          <div className="lg:col-span-7">
            <Card className="glass-card border-blokdoc-cyan/20">
              <CardHeader>
                <CardTitle>Registered Documents</CardTitle>
                <CardDescription>
                  All documents registered on the blockchain
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="py-8 flex justify-center">
                    <div className="h-8 w-8 border-4 border-t-transparent border-blokdoc-cyan/70 rounded-full animate-spin"></div>
                  </div>
                ) : documents.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    No documents registered yet
                  </div>
                ) : (
                  <div className="space-y-4">
                    {documents.map((doc) => (
                      <div 
                        key={doc.id} 
                        className="p-4 border border-white/10 rounded-md bg-white/5 hover:bg-white/10 transition-all"
                      >
                        <div className="flex items-start gap-4">
                          <div className="p-2 bg-blokdoc-blue/30 rounded-md">
                            <FileIcon className="h-8 w-8 text-blokdoc-cyan" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{doc.name}</h4>
                            <p className="text-xs text-gray-400 mb-2">
                              Registered on {new Date(doc.timestamp).toLocaleString()}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              <div className="text-xs bg-blokdoc-blue/30 py-1 px-2 rounded-full text-blokdoc-cyan">
                                PDF Document
                              </div>
                              <div className="text-xs bg-blokdoc-blue/30 py-1 px-2 rounded-full text-blokdoc-cyan truncate max-w-xs">
                                Hash: {doc.hash.substring(0, 10)}...
                              </div>
                            </div>
                          </div>
                          <div className="w-24">
                            <VerificationStatus status={doc.status} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
