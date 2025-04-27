
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileIcon } from 'lucide-react';
import VerificationStatus from '@/components/VerificationStatus';

interface Document {
  id: string;
  name: string;
  hash: string;
  timestamp: string;
  status: 'verified' | 'notVerified' | 'pending' | 'error';
}

interface DocumentsListProps {
  documents: Document[];
  isLoading: boolean;
}

const DocumentsList: React.FC<DocumentsListProps> = ({ documents, isLoading }) => {
  return (
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
  );
};

export default DocumentsList;
