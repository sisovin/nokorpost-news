import React, { useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';
import { mockNews, mockCategories } from '../../data/mockData';
import { News } from '../../types';
import ArticleForm from './ArticleForm';

const ArticleManager: React.FC = () => {
  const [articles, setArticles] = useState<News[]>(mockNews);
  const [showForm, setShowForm] = useState(false);
  const [editingArticle, setEditingArticle] = useState<News | null>(null);
  const [filter, setFilter] = useState('all');

  const handleSave = (articleData: Partial<News>) => {
    if (editingArticle) {
      setArticles(articles.map(article => 
        article.id === editingArticle.id 
          ? { ...article, ...articleData }
          : article
      ));
    } else {
      const newArticle: News = {
        id: Date.now(),
        ...articleData,
        date: new Date().toLocaleDateString('km-KH'),
        likes: 0,
        views: 0,
        comments: []
      } as News;
      setArticles([newArticle, ...articles]);
    }
    setShowForm(false);
    setEditingArticle(null);
  };

  const handleDelete = (id: number) => {
    if (confirm('តើអ្នកពិតជាចង់លុបអត្ថបទនេះមែនទេ?')) {
      setArticles(articles.filter(article => article.id !== id));
    }
  };

  const filteredArticles = articles.filter(article => 
    filter === 'all' || article.status === filter
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-500';
      case 'draft': return 'bg-yellow-500';
      case 'archived': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  if (showForm) {
    return (
      <ArticleForm
        article={editingArticle}
        onSave={handleSave}
        onCancel={() => {
          setShowForm(false);
          setEditingArticle(null);
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold khmer-text">គ្រប់គ្រងអត្ថបទ</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all"
        >
          <PlusIcon className="w-5 h-5" />
          <span className="khmer-text">បង្កើតអត្ថបទថ្មី</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex space-x-4">
        {[
          { id: 'all', name: 'ទាំងអស់' },
          { id: 'published', name: 'បានបោះពុម្ព' },
          { id: 'draft', name: 'ព្រាង' },
          { id: 'archived', name: 'បានទុកក្នុងបណ្ណសារ' }
        ].map((status) => (
          <button
            key={status.id}
            onClick={() => setFilter(status.id)}
            className={`px-4 py-2 rounded-lg transition-all khmer-text ${
              filter === status.id
                ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white'
                : 'glass hover:bg-white/10'
            }`}
          >
            {status.name}
          </button>
        ))}
      </div>

      {/* Articles Table */}
      <div className="glass rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-white/10">
              <tr>
                <th className="text-left p-4 khmer-text">ចំណងជើង</th>
                <th className="text-left p-4 khmer-text">ប្រភេទ</th>
                <th className="text-left p-4 khmer-text">អ្នកនិពន្ធ</th>
                <th className="text-left p-4 khmer-text">ស្ថានភាព</th>
                <th className="text-left p-4 khmer-text">ចំនួនមើល</th>
                <th className="text-left p-4 khmer-text">សកម្មភាព</th>
              </tr>
            </thead>
            <tbody>
              {filteredArticles.map((article) => (
                <tr key={article.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="font-medium khmer-text line-clamp-1">{article.title}</h3>
                        <p className="text-sm text-gray-400">{article.date}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-sm khmer-text">
                      {article.category}
                    </span>
                  </td>
                  <td className="p-4 khmer-text">{article.author}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 ${getStatusColor(article.status)} text-white rounded-full text-sm`}>
                      {article.status}
                    </span>
                  </td>
                  <td className="p-4">{article.views}</td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 hover:bg-white/10 rounded">
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setEditingArticle(article);
                          setShowForm(true);
                        }}
                        className="p-1 hover:bg-white/10 rounded"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(article.id)}
                        className="p-1 hover:bg-red-500/20 text-red-400 rounded"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ArticleManager;