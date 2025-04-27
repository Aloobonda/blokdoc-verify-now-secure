
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { getUserDocuments } from '@/utils/api';
import AdminHeader from '@/components/admin/AdminHeader';
import DocumentUploadForm from '@/components/admin/DocumentUploadForm';
import DocumentsList from '@/components/admin/DocumentsList';

interface Document {
  id: string;
  name: string;
  hash: string;
  timestamp: string;
  status: 'verified' | 'notVerified' | 'pending' | 'error';
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
    toast.info('You have been logged out');
  };

  const handleDocumentUploaded = (newDocument: Document) => {
    setDocuments(prev => [newDocument, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AdminHeader onLogout={handleLogout} />
      
      <div className="flex-1 p-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5">
            <DocumentUploadForm onDocumentUploaded={handleDocumentUploaded} />
          </div>
          <div className="lg:col-span-7">
            <DocumentsList documents={documents} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
