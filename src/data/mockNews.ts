export interface News {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  date: string;
  author: string;
  featured?: boolean;
}

export const mockNews: News[] = [
  {
    id: 1,
    title: "បច្ចេកវិទ្យាថ្មីនៅកម្ពុជាកំពុងរីកចម្រើនយ៉ាងឆាប់រហ័ស",
    excerpt: "ការរីកចម្រើននៃបច្ចេកវិទ្យាឌីជីថលនៅកម្ពុជាបានផ្លាស់ប្តូរវិធីរស់នៅរបស់ប្រជាពលរដ្ឋ និងបានជួយសម្រួលដល់ការអភិវឌ្ឍន៍សេដ្ឋកិច្ច។",
    category: "បច្ចេកវិទ្យា",
    image: "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=800",
    date: "២០២៥-០១-១៥",
    author: "លី សុវណ្ណ",
    featured: true
  },
  {
    id: 2,
    title: "ការអភិវឌ្ឍន៍ហេដ្ឋារចនាសម្ព័ន្ធថ្មីនៅរាជធានីភ្នំពេញ",
    excerpt: "រាជរដ្ឋាភិបាលកម្ពុជាបានចាប់ផ្តើមគម្រោងអភិវឌ្ឍន៍ហេដ្ឋារចនាសម្ព័ន្ធថ្មី ដើម្បីបង្កើនការជាប់ទាក់ទងនិងសម្រួលដល់ការធ្វើដំណើរ។",
    category: "នយោបាយ",
    image: "https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=800",
    date: "២០២៥-០១-១៤",
    author: "ចាន់ សុភា",
    featured: true
  },
  {
    id: 3,
    title: "ក្រុមបាល់ទាត់ជាតិកម្ពុជារៀបចំសម្រាប់ការប្រកួតថ្មី",
    excerpt: "ក្រុមបាល់ទាត់ជាតិកម្ពុជាកំពុងរៀបចំខ្លួនយ៉ាងសកម្មសម្រាប់ការប្រកួតកំពូលនៅតំបន់អាស៊ីអាគ្នេយ៍។",
    category: "កីឡា",
    image: "https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=800",
    date: "២០២៥-០១-១៣",
    author: "ស៊ុន ពិសាច",
    featured: true
  },
  {
    id: 4,
    title: "ឧស្សាហកម្មទេសចរណ៍កម្ពុជាមានការកើនឡើងគួរឱ្យកត់សម្គាល់",
    excerpt: "ចំនួនភ្ញៀវទេសចរបរទេសមកកម្ពុជាមានការកើនឡើងគួរឱ្យកត់សម្គាល់ បន្ទាប់ពីការបើកប្រទេសឡើងវិញ។",
    category: "អាជីវកម្ម",
    image: "https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=800",
    date: "២០២៥-០១-១២",
    author: "កេង សុវណ្ណរ៉ា"
  },
  {
    id: 5,
    title: "ការបង្កើតមជ្ឈមណ្ឌលសុខភាពថ្មីនៅទីជនបទ",
    excerpt: "រដ្ឋាភិបាលបានផ្តាំងការបង្កើតមជ្ឈមណ្ឌលសុខភាពថ្មីៗនៅតាមទីជនបទ ដើម្បីបង្កើនសេវាកម្មសុខភាពសម្រាប់ប្រជាពលរដ្ឋ។",
    category: "សុខភាព",
    image: "https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&cs=tinysrgb&w=800",
    date: "២០២៥-០១-១១",
    author: "ពេជ្រ សុវណ្ណី"
  },
  {
    id: 6,
    title: "ព្រឹត្តិការណ៍សាធារណៈកម្សាន្តនៅពារាំងទេពធីតា",
    excerpt: "ព្រឹត្តិការណ៍កម្សាន្តសិល្បៈនិងបុណ្យភ្ពស់ដ៏ធំនឹងត្រូវបានរៀបចំនៅក្នុងពារាំងទេពធីតាក្នុងសប្តាហ៍ខាងមុខ។",
    category: "កម្សាន្ត",
    image: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800",
    date: "២០២៥-០១-១០",
    author: "រ៉ាន់ ចេត្រា"
  },
  {
    id: 7,
    title: "ការអភិវឌ្ឍន៍ប្រព័ន្ធអប់រំឌីជីថលនៅកម្ពុជា",
    excerpt: "ក្រសួងអប់រំបានចាប់ផ្តើមគម្រោងអភិវឌ្ឍន៍ប្រព័ន្ធអប់រំឌីជីថល ដើម្បីបង្កើនគុណភាពការសិក្សា។",
    category: "បច្ចេកវិទ្យា",
    image: "https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?auto=compress&cs=tinysrgb&w=800",
    date: "២០២៥-០១-០៩",
    author: "ម៉ុក សុវណ្ណា"
  },
  {
    id: 8,
    title: "ព្រឹត្តិការណ៍កីឡាអន្តរជាតិនៅកម្ពុជា",
    excerpt: "កម្ពុជានឹងធ្វើជាម្ចាស់ផ្ទះនៃព្រឹត្តិការណ៍កីឡាអន្តរជាតិធំៗប្រចាំឆ្នាំនេះ។",
    category: "កីឡា",
    image: "https://images.pexels.com/photos/262524/pexels-photo-262524.jpeg?auto=compress&cs=tinysrgb&w=800",
    date: "២០២៥-០១-០៨",
    author: "ហេង បុណ្ណារ៉ា"
  },
  {
    id: 9,
    title: "ការលើកកម្ពស់ការធ្វើកសិកម្មប្រកបដោយនិរន្តរភាព",
    excerpt: "រដ្ឋាភិបាលបានផ្តល់ការណែនាំនិងការគាំទ្រដល់កសិករក្នុងការអនុវត្តវិធីសាស្ត្រកសិកម្មប្រកបដោយនិរន្តរភាព។",
    category: "អាជីវកម្ម",
    image: "https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?auto=compress&cs=tinysrgb&w=800",
    date: "២០២៥-០១-០៧",
    author: "សុខ ចាន់ថា"
  }
];