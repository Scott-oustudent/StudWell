import React from 'react';
import { Calendar, Heart, FileText, BookOpen, TrendingUp, Clock, Star } from 'lucide-react';
import { ActiveSection, DiaryEntry } from '../types';

interface DashboardProps {
  onSectionChange: (section: ActiveSection) => void;
  diaryEntries: DiaryEntry[];
}

const Dashboard: React.FC<DashboardProps> = ({ onSectionChange, diaryEntries }) => {
  const upcomingDeadlines = diaryEntries
    .filter(entry => !entry.completed && new Date(entry.dueDate) > new Date())
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 3);

  const completedThisWeek = diaryEntries.filter(entry => {
    const entryDate = new Date(entry.dueDate);
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    return entry.completed && entryDate >= weekAgo && entryDate <= now;
  }).length;

  const quickActions = [
    {
      title: 'Study Diary',
      description: 'Track assignments and tutorials',
      icon: Calendar,
      color: 'bg-blue-500',
      action: () => onSectionChange('diary')
    },
    {
      title: 'Wellness Tips',
      description: 'Mental health resources',
      icon: Heart,
      color: 'bg-emerald-500',
      action: () => onSectionChange('mental-health')
    },
    {
      title: 'Harvard Guide',
      description: 'Referencing made simple',
      icon: FileText,
      color: 'bg-orange-500',
      action: () => onSectionChange('referencing')
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h1>
        <p className="text-gray-600">Here's your study overview for today</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Upcoming Deadlines</p>
              <p className="text-2xl font-bold text-gray-900">{upcomingDeadlines.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed This Week</p>
              <p className="text-2xl font-bold text-gray-900">{completedThisWeek}</p>
            </div>
            <div className="p-3 bg-emerald-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Entries</p>
              <p className="text-2xl font-bold text-gray-900">{diaryEntries.length}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <BookOpen className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  onClick={action.action}
                  className="w-full flex items-center space-x-4 p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-200 text-left"
                >
                  <div className={`p-2 rounded-lg ${action.color}`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{action.title}</h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Deadlines</h2>
          {upcomingDeadlines.length > 0 ? (
            <div className="space-y-3">
              {upcomingDeadlines.map((entry) => (
                <div key={entry.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-3 h-3 rounded-full ${
                    entry.priority === 'high' ? 'bg-red-500' :
                    entry.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`} />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{entry.title}</h3>
                    <p className="text-sm text-gray-600">
                      Due: {new Date(entry.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    entry.type === 'assignment' ? 'bg-blue-100 text-blue-800' :
                    entry.type === 'tutorial' ? 'bg-purple-100 text-purple-800' :
                    entry.type === 'exam' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {entry.type}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Star className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No upcoming deadlines!</p>
              <p className="text-sm text-gray-500">You're all caught up</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;