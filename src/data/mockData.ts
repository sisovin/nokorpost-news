import { News, Comment, Category, User, RSSFeed } from '../types';

export const mockCategories: Category[] = [
  { id: 1, name: 'Politics', nameKh: 'នយោបាយ', slug: 'politics', icon: '🏛️', color: 'bg-red-500' },
  { id: 2, name: 'Technology', nameKh: 'បច្ចេកវិទ្យា', slug: 'technology', icon: '💻', color: 'bg-blue-500' },
  { id: 3, name: 'Sports', nameKh: 'កីឡា', slug: 'sports', icon: '⚽', color: 'bg-green-500' },
  { id: 4, name: 'Business', nameKh: 'អាជីវកម្ម', slug: 'business', icon: '💼', color: 'bg-yellow-500' },
  { id: 5, name: 'Entertainment', nameKh: 'កម្សាន្ត', slug: 'entertainment', icon: '🎭', color: 'bg-purple-500' },
  { id: 6, name: 'Health', nameKh: 'សុខភាព', slug: 'health', icon: '🏥', color: 'bg-pink-500' },
];

export const mockUsers: User[] = [
  {
    id: 1,
    name: 'លី សុវណ្ណ',
    email: 'admin@nokorpost.com',
    role: 'admin',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
    createdAt: '២០២៤-០១-០១',
    lastLogin: '២០២៥-០១-១៥'
  },
  {
    id: 2,
    name: 'ចាន់ សុភា',
    email: 'editor@nokorpost.com',
    role: 'editor',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
    createdAt: '២០២៤-០២-០១',
    lastLogin: '២០២៥-០១-១៤'
  },
  {
    id: 3,
    name: 'ស៊ុន ពិសាច',
    email: 'author@nokorpost.com',
    role: 'author',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100',
    createdAt: '២០២៤-០៣-០១',
    lastLogin: '២០២៥-០១-១៣'
  }
];

export const mockComments: Comment[] = [
  {
    id: 1,
    newsId: 1,
    author: 'កេង សុវណ្ណរ៉ា',
    content: 'អត្ថបទនេះពិតជាមានប្រយោជន៍ណាស់។ សូមអរគុណចំពោះការចែករំលែក។',
    date: '២០២៥-០១-១៥',
    likes: 12
  },
  {
    id: 2,
    newsId: 1,
    author: 'ពេជ្រ សុវណ្ណី',
    content: 'ខ្ញុំយល់ស្រប។ បច្ចេកវិទ្យាពិតជាមានការរីកចម្រើនយ៉ាងលឿន។',
    date: '២០២៥-០១-១៤',
    likes: 8
  }
];

export const mockRSSFeeds: RSSFeed[] = [
  {
    id: 1,
    title: 'BBC Khmer',
    url: 'https://www.bbc.com/khmer/index.xml',
    category: 'នយោបាយ',
    lastFetched: '២០២៥-០១-១៥',
    active: true
  },
  {
    id: 2,
    title: 'VOA Khmer',
    url: 'https://khmer.voanews.com/api/epiqq',
    category: 'ព័ត៌មានទូទៅ',
    lastFetched: '២០២៥-០១-១៥',
    active: true
  }
];

export const mockNews: News[] = [
  {
    id: 1,
    title: "បច្ចេកវិទ្យាថ្មីនៅកម្ពុជាកំពុងរីកចម្រើនយ៉ាងឆាប់រហ័ស",
    excerpt: "ការរីកចម្រើននៃបច្ចេកវិទ្យាឌីជីថលនៅកម្ពុជាបានផ្លាស់ប្តូរវិធីរស់នៅរបស់ប្រជាពលរដ្ឋ និងបានជួយសម្រួលដល់ការអភិវឌ្ឍន៍សេដ្ឋកិច្ច។",
    content: "ការរីកចម្រើននៃបច្ចេកវិទ្យាឌីជីថលនៅកម្ពុជាបានផ្លាស់ប្តូរវិធីរស់នៅរបស់ប្រជាពលរដ្ឋ និងបានជួយសម្រួលដល់ការអភិវឌ្ឍន៍សេដ្ឋកិច្ច។ ក្នុងរយៈពេលប៉ុន្មានឆ្នាំចុងក្រោយនេះ យើងបានឃើញការកើនឡើងគួរឱ្យកត់សម្គាល់នៃការប្រើប្រាស់ស្មាតហ្វូន និងអ៊ីនធឺណិត។",
    category: "បច្ចេកវិទ្យា",
    image: "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=800",
    date: "២០២៥-០១-១៥",
    author: "លី សុវណ្ណ",
    featured: true,
    status: 'published',
    likes: 45,
    views: 1250,
    comments: mockComments.filter(c => c.newsId === 1)
  },
  {
    id: 2,
    title: "ការអភិវឌ្ឍន៍ហេដ្ឋារចនាសម្ព័ន្ធថ្មីនៅរាជធានីភ្នំពេញ",
    excerpt: "រាជរដ្ឋាភិបាលកម្ពុជាបានចាប់ផ្តើមគម្រោងអភិវឌ្ឍន៍ហេដ្ឋារចនាសម្ព័ន្ធថ្មី ដើម្បីបង្កើនការជាប់ទាក់ទងនិងសម្រួលដល់ការធ្វើដំណើរ។",
    content: "រាជរដ្ឋាភិបាលកម្ពុជាបានចាប់ផ្តើមគម្រោងអភិវឌ្ឍន៍ហេដ្ឋារចនាសម្ព័ន្ធថ្មី ដើម្បីបង្កើនការជាប់ទាក់ទងនិងសម្រួលដល់ការធ្វើដំណើរ។ គម្រោងនេះរួមមានការសាងសង់ផ្លូវថ្មី ស្ពាន និងប្រព័ន្ធដឹកជញ្ជូនសាធារណៈ។",
    category: "នយោបាយ",
    image: "https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=800",
    date: "២០២៥-០១-១៤",
    author: "ចាន់ សុភា",
    featured: true,
    status: 'published',
    likes: 32,
    views: 890,
    comments: []
  }
];