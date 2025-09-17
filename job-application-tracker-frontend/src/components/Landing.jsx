import React, { useState } from 'react';
import {
  Home,
  FileText,
  Link,
  User,
  LogOut,
  Plus,
  TrendingUp,
  Briefcase,
  Calendar,
  Mail
} from 'lucide-react';
import Dashboard from './Dashboard';
import ResumeMatch from './ResumeMatch';
import JobExtractor from './JobExtractor';
import Profile from './Profile';

const Landing = (props) => {
  console.log(props);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState(props.user);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'resume-match', label: 'Resume Match', icon: FileText },
    { id: 'job-extractor', label: 'Job Extractor', icon: Link },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  const handleUserUpdate = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'resume-match':
        return <ResumeMatch />;
      case 'job-extractor':
        return <JobExtractor />;
      case 'profile':
        return <Profile user={user} handleUserUpdate={handleUserUpdate} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="h-screen w-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="w-screen mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="h-8 w-8 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-white" />
              </div>
              <h1 className="ml-3 text-xl font-bold text-gray-900">Job Tracker</h1>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">Welcome, {user.firstName}</span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="w-screen mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex justify-between">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center justify-center flex-auto space-x-2 py-4 border-b-2 font-medium text-sm focus:outline-none transition-colors ${isActive
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Landing;