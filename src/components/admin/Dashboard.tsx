import React from 'react';
import { 
  DocumentTextIcon, 
  UsersIcon, 
  EyeIcon, 
  HeartIcon,
  TrendingUpIcon,
  ChatBubbleLeftIcon
} from '@heroicons/react/24/outline';
import { mockNews, mockUsers } from '../../data/mockData';

const Dashboard: React.FC = () => {
  const stats = [
    {
      name: 'សរុបអត្ថបទ',
      value: mockNews.length,
      icon: DocumentTextIcon,
      color: 'from-blue-500 to-cyan-500',
      change: '+12%'
    },
    {
      name: 'អ្នកប្រើប្រាស់',
      value: mockUsers.length,
      icon: UsersIcon,
      color: 'from-green-500 to-emerald-500',
      change: '+8%'
    },
    {
      name: 'ចំនួនមើល',
      value: mockNews.reduce((sum, news) => sum + news.views, 0),
      icon: EyeIcon,
      color: 'from-purple-500 to-pink-500',
      change: '+23%'
    },
    {
      name: 'ចំនួនចូលចិត្ត',
      value: mockNews.reduce((sum, news) => sum + news.likes, 0),
      icon: HeartIcon,
      color: 'from-red-500 to-rose-500',
      change: '+15%'
    }
  ];

  const recentArticles = mockNews.slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold khmer-text">ទំព័រដើម</h1>
        <div className="text-sm text-gray-400">
          ថ្ងៃនេះ: {new Date().toLocaleDateString('km-KH')}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="glass rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 khmer-text">{stat.name}</p>
                <p className="text-2xl font-bold">{stat.value.toLocaleString()}</p>
                <div className="flex items-center space-x-1 mt-1">
                  <TrendingUpIcon className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-green-400">{stat.change}</span>
                </div>
              </div>
              <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Articles */}
      <div className="glass rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4 khmer-text">អត្ថបទថ្មីៗ</h2>
        <div className="space-y-4">
          {recentArticles.map((article) => (
            <div key={article.id} className="flex items-center space-x-4 p-4 glass rounded-lg">
              <img
                src={article.image}
                alt={article.title}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-medium khmer-text line-clamp-1">{article.title}</h3>
                <div className="flex items-center space-x-4 mt-1 text-sm text-gray-400">
                  <span className="khmer-text">{article.author}</span>
                  <span>{article.date}</span>
                  <div className="flex items-center space-x-1">
                    <EyeIcon className="w-4 h-4" />
                    <span>{article.views}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <HeartIcon className="w-4 h-4" />
                    <span>{article.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <ChatBubbleLeftIcon className="w-4 h-4" />
                    <span>{article.comments.length}</span>
                  </div>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${
                article.status === 'published' ? 'bg-green-500/20 text-green-400' :
                article.status === 'draft' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-gray-500/20 text-gray-400'
              }`}>
                {article.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;