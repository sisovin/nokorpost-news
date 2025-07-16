import React, { useState } from 'react';
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/Dashboard';
import ArticleManager from './admin/ArticleManager';
import RSSManager from './admin/RSSManager';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'articles':
        return <ArticleManager />;
      case 'categories':
        return <div className="text-center py-12 khmer-text">មុខងារគ្រប់គ្រងប្រភេទនឹងមកដល់ឆាប់ៗនេះ</div>;
      case 'users':
        return <div className="text-center py-12 khmer-text">មុខងារគ្រប់គ្រងអ្នកប្រើប្រាស់នឹងមកដល់ឆាប់ៗនេះ</div>;
      case 'rss':
        return <RSSManager />;
      case 'analytics':
        return <div className="text-center py-12 khmer-text">មុខងារស្ថិតិនឹងមកដល់ឆាប់ៗនេះ</div>;
      case 'settings':
        return <div className="text-center py-12 khmer-text">មុខងារការកំណត់នឹងមកដល់ឆាប់ៗនេះ</div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </AdminLayout>
  );
};

export default AdminPanel;