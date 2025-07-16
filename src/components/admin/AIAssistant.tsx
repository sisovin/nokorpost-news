import React, { useState, useEffect } from 'react';
import { 
  SparklesIcon, 
  LanguageIcon, 
  DocumentTextIcon,
  LightBulbIcon,
  ClockIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { aiService, SummarizationRequest, ContentAnalysis } from '../../services/aiService';

interface AIAssistantProps {
  content?: string;
  onSummaryGenerated?: (summary: string) => void;
  onTranslationGenerated?: (translation: string) => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ 
  content = '', 
  onSummaryGenerated, 
  onTranslationGenerated 
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('summarize');
  const [summary, setSummary] = useState('');
  const [translation, setTranslation] = useState('');
  const [analysis, setAnalysis] = useState<ContentAnalysis | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    checkAIConnection();
  }, []);

  const checkAIConnection = async () => {
    const connected = await aiService.checkConnection();
    setIsConnected(connected);
    if (!connected) {
      setError('Ollama service not available. Please ensure Ollama is running with DeepSeek R1 model.');
    }
  };

  const handleSummarize = async () => {
    if (!content.trim()) {
      setError('Please provide content to summarize');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const request: SummarizationRequest = {
        content,
        language: 'khmer',
        maxLength: 150,
        style: 'news'
      };

      const result = await aiService.summarizeContent(request);
      setSummary(result.summary);
      onSummaryGenerated?.(result.summary);
    } catch (err) {
      setError('Failed to generate summary. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTranslate = async (direction: 'to-english' | 'to-khmer') => {
    if (!content.trim()) {
      setError('Please provide content to translate');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await aiService.translateContent({
        text: content,
        from: direction === 'to-english' ? 'khmer' : 'english',
        to: direction === 'to-english' ? 'english' : 'khmer'
      });

      setTranslation(result);
      onTranslationGenerated?.(result);
    } catch (err) {
      setError('Failed to translate content. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalyze = async () => {
    if (!content.trim()) {
      setError('Please provide content to analyze');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await aiService.analyzeContent(content);
      setAnalysis(result);
    } catch (err) {
      setError('Failed to analyze content. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateSuggestions = async (category: string) => {
    setIsLoading(true);
    setError('');

    try {
      const result = await aiService.generateArticleSuggestions(category, 5);
      setSuggestions(result);
    } catch (err) {
      setError('Failed to generate suggestions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const tabs = [
    { id: 'summarize', name: 'សេចក្តីសង្ខេប', icon: DocumentTextIcon },
    { id: 'translate', name: 'បកប្រែ', icon: LanguageIcon },
    { id: 'analyze', name: 'វិភាគ', icon: ChartBarIcon },
    { id: 'suggest', name: 'ផ្តល់យោបល់', icon: LightBulbIcon }
  ];

  return (
    <div className="glass rounded-xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <SparklesIcon className="w-6 h-6 text-indigo-400" />
          <h3 className="text-lg font-bold khmer-text">AI Assistant</h3>
        </div>
        <div className="flex items-center space-x-2">
          {isConnected ? (
            <div className="flex items-center space-x-1 text-green-400 text-sm">
              <CheckCircleIcon className="w-4 h-4" />
              <span>Connected</span>
            </div>
          ) : (
            <div className="flex items-center space-x-1 text-red-400 text-sm">
              <ExclamationTriangleIcon className="w-4 h-4" />
              <span>Offline</span>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      {!isConnected && (
        <div className="p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
          <h4 className="font-medium text-yellow-400 mb-2">Setup Instructions:</h4>
          <ol className="text-sm text-yellow-300 space-y-1 list-decimal list-inside">
            <li>Install Ollama: <code className="bg-black/30 px-1 rounded">curl -fsSL https://ollama.ai/install.sh | sh</code></li>
            <li>Pull DeepSeek R1: <code className="bg-black/30 px-1 rounded">ollama pull deepseek-r1</code></li>
            <li>Start Ollama: <code className="bg-black/30 px-1 rounded">ollama serve</code></li>
            <li>Refresh this page</li>
          </ol>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex space-x-2 border-b border-white/10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-t-lg transition-all khmer-text ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white'
                : 'hover:bg-white/10'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.name}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-4">
        {activeTab === 'summarize' && (
          <div className="space-y-4">
            <button
              onClick={handleSummarize}
              disabled={!isConnected || isLoading || !content.trim()}
              className="w-full px-4 py-2 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed khmer-text"
            >
              {isLoading ? 'កំពុងបង្កើតសេចក្តីសង្ខេប...' : 'បង្កើតសេចក្តីសង្ខេប'}
            </button>
            {summary && (
              <div className="p-4 glass rounded-lg">
                <h4 className="font-medium mb-2 khmer-text">សេចក្តីសង្ខេប:</h4>
                <p className="text-gray-300 khmer-text leading-relaxed">{summary}</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'translate' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleTranslate('to-english')}
                disabled={!isConnected || isLoading || !content.trim()}
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Translating...' : 'Khmer → English'}
              </button>
              <button
                onClick={() => handleTranslate('to-khmer')}
                disabled={!isConnected || isLoading || !content.trim()}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed khmer-text"
              >
                {isLoading ? 'កំពុងបកប្រែ...' : 'English → ខ្មែរ'}
              </button>
            </div>
            {translation && (
              <div className="p-4 glass rounded-lg">
                <h4 className="font-medium mb-2">Translation:</h4>
                <p className="text-gray-300 leading-relaxed">{translation}</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'analyze' && (
          <div className="space-y-4">
            <button
              onClick={handleAnalyze}
              disabled={!isConnected || isLoading || !content.trim()}
              className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed khmer-text"
            >
              {isLoading ? 'កំពុងវិភាគ...' : 'វិភាគមាតិកា'}
            </button>
            {analysis && (
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 glass rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <ClockIcon className="w-4 h-4 text-indigo-400" />
                    <span className="font-medium khmer-text">ពេលវេលាអាន</span>
                  </div>
                  <p className="text-2xl font-bold text-indigo-400">{analysis.estimatedReadTime} នាទី</p>
                </div>
                <div className="p-4 glass rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <DocumentTextIcon className="w-4 h-4 text-cyan-400" />
                    <span className="font-medium khmer-text">ចំនួនពាក្យ</span>
                  </div>
                  <p className="text-2xl font-bold text-cyan-400">{analysis.wordCount}</p>
                </div>
                <div className="p-4 glass rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <ChartBarIcon className="w-4 h-4 text-green-400" />
                    <span className="font-medium khmer-text">ពិន្ទុអានងាយ</span>
                  </div>
                  <p className="text-2xl font-bold text-green-400">{analysis.readabilityScore}/10</p>
                </div>
                <div className="p-4 glass rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <LightBulbIcon className="w-4 h-4 text-yellow-400" />
                    <span className="font-medium khmer-text">ប្រធានបទ</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {analysis.topics.map((topic, index) => (
                      <span key={index} className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs khmer-text">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'suggest' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {['បច្ចេកវិទ្យា', 'នយោបាយ', 'កីឡា', 'អាជីវកម្ម'].map((category) => (
                <button
                  key={category}
                  onClick={() => handleGenerateSuggestions(category)}
                  disabled={!isConnected || isLoading}
                  className="px-3 py-2 glass rounded-lg hover:bg-white/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed khmer-text text-sm"
                >
                  {category}
                </button>
              ))}
            </div>
            {suggestions.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium khmer-text">ការណែនាំអត្ថបទ:</h4>
                {suggestions.map((suggestion, index) => (
                  <div key={index} className="p-3 glass rounded-lg hover:bg-white/5 transition-all">
                    <p className="khmer-text">{suggestion}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-400"></div>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;