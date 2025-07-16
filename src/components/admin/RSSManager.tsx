import React, { useState } from 'react';
import { PlusIcon, TrashIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { mockRSSFeeds } from '../../data/mockData';
import { RSSFeed } from '../../types';

const RSSManager: React.FC = () => {
  const [feeds, setFeeds] = useState<RSSFeed[]>(mockRSSFeeds);
  const [showForm, setShowForm] = useState(false);
  const [newFeed, setNewFeed] = useState({
    title: '',
    url: '',
    category: '',
    active: true
  });

  const handleAddFeed = (e: React.FormEvent) => {
    e.preventDefault();
    const feed: RSSFeed = {
      id: Date.now(),
      ...newFeed,
      lastFetched: new Date().toLocaleDateString('km-KH')
    };
    setFeeds([...feeds, feed]);
    setNewFeed({ title: '', url: '', category: '', active: true });
    setShowForm(false);
  };

  const handleDeleteFeed = (id: number) => {
    if (confirm('តើអ្នកពិតជាចង់លុប RSS Feed នេះមែនទេ?')) {
      setFeeds(feeds.filter(feed => feed.id !== id));
    }
  };

  const handleToggleActive = (id: number) => {
    setFeeds(feeds.map(feed => 
      feed.id === id ? { ...feed, active: !feed.active } : feed
    ));
  };

  const handleRefresh = (id: number) => {
    setFeeds(feeds.map(feed => 
      feed.id === id 
        ? { ...feed, lastFetched: new Date().toLocaleDateString('km-KH') }
        : feed
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold khmer-text">គ្រប់គ្រង RSS Feeds</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Add RSS Feed</span>
        </button>
      </div>

      {/* Add Feed Form */}
      {showForm && (
        <div className="glass rounded-xl p-6">
          <h2 className="text-lg font-bold mb-4">បន្ថែម RSS Feed ថ្មី</h2>
          <form onSubmit={handleAddFeed} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="ចំណងជើង Feed"
                value={newFeed.title}
                onChange={(e) => setNewFeed({ ...newFeed, title: e.target.value })}
                className="px-4 py-2 glass rounded-lg border border-white/10 focus:border-indigo-500 focus:outline-none"
                required
              />
              <input
                type="text"
                placeholder="ប្រភេទ"
                value={newFeed.category}
                onChange={(e) => setNewFeed({ ...newFeed, category: e.target.value })}
                className="px-4 py-2 glass rounded-lg border border-white/10 focus:border-indigo-500 focus:outline-none khmer-text"
                required
              />
            </div>
            <input
              type="url"
              placeholder="RSS Feed URL"
              value={newFeed.url}
              onChange={(e) => setNewFeed({ ...newFeed, url: e.target.value })}
              className="w-full px-4 py-2 glass rounded-lg border border-white/10 focus:border-indigo-500 focus:outline-none"
              required
            />
            <div className="flex items-center justify-end space-x-4">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 glass rounded-lg hover:bg-white/10"
              >
                បោះបង់
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all"
              >
                បន្ថែម
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Feeds List */}
      <div className="glass rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-white/10">
              <tr>
                <th className="text-left p-4">ចំណងជើង</th>
                <th className="text-left p-4 khmer-text">ប្រភេទ</th>
                <th className="text-left p-4">URL</th>
                <th className="text-left p-4">Last Fetched</th>
                <th className="text-left p-4 khmer-text">ស្ថានភាព</th>
                <th className="text-left p-4 khmer-text">សកម្មភាព</th>
              </tr>
            </thead>
            <tbody>
              {feeds.map((feed) => (
                <tr key={feed.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-4 font-medium">{feed.title}</td>
                  <td className="p-4 khmer-text">{feed.category}</td>
                  <td className="p-4">
                    <a 
                      href={feed.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-indigo-400 hover:text-indigo-300 truncate block max-w-xs"
                    >
                      {feed.url}
                    </a>
                  </td>
                  <td className="p-4 text-sm text-gray-400">{feed.lastFetched}</td>
                  <td className="p-4">
                    <button
                      onClick={() => handleToggleActive(feed.id)}
                      className={`px-2 py-1 rounded-full text-sm ${
                        feed.active 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-gray-500/20 text-gray-400'
                      }`}
                    >
                      {feed.active ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleRefresh(feed.id)}
                        className="p-1 hover:bg-white/10 rounded"
                        title="Refresh Feed"
                      >
                        <ArrowPathIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteFeed(feed.id)}
                        className="p-1 hover:bg-red-500/20 text-red-400 rounded"
                        title="Delete Feed"
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

export default RSSManager;