import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import NewsCard from './NewsCard';

interface News {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  date: string;
  author: string;
  featured?: boolean;
}

interface HeroSectionProps {
  featuredNews: News[];
}

const HeroSection: React.FC<HeroSectionProps> = ({ featuredNews }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredNews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredNews.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredNews.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredNews.length) % featuredNews.length);
  };

  if (featuredNews.length === 0) return null;

  return (
    <section className="relative h-[70vh] overflow-hidden rounded-2xl mx-4 sm:mx-6 lg:mx-8 mt-8">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 to-cyan-900/20 z-10" />
      
      <div className="relative h-full transition-transform duration-700 ease-in-out"
           style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        <div className="flex h-full">
          {featuredNews.map((news, index) => (
            <div key={news.id} className="w-full h-full flex-shrink-0 relative">
              <NewsCard news={news} featured={true} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 p-2 glass rounded-full hover:bg-white/20 transition-all"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 p-2 glass rounded-full hover:bg-white/20 transition-all"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
        {featuredNews.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? 'bg-white scale-125'
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;