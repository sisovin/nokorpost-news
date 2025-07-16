import React from 'react';
import { Calendar, User, ArrowRight, Heart, Eye, MessageCircle } from 'lucide-react';
import { News } from '../types';


interface NewsCardProps {
  news: News;
  featured?: boolean;
  onLike?: (id: number) => void;
  onComment?: (id: number) => void;
}

const NewsCard: React.FC<NewsCardProps> = ({ news, featured = false, onLike, onComment }) => {
  if (featured) {
    return (
      <div className="group relative overflow-hidden rounded-2xl glass neon-glow transition-all duration-500 hover:scale-[1.02] fade-in">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
        <img
          src={news.image}
          alt={news.title}
          className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
          <div className="flex items-center space-x-4 mb-4">
            <span className="px-3 py-1 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-sm rounded-full khmer-text">
              {news.category}
            </span>
            <div className="flex items-center text-gray-300 text-sm">
              <Calendar className="w-4 h-4 mr-1" />
              {news.date}
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-3 khmer-text leading-relaxed">
            {news.title}
          </h2>
          <p className="text-gray-200 mb-4 khmer-text line-clamp-2">
            {news.excerpt}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-300 text-sm">
              <User className="w-4 h-4 mr-1" />
              <span className="khmer-text">{news.author}</span>
            </div>
            <div className="flex items-center space-x-4 text-gray-300 text-sm">
              <div className="flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>{news.views}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Heart className="w-4 h-4" />
                <span>{news.likes}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageCircle className="w-4 h-4" />
                <span>{news.comments.length}</span>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <button className="flex items-center space-x-2 text-indigo-400 hover:text-indigo-300 transition-colors">
              <span className="khmer-text">អានបន្ត</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
      </div>
    );
  }

  return (
    <article className="group glass rounded-xl overflow-hidden neon-glow transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 fade-in">
      <div className="relative overflow-hidden">
        <img
          src={news.image}
          alt={news.title}
          className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-sm rounded-full khmer-text">
            {news.category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-3 text-sm text-gray-400">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            {news.date}
          </div>
          <div className="flex items-center">
            <User className="w-4 h-4 mr-1" />
            <span className="khmer-text">{news.author}</span>
          </div>
        </div>
        
        <h3 className="text-lg font-semibold mb-3 khmer-text leading-relaxed group-hover:text-indigo-400 transition-colors">
          {news.title}
        </h3>
        
        <p className="text-gray-400 text-sm mb-4 khmer-text line-clamp-3 leading-relaxed">
          {news.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-gray-400 text-sm">
            <div className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>{news.views}</span>
            </div>
            <button
              onClick={() => onLike?.(news.id)}
              className="flex items-center space-x-1 hover:text-red-400 transition-colors"
            >
              <Heart className="w-4 h-4" />
              <span>{news.likes}</span>
            </button>
            <button
              onClick={() => onComment?.(news.id)}
              className="flex items-center space-x-1 hover:text-indigo-400 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{news.comments.length}</span>
            </button>
          </div>
          
          <button className="flex items-center space-x-2 text-indigo-400 hover:text-indigo-300 transition-colors group">
            <span className="khmer-text">អានបន្ត</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;