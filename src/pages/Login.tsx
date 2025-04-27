
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import Logo from '@/components/Logo';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast.error('Please enter both username and password');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate login delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, use these credentials:
    // Admin: admin/admin
    // User: user/user
    if (username === 'admin' && password === 'admin') {
      toast.success('Welcome back, Admin!');
      localStorage.setItem('user', JSON.stringify({ role: 'admin', name: 'Admin' }));
      navigate('/admin');
    } else if (username === 'user' && password === 'user') {
      toast.success('Login successful!');
      localStorage.setItem('user', JSON.stringify({ role: 'user', name: 'User' }));
      navigate('/dashboard');
    } else {
      toast.error('Invalid credentials');
    }
    
    setIsLoading(false);
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md glass-card border-blokdoc-cyan/20">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="mb-4">
            <Logo size="large" />
          </div>
          <CardTitle className="text-2xl">Sign in to your account</CardTitle>
          <CardDescription>
            Enter your credentials to access the document verification system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">Username</label>
              <Input
                id="username"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="border-gray-700 bg-gray-800 focus:border-blokdoc-cyan"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">Password</label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-gray-700 bg-gray-800 focus:border-blokdoc-cyan"
              />
            </div>
            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blokdoc-cyan to-blokdoc-purple hover:opacity-90"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-400 text-center w-full">
            Demo credentials: <br />
            Admin: admin/admin | User: user/user
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
