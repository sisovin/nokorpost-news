import React from 'react';

interface CategoryTabsProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const categories = [
  { id: 'all', name: 'ទាំងអស់', icon: '📰' },
  { id: 'politics', name: 'នយោបាយ', icon: '🏛️' },
  { id: 'technology', name: 'បច្ចេកវិទ្យា', icon: '💻' },
  { id: 'sports', name: 'កីឡា', icon: '⚽' },
  { id: 'business', name: 'អាជីវកម្ម', icon: '💼' },
  { id: 'entertainment', name: 'កម្សាន្ត', icon: '🎭' },
  { id: 'health', name: 'សុខភាព', icon: '🏥' },
];

const CategoryTabs: React.FC<CategoryTabsProps> = ({ activeCategory, setActiveCategory }) => {
  return (
    <div className="sticky top-16 z-40 glass border-b border-white/10 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex overflow-x-auto scrollbar-hide py-4 space-x-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-300 khmer-text ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-lg shadow-indigo-500/25'
                  : 'glass hover:bg-white/10'
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              <span className="font-medium">{category.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryTabs;