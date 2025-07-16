import React from 'react';
import { ArrowUp, MessageCircle, Share2 } from 'lucide-react';

const FloatingElements: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 space-y-4">
      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className="p-3 glass rounded-full hover:bg-indigo-500 transition-all duration-300 neon-glow floating-animation"
        style={{ animationDelay: '0s' }}
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      {/* Share */}
      <button
        className="p-3 glass rounded-full hover:bg-cyan-500 transition-all duration-300 neon-glow floating-animation"
        style={{ animationDelay: '1s' }}
      >
        <Share2 className="w-5 h-5" />
      </button>

      {/* Comments */}
      <button
        className="p-3 glass rounded-full hover:bg-purple-500 transition-all duration-300 neon-glow floating-animation"
        style={{ animationDelay: '2s' }}
      >
        <MessageCircle className="w-5 h-5" />
      </button>
    </div>
  );
};

export default FloatingElements;