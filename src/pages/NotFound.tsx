
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 animated-gradient-bg">
      <div className="max-w-md w-full text-center space-y-6 glass-card p-8 rounded-xl border border-white/10">
        <Logo size="large" />
        
        <h1 className="text-6xl font-bold text-blokdoc-cyan">404</h1>
        <p className="text-xl text-gray-300 mb-4">Page not found</p>
        
        <p className="text-gray-400">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <Button 
          onClick={() => navigate('/')} 
          className="bg-gradient-to-r from-blokdoc-cyan to-blokdoc-purple hover:opacity-90"
        >
          Return Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
