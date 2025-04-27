
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { CheckIcon, UploadIcon } from 'lucide-react';
import FileUpload from '@/components/FileUpload';
import { uploadDocument } from '@/utils/api';

interface DocumentUploadFormProps {
  onDocumentUploaded: (document: any) => void;
}

const DocumentUploadForm: React.FC<DocumentUploadFormProps> = ({ onDocumentUploaded }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentName, setDocumentName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedHash, setUploadedHash] = useState<string | null>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
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
      
      onDocumentUploaded({
        id: `doc-${Date.now()}`,
        name: documentName,
        hash: result.hash,
        timestamp: result.timestamp,
        status: 'verified' as const
      });
      
      setSelectedFile(null);
      setDocumentName('');
    } catch (error) {
      console.error(error);
      toast.error('Failed to upload document');
    } finally {
      setIsUploading(false);
    }
  };

  return (
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
  );
};

export default DocumentUploadForm;
