
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { UploadIcon } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  acceptedTypes?: string;
  label?: string;
  buttonText?: string;
  maxSize?: number; // in MB
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  acceptedTypes = "application/pdf,image/png,image/jpeg",
  label = "Upload Document",
  buttonText = "Select File",
  maxSize = 10 // default 10MB
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      validateAndSetFile(file);
    }
  };

  const validateAndSetFile = (file: File) => {
    // Check file type
    if (!acceptedTypes.includes(file.type)) {
      toast.error("Invalid file type. Please upload a PDF, PNG, or JPEG.");
      return;
    }

    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      toast.error(`File is too large. Maximum size is ${maxSize}MB.`);
      return;
    }

    setSelectedFile(file);
    onFileSelect(file);
    toast.success("File selected successfully!");
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium mb-2">{label}</label>
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-200 ${
          isDragging 
            ? "border-blokdoc-cyan bg-blokdoc-blue/20" 
            : "border-gray-600 hover:border-blokdoc-cyan/70"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={triggerFileInput}
      >
        <Input
          ref={fileInputRef}
          type="file"
          accept={acceptedTypes}
          onChange={handleFileChange}
          className="hidden"
        />
        
        <div className="flex flex-col items-center justify-center space-y-2">
          <UploadIcon className="h-10 w-10 text-gray-400" />
          <p className="text-sm text-gray-300">
            Drag and drop your file here, or click to browse
          </p>
          <Button variant="outline" type="button" className="mt-2">
            {buttonText}
          </Button>
        </div>
      </div>
      
      {selectedFile && (
        <div className="mt-3 px-3 py-2 bg-blokdoc-blue/30 border border-blokdoc-cyan/20 rounded-md">
          <p className="text-sm font-medium text-blokdoc-cyan truncate">
            {selectedFile.name}
          </p>
          <p className="text-xs text-gray-400">
            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
          </p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
