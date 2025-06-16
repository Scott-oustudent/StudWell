import React from 'react';
import { BookOpen, Calendar, Heart, FileText, Home } from 'lucide-react';
import { ActiveSection } from '../types';

interface NavigationProps {
  activeSection: ActiveSection;
  onSectionChange: (section: ActiveSection) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection, onSectionChange }) => {
  const navItems = [
    { id: 'dashboard' as ActiveSection, label: 'Dashboard', icon: Home },
    { id: 'diary' as ActiveSection, label: 'Study Diary', icon: Calendar },
    { id: 'mental-health' as ActiveSection, label: 'Wellness', icon: Heart },
    { id: 'referencing' as ActiveSection, label: 'Harvard Guide', icon: FileText },
  ];

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">StudyMate</span>
          </div>
          
          <div className="flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onSectionChange(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-indigo-100 text-indigo-700 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;