import React from 'react';
import { Facebook, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="glass border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-500 flex items-center justify-center">
                <span className="text-white font-bold text-2xl">ន</span>
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent khmer-text">
                  នគរប៉ុស្តិ៍
                </h3>
                <p className="text-sm text-gray-400 khmer-text">ព័ត៌មានថ្មីៗប្រចាំថ្ងៃ</p>
              </div>
            </div>
            <p className="text-gray-400 khmer-text leading-relaxed mb-6">
              នគរប៉ុស្តិ៍ គឺជាកាសែតអនឡាញដែលផ្តល់ព័ត៌មានថ្មីៗ និងមានលក្ខណៈទាន់ពេលវេលា 
              សម្រាប់ប្រជាពលរដ្ឋខ្មែរទាំងអស់។
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 glass rounded-lg hover:bg-indigo-500 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 glass rounded-lg hover:bg-cyan-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 glass rounded-lg hover:bg-red-500 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 khmer-text">តំណភ្ជាប់រហ័ស</h4>
            <ul className="space-y-3">
              {['អំពីយើង', 'ការការពារឯកជនភាព', 'លក្ខខណ្ឌប្រើប្រាស់', 'ទំនាក់ទំនង'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors khmer-text">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6 khmer-text">ទំនាក់ទំនង</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail className="w-4 h-4" />
                <span className="text-sm">info@nokorpost.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+855 23 123 456</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <MapPin className="w-4 h-4" />
                <span className="text-sm khmer-text">ភ្នំពេញ កម្ពុជា</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm khmer-text">
              © ២០២៥ នគរប៉ុស្តិ៍។ រក្សាសិទ្ធិទាំងអស់។
            </p>
            <p className="text-gray-400 text-sm mt-2 md:mt-0">
              Built with React & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;