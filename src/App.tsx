import React, { useState, useMemo } from 'react';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import CategoryTabs from './components/CategoryTabs';
import NewsCard from './components/NewsCard';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';
import FloatingElements from './components/FloatingElements';
import CommentSystem from './components/CommentSystem';
import AdminPanel from './components/AdminPanel';
import { mockNews } from './data/mockData';
import { News, Comment } from './types';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAdmin, setShowAdmin] = useState(false);
  const [selectedNews, setSelectedNews] = useState<News | null>(null);
  const [news, setNews] = useState<News[]>(mockNews);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('light', !darkMode);
  };

  const handleLike = (newsId: number) => {
    setNews(prevNews => 
      prevNews.map(item => 
        item.id === newsId 
          ? { ...item, likes: item.likes + 1 }
          : item
      )
    );
  };

  const handleComment = (newsId: number) => {
    const newsItem = news.find(item => item.id === newsId);
    if (newsItem) {
      setSelectedNews(newsItem);
    }
  };

  const handleAddComment = (comment: Omit<Comment, 'id' | 'date' | 'likes'>) => {
    const newComment: Comment = {
      ...comment,
      id: Date.now(),
      date: new Date().toLocaleDateString('km-KH'),
      likes: 0
    };

    setNews(prevNews => 
      prevNews.map(item => 
        item.id === comment.newsId 
          ? { ...item, comments: [...item.comments, newComment] }
          : item
      )
    );
  };

  const handleLikeComment = (commentId: number) => {
    if (selectedNews) {
      const updatedComments = selectedNews.comments.map(comment =>
        comment.id === commentId
          ? { ...comment, likes: comment.likes + 1 }
          : comment
      );
      setSelectedNews({ ...selectedNews, comments: updatedComments });
    }
  };

  const featuredNews = news.filter(item => item.featured);
  
  const filteredNews = useMemo(() => {
    return news.filter(item => {
      const matchesCategory = activeCategory === 'all' || 
        (activeCategory === 'politics' && item.category === 'នយោបាយ') ||
        (activeCategory === 'technology' && item.category === 'បច្ចេកវិទ្យា') ||
        (activeCategory === 'sports' && item.category === 'កីឡា') ||
        (activeCategory === 'business' && item.category === 'អាជីវកម្ម') ||
        (activeCategory === 'entertainment' && item.category === 'កម្សាន្ត') ||
        (activeCategory === 'health' && item.category === 'សុខភាព');

      const matchesSearch = searchTerm === '' || 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm, news]);

  React.useEffect(() => {
    document.documentElement.classList.toggle('light', !darkMode);
  }, [darkMode]);

  // Admin Panel
  if (showAdmin) {
    return <AdminPanel />;
  }

  // Comment Modal
  if (selectedNews) {
    return (
      <div className="min-h-screen bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <button
            onClick={() => setSelectedNews(null)}
            className="mb-6 px-4 py-2 glass rounded-lg hover:bg-white/10 khmer-text"
          >
            ← ត្រលប់ទៅវិញ
          </button>
          
          <div className="glass rounded-xl p-6 mb-8">
            <img
              src={selectedNews.image}
              alt={selectedNews.title}
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
            <h1 className="text-2xl font-bold khmer-text mb-4">{selectedNews.title}</h1>
            <p className="text-gray-300 khmer-text leading-relaxed mb-6">{selectedNews.content}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span className="khmer-text">{selectedNews.author}</span>
              <span>{selectedNews.date}</span>
              <span>{selectedNews.views} views</span>
              <span>{selectedNews.likes} likes</span>
            </div>
          </div>

          <CommentSystem
            newsId={selectedNews.id}
            comments={selectedNews.comments}
            onAddComment={handleAddComment}
            onLikeComment={handleLikeComment}
          />
        </div>
        <Toaster position="top-right" />
      </div>
    );
  }
  return (
    <div className={`min-h-screen transition-all duration-300 ${darkMode ? '' : 'light'}`}>
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="relative z-10">
        <Header 
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onAdminClick={() => setShowAdmin(true)}
        />

        <CategoryTabs 
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        <main className="pt-8">
          {/* Hero Section */}
          <HeroSection featuredNews={featuredNews} />

          {/* News Grid */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2 khmer-text bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                {activeCategory === 'all' ? 'ព័ត៌មានថ្មីៗ' : 
                 activeCategory === 'politics' ? 'នយោបាយ' :
                 activeCategory === 'technology' ? 'បច្ចេកវិទ្យា' :
                 activeCategory === 'sports' ? 'កីឡា' :
                 activeCategory === 'business' ? 'អាជីវកម្ម' :
                 activeCategory === 'entertainment' ? 'កម្សាន្ត' :
                 activeCategory === 'health' ? 'សុខភាព' : 'ព័ត៌មានថ្មីៗ'}
              </h2>
              <p className="text-gray-400 khmer-text">
                រកឃើញព័ត៌មានថ្មីៗ និងអត្ថបទគួរឱ្យចាប់អារម្មណ៍
              </p>
            </div>

            {filteredNews.length === 0 ? (
              <div className="text-center py-12">
                <div className="glass rounded-xl p-8 max-w-md mx-auto">
                  <p className="text-gray-400 khmer-text">
                    រកមិនឃើញព័ត៌មានដែលត្រូវនឹងការស្វែងរករបស់អ្នក
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNews.map((news, index) => (
                  <div 
                    key={news.id}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <NewsCard 
                      news={news} 
                      onLike={handleLike}
                      onComment={handleComment}
                    />
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>

        <Footer />
        <FloatingElements />
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;