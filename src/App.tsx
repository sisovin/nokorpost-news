import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import CategoryTabs from './components/CategoryTabs';
import NewsCard from './components/NewsCard';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';
import FloatingElements from './components/FloatingElements';
import { mockNews } from './data/mockNews';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('light', !darkMode);
  };

  const featuredNews = mockNews.filter(news => news.featured);
  
  const filteredNews = useMemo(() => {
    return mockNews.filter(news => {
      const matchesCategory = activeCategory === 'all' || 
        (activeCategory === 'politics' && news.category === 'នយោបាយ') ||
        (activeCategory === 'technology' && news.category === 'បច្ចេកវិទ្យា') ||
        (activeCategory === 'sports' && news.category === 'កីឡា') ||
        (activeCategory === 'business' && news.category === 'អាជីវកម្ម') ||
        (activeCategory === 'entertainment' && news.category === 'កម្សាន្ត') ||
        (activeCategory === 'health' && news.category === 'សុខភាព');

      const matchesSearch = searchTerm === '' || 
        news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        news.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        news.category.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  React.useEffect(() => {
    document.documentElement.classList.toggle('light', !darkMode);
  }, [darkMode]);

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
                    <NewsCard news={news} />
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>

        <Footer />
        <FloatingElements />
      </div>
    </div>
  );
}

export default App;