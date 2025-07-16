import React, { useState, useEffect } from 'react';
import {
  EyeIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ClockIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';
import { mockNews } from '../../data/mockData';
import { aiService } from '../../services/aiService';

interface ContentMetrics {
  totalViews: number;
  totalLikes: number;
  totalComments: number;
  avgReadTime: number;
  topCategories: { name: string; count: number; growth: number }[];
  recentTrends: { topic: string; mentions: number; sentiment: string }[];
  readabilityScores: { category: string; score: number }[];
}

const ContentInsights: React.FC = () => {
  const [metrics, setMetrics] = useState<ContentMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7d');

  useEffect(() => {
    generateInsights();
  }, [timeRange]);

  const generateInsights = async () => {
    setIsLoading(true);

    // Calculate basic metrics from mock data
    const totalViews = mockNews.reduce((sum, news) => sum + news.views, 0);
    const totalLikes = mockNews.reduce((sum, news) => sum + news.likes, 0);
    const totalComments = mockNews.reduce((sum, news) => sum + news.comments.length, 0);

    // Category analysis
    const categoryStats = mockNews.reduce((acc, news) => {
      acc[news.category] = (acc[news.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topCategories = Object.entries(categoryStats)
      .map(([name, count]) => ({
        name,
        count,
        growth: Math.floor(Math.random() * 40) - 20 // Simulated growth
      }))
      .sort((a, b) => b.count - a.count);

    // AI-powered content analysis (if available)
    const readabilityScores: { category: string; score: number }[] = [];
    try {
      const isAIAvailable = await aiService.checkConnection();
      if (isAIAvailable) {
        // Analyze readability for each category
        for (const category of Object.keys(categoryStats)) {
          const categoryNews = mockNews.filter(news => news.category === category);
          if (categoryNews.length > 0) {
            const sampleContent = categoryNews[0].content;
            const analysis = await aiService.analyzeContent(sampleContent);
            readabilityScores.push({
              category,
              score: analysis.readabilityScore
            });
          }
        }
      }
    } catch (error) {
      console.warn('AI analysis not available:', error);
    }

    const insights: ContentMetrics = {
      totalViews,
      totalLikes,
      totalComments,
      avgReadTime: 3.5, // Simulated average
      topCategories,
      recentTrends: [
        { topic: 'បច្ចេកវិទ្យា AI', mentions: 15, sentiment: 'positive' },
        { topic: 'ការអភិវឌ្ឍន៍ហេដ្ឋារចនាសម្ព័ន្ធ', mentions: 12, sentiment: 'neutral' },
        { topic: 'កីឡាជាតិ', mentions: 8, sentiment: 'positive' }
      ],
      readabilityScores
    };

    setMetrics(insights);
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-400"></div>
      </div>
    );
  }

  if (!metrics) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold khmer-text">ការវិភាគមាតិកា</h2>
        <select
          aria-label="ជ្រើសរយៈពេល" // Khmer: Select time range
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-3 py-1 glass rounded border border-white/10 focus:border-indigo-500 focus:outline-none"
        >
          <option value="7d">7 ថ្ងៃចុងក្រោយ</option>
          <option value="30d">30 ថ្ងៃចុងក្រោយ</option>
          <option value="90d">90 ថ្ងៃចុងក្រោយ</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 khmer-text">ចំនួនមើលសរុប</p>
              <p className="text-2xl font-bold text-indigo-400">{metrics.totalViews.toLocaleString()}</p>
            </div>
            <EyeIcon className="w-8 h-8 text-indigo-400" />
          </div>
        </div>

        <div className="glass rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 khmer-text">ចំនួនចូលចិត្តសរុប</p>
              <p className="text-2xl font-bold text-red-400">{metrics.totalLikes.toLocaleString()}</p>
            </div>
            <HeartIcon className="w-8 h-8 text-red-400" />
          </div>
        </div>

        <div className="glass rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 khmer-text">មតិយោបល់សរុប</p>
              <p className="text-2xl font-bold text-green-400">{metrics.totalComments.toLocaleString()}</p>
            </div>
            <ChatBubbleLeftIcon className="w-8 h-8 text-green-400" />
          </div>
        </div>

        <div className="glass rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 khmer-text">ពេលអានមធ្យម</p>
              <p className="text-2xl font-bold text-yellow-400">{metrics.avgReadTime} នាទី</p>
            </div>
            <ClockIcon className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
      </div>

      {/* Category Performance */}
      <div className="glass rounded-xl p-6">
        <h3 className="text-lg font-bold mb-4 khmer-text">ការអនុវត្តតាមប្រភេទ</h3>
        <div className="space-y-4">
          {metrics.topCategories.map((category, index) => (
            <div key={category.name} className="flex items-center justify-between p-3 glass rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 flex items-center justify-center text-white text-sm font-bold">
                  {index + 1}
                </span>
                <span className="khmer-text font-medium">{category.name}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-gray-400">{category.count} អត្ថបទ</span>
                <div className={`flex items-center space-x-1 ${category.growth > 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                  {category.growth > 0 ? (
                    <ArrowTrendingUpIcon className="w-4 h-4" />
                  ) : (
                    <ArrowTrendingDownIcon className="w-4 h-4" />
                  )}
                  <span className="text-sm">{Math.abs(category.growth)}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Topics */}
      <div className="glass rounded-xl p-6">
        <h3 className="text-lg font-bold mb-4 khmer-text">ប្រធានបទពេញនិយម</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {metrics.recentTrends.map((trend, index) => (
            <div key={index} className="p-4 glass rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium khmer-text">{trend.topic}</h4>
                <span className={`px-2 py-1 rounded-full text-xs ${trend.sentiment === 'positive' ? 'bg-green-500/20 text-green-400' :
                  trend.sentiment === 'negative' ? 'bg-red-500/20 text-red-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                  {trend.sentiment}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <UserGroupIcon className="w-4 h-4" />
                <span>{trend.mentions} mentions</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI-Powered Readability Scores */}
      {metrics.readabilityScores.length > 0 && (
        <div className="glass rounded-xl p-6">
          <h3 className="text-lg font-bold mb-4 khmer-text">ពិន្ទុអានងាយ (AI Analysis)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {metrics.readabilityScores.map((score, index) => (
              <div key={index} className="p-4 glass rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="khmer-text font-medium">{score.category}</span>
                  <span className={`text-lg font-bold ${score.score >= 8 ? 'text-green-400' :
                    score.score >= 6 ? 'text-yellow-400' :
                      'text-red-400'
                    }`}>
                    {score.score}/10
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${score.score >= 8 ? 'bg-green-400' :
                      score.score >= 6 ? 'bg-yellow-400' :
                        'bg-red-400'
                      }`}
                    style={{ width: `${score.score * 10}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentInsights;