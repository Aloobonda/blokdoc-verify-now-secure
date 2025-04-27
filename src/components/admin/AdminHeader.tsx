
import React from 'react';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';

interface AdminHeaderProps {
  onLogout: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ onLogout }) => {
  return (
    <header className="w-full py-4 px-6 flex items-center justify-between glass-card">
      <Logo />
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-300">Admin Panel</span>
        <Button 
          variant="outline" 
          onClick={onLogout} 
          className="text-white/80 border-white/20"
        >
          Logout
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;
