interface SummarizationRequest {
  content: string;
  language: 'khmer' | 'english';
  maxLength?: number;
  style?: 'news' | 'academic' | 'casual';
}

interface SummarizationResponse {
  summary: string;
  keyPoints: string[];
  sentiment: 'positive' | 'negative' | 'neutral';
  confidence: number;
  processingTime: number;
}

interface TranslationRequest {
  text: string;
  from: 'khmer' | 'english';
  to: 'khmer' | 'english';
}

interface ContentAnalysis {
  readabilityScore: number;
  wordCount: number;
  estimatedReadTime: number;
  topics: string[];
  entities: string[];
}

class AIService {
  private baseURL: string;
  private model: string;

  constructor() {
    this.baseURL = 'http://localhost:11434';
    this.model = 'deepseek-r1:latest';
  }

  // Check if Ollama is running and model is available
  async checkConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseURL}/api/tags`);
      if (!response.ok) return false;
      
      const data = await response.json();
      return data.models?.some((model: any) => model.name.includes('deepseek-r1'));
    } catch (error) {
      console.warn('Ollama connection failed:', error);
      return false;
    }
  }

  // Generate AI-powered summary for Khmer content
  async summarizeContent(request: SummarizationRequest): Promise<SummarizationResponse> {
    const startTime = Date.now();
    
    try {
      const prompt = this.buildSummarizationPrompt(request);
      
      const response = await fetch(`${this.baseURL}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.model,
          prompt,
          stream: false,
          options: {
            temperature: 0.3,
            top_p: 0.9,
            max_tokens: 500,
          }
        })
      });

      if (!response.ok) {
        throw new Error(`AI service error: ${response.statusText}`);
      }

      const data = await response.json();
      const processingTime = Date.now() - startTime;

      return this.parseSummarizationResponse(data.response, processingTime);
    } catch (error) {
      console.error('Summarization failed:', error);
      return this.getFallbackSummary(request.content, Date.now() - startTime);
    }
  }

  // Translate content between Khmer and English
  async translateContent(request: TranslationRequest): Promise<string> {
    try {
      const prompt = `Translate the following text from ${request.from} to ${request.to}. Maintain the original meaning and context:

${request.text}

Translation:`;

      const response = await fetch(`${this.baseURL}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.model,
          prompt,
          stream: false,
          options: {
            temperature: 0.2,
            max_tokens: 1000,
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Translation service error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.response.trim();
    } catch (error) {
      console.error('Translation failed:', error);
      return request.text; // Return original text as fallback
    }
  }

  // Analyze content for insights
  async analyzeContent(content: string): Promise<ContentAnalysis> {
    try {
      const prompt = `Analyze the following Khmer news content and provide insights:

${content}

Please provide:
1. Readability score (1-10)
2. Word count
3. Estimated reading time in minutes
4. Main topics (comma-separated)
5. Named entities (people, places, organizations)

Format your response as JSON.`;

      const response = await fetch(`${this.baseURL}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.model,
          prompt,
          stream: false,
          options: {
            temperature: 0.1,
            max_tokens: 300,
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Analysis service error: ${response.statusText}`);
      }

      const data = await response.json();
      return this.parseAnalysisResponse(data.response, content);
    } catch (error) {
      console.error('Content analysis failed:', error);
      return this.getFallbackAnalysis(content);
    }
  }

  // Generate article suggestions based on trending topics
  async generateArticleSuggestions(category: string, count: number = 5): Promise<string[]> {
    try {
      const prompt = `Generate ${count} engaging Khmer news article title suggestions for the ${category} category. Focus on current trends and topics that would interest Cambodian readers. Provide only the titles, one per line.`;

      const response = await fetch(`${this.baseURL}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.model,
          prompt,
          stream: false,
          options: {
            temperature: 0.7,
            max_tokens: 400,
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Suggestion service error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.response.split('\n').filter((line: string) => line.trim().length > 0);
    } catch (error) {
      console.error('Article suggestion failed:', error);
      return this.getFallbackSuggestions(category);
    }
  }

  private buildSummarizationPrompt(request: SummarizationRequest): string {
    const styleInstructions = {
      news: 'in a journalistic style suitable for news readers',
      academic: 'in an academic and formal tone',
      casual: 'in a casual and easy-to-understand manner'
    };

    return `Please summarize the following ${request.language} content ${styleInstructions[request.style || 'news']}. 
Keep the summary under ${request.maxLength || 150} words and maintain the original language.

Content:
${request.content}

Please provide:
1. A concise summary
2. 3-5 key points
3. Overall sentiment (positive/negative/neutral)
4. Confidence level (0-100%)

Format your response as JSON with keys: summary, keyPoints, sentiment, confidence`;
  }

  private parseSummarizationResponse(response: string, processingTime: number): SummarizationResponse {
    try {
      const parsed = JSON.parse(response);
      return {
        summary: parsed.summary || response.substring(0, 200),
        keyPoints: parsed.keyPoints || [],
        sentiment: parsed.sentiment || 'neutral',
        confidence: parsed.confidence || 75,
        processingTime
      };
    } catch (error) {
      // Fallback parsing if JSON parsing fails
      return {
        summary: response.substring(0, 200),
        keyPoints: [],
        sentiment: 'neutral',
        confidence: 60,
        processingTime
      };
    }
  }

  private parseAnalysisResponse(response: string, content: string): ContentAnalysis {
    try {
      const parsed = JSON.parse(response);
      return {
        readabilityScore: parsed.readabilityScore || 7,
        wordCount: parsed.wordCount || content.split(' ').length,
        estimatedReadTime: parsed.estimatedReadTime || Math.ceil(content.split(' ').length / 200),
        topics: parsed.topics || [],
        entities: parsed.entities || []
      };
    } catch (error) {
      return this.getFallbackAnalysis(content);
    }
  }

  private getFallbackSummary(content: string, processingTime: number): SummarizationResponse {
    const sentences = content.split('។').filter(s => s.trim().length > 0);
    const summary = sentences.slice(0, 2).join('។') + '។';
    
    return {
      summary,
      keyPoints: sentences.slice(0, 3).map(s => s.trim()),
      sentiment: 'neutral',
      confidence: 50,
      processingTime
    };
  }

  private getFallbackAnalysis(content: string): ContentAnalysis {
    const wordCount = content.split(' ').length;
    return {
      readabilityScore: 7,
      wordCount,
      estimatedReadTime: Math.ceil(wordCount / 200),
      topics: ['ព័ត៌មានទូទៅ'],
      entities: []
    };
  }

  private getFallbackSuggestions(category: string): string[] {
    const suggestions = {
      'បច្ចេកវិទ្យា': [
        'បច្ចេកវិទ្យា AI ថ្មីៗនៅកម្ពុជា',
        'ការអភិវឌ្ឍន៍ស្មាតហ្វូននៅតំបន់',
        'ការប្រើប្រាស់អ៊ីនធឺណិតក្នុងការអប់រំ'
      ],
      'នយោបាយ': [
        'ការអភិវឌ្ឍន៍ហេដ្ឋារចនាសម្ព័ន្ធថ្មី',
        'នយោបាយសេដ្ឋកិច្ចប្រចាំឆ្នាំ',
        'ការកែទម្រង់រដ្ឋបាល'
      ],
      'កីឡា': [
        'ការប្រកួតបាល់ទាត់ជាតិ',
        'កីឡាករកម្ពុជានៅអន្តរជាតិ',
        'ការអភិវឌ្ឍន៍កីឡាក្នុងស្រុក'
      ]
    };

    return suggestions[category as keyof typeof suggestions] || [
      'ព័ត៌មានថ្មីៗប្រចាំថ្ងៃ',
      'ការអភិវឌ្ឍន៍សង្គម',
      'វប្បធម៌និងប្រពៃណី'
    ];
  }
}

export const aiService = new AIService();
export type { SummarizationRequest, SummarizationResponse, TranslationRequest, ContentAnalysis };