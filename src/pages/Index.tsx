
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';
import Background from '@/components/Background';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col">
      <Background />
      
      {/* Header */}
      <header className="w-full py-4 px-6 flex items-center justify-between">
        <Logo size="large" />
        <div className="space-x-4">
          <Button 
            variant="outline" 
            onClick={() => navigate('/login')}
            className="border-blokdoc-cyan text-blokdoc-cyan hover:bg-blokdoc-cyan/10"
          >
            Login
          </Button>
        </div>
      </header>
      
      {/* Hero section */}
      <main className="flex-1 flex flex-col md:flex-row items-center justify-center px-4 py-12">
        <div className="max-w-3xl text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-blokdoc-cyan">Secure</span> Document Verification 
            <span className="text-blokdoc-purple"> on the Blockchain</span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-8">
            BlokDoc provides immutable proof of document authenticity using
            blockchain technology. Verify and secure your important documents
            with confidence.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button 
              onClick={() => navigate('/login')}
              size="lg"
              className="bg-gradient-to-r from-blokdoc-cyan to-blokdoc-purple hover:opacity-90"
            >
              Get Started
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white/20 hover:bg-white/5"
            >
              Learn More
            </Button>
          </div>
        </div>
        
        {/* Abstract 3D element for visual interest */}
        <div className="hidden md:block relative w-96 h-96">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-r from-blokdoc-cyan/30 to-blokdoc-purple/30 filter blur-xl animate-pulse-glow"></div>
          <div className="absolute top-1/4 left-1/3 w-32 h-32 rounded-full bg-blokdoc-cyan/20 filter blur-md animate-float"></div>
          <div className="absolute bottom-1/3 right-1/4 w-40 h-40 rounded-full bg-blokdoc-purple/20 filter blur-md animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
      </main>
      
      {/* Features section */}
      <section className="w-full py-16 px-4 glass-card">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-blokdoc-cyan/20 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blokdoc-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Immutable Records</h3>
              <p className="text-gray-300">Once recorded, document verification data cannot be altered, ensuring long-term authenticity.</p>
            </div>
            
            <div className="p-6 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-blokdoc-purple/20 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blokdoc-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Simple Verification</h3>
              <p className="text-gray-300">Verify any document in seconds by uploading it to our platform — no blockchain expertise needed.</p>
            </div>
            
            <div className="p-6 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-blokdoc-cyan/20 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blokdoc-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Enterprise Ready</h3>
              <p className="text-gray-300">Integrate via our API with your existing systems for automated document verification at scale.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="w-full py-8 px-4 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Logo />
            <p className="text-sm text-gray-400">Blockchain Document Verification</p>
          </div>
          
          <div className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} BlokDoc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
