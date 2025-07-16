import React, { useState, useEffect } from 'react';
import { XMarkIcon, PhotoIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { mockCategories } from '../../data/mockData';
import { News } from '../../types';
import AIAssistant from './AIAssistant';

interface ArticleFormProps {
  article?: News | null;
  onSave: (article: Partial<News>) => void;
  onCancel: () => void;
}

const ArticleForm: React.FC<ArticleFormProps> = ({ article, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    image: '',
    author: '',
    featured: false,
    status: 'draft' as 'draft' | 'published' | 'archived'
  });
  const [showAI, setShowAI] = useState(false);

  useEffect(() => {
    if (article) {
      setFormData({
        title: article.title,
        excerpt: article.excerpt,
        content: article.content,
        category: article.category,
        image: article.image,
        author: article.author,
        featured: article.featured || false,
        status: article.status
      });
    }
  }, [article]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleAISummary = (summary: string) => {
    setFormData({ ...formData, excerpt: summary });
  };

  const handleAITranslation = (translation: string) => {
    setFormData({ ...formData, content: translation });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold khmer-text">
          {article ? 'កែសម្រួលអត្ថបទ' : 'បង្កើតអត្ថបទថ្មី'}
        </h1>
        <button
          onClick={onCancel}
          className="p-2 glass rounded-lg hover:bg-white/10"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
      </div>

      {/* AI Assistant Toggle */}
      <div className="mb-6">
        <button
          onClick={() => setShowAI(!showAI)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
            showAI 
              ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white' 
              : 'glass hover:bg-white/10'
          }`}
        >
          <SparklesIcon className="w-5 h-5" />
          <span className="khmer-text">AI Assistant</span>
        </button>
      </div>

      {/* AI Assistant Panel */}
      {showAI && (
        <div className="mb-6">
          <AIAssistant
            content={formData.content}
            onSummaryGenerated={handleAISummary}
            onTranslationGenerated={handleAITranslation}
          />
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="glass rounded-xl p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-2 khmer-text">ចំណងជើង</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 glass rounded-lg border border-white/10 focus:border-indigo-500 focus:outline-none khmer-text"
              required
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium mb-2 khmer-text">សេចក្តីសង្ខេប</label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 glass rounded-lg border border-white/10 focus:border-indigo-500 focus:outline-none khmer-text"
              required
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium mb-2 khmer-text">មាតិកា</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={10}
              className="w-full px-4 py-2 glass rounded-lg border border-white/10 focus:border-indigo-500 focus:outline-none khmer-text"
              required
            />
          </div>

          {/* Category and Author */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2 khmer-text">ប្រភេទ</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 glass rounded-lg border border-white/10 focus:border-indigo-500 focus:outline-none khmer-text"
                required
              >
                <option value="">ជ្រើសរើសប្រភេទ</option>
                {mockCategories.map((category) => (
                  <option key={category.id} value={category.nameKh}>
                    {category.nameKh}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 khmer-text">អ្នកនិពន្ធ</label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full px-4 py-2 glass rounded-lg border border-white/10 focus:border-indigo-500 focus:outline-none khmer-text"
                required
              />
            </div>
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium mb-2 khmer-text">រូបភាព URL</label>
            <div className="flex space-x-4">
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="flex-1 px-4 py-2 glass rounded-lg border border-white/10 focus:border-indigo-500 focus:outline-none"
                placeholder="https://example.com/image.jpg"
              />
              <button
                type="button"
                className="px-4 py-2 glass rounded-lg hover:bg-white/10 flex items-center space-x-2"
              >
                <PhotoIcon className="w-5 h-5" />
                <span>Upload</span>
              </button>
            </div>
            {formData.image && (
              <img
                src={formData.image}
                alt="Preview"
                className="mt-2 w-32 h-20 object-cover rounded-lg"
              />
            )}
          </div>

          {/* Options */}
          <div className="flex items-center space-x-6">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="rounded border-white/10 bg-transparent"
              />
              <span className="khmer-text">អត្ថបទពិសេស</span>
            </label>

            <div className="flex items-center space-x-2">
              <label className="khmer-text">ស្ថានភាព:</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="px-3 py-1 glass rounded border border-white/10 focus:border-indigo-500 focus:outline-none"
              >
                <option value="draft">ព្រាង</option>
                <option value="published">បានបោះពុម្ព</option>
                <option value="archived">បានទុកក្នុងបណ្ណសារ</option>
              </select>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 glass rounded-lg hover:bg-white/10 khmer-text"
          >
            បោះបង់
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all khmer-text"
          >
            រក្សាទុក
          </button>
        </div>
      </form>
    </div>
  );
};

export default ArticleForm;