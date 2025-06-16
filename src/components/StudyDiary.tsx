import React, { useState } from 'react';
import { Plus, Calendar, Clock, Flag, Check, Trash2, Edit3 } from 'lucide-react';
import { DiaryEntry } from '../types';

interface StudyDiaryProps {
  entries: DiaryEntry[];
  onAddEntry: (entry: Omit<DiaryEntry, 'id' | 'createdAt'>) => void;
  onToggleComplete: (id: string) => void;
  onDeleteEntry: (id: string) => void;
}

const StudyDiary: React.FC<StudyDiaryProps> = ({ entries, onAddEntry, onToggleComplete, onDeleteEntry }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'assignment' as DiaryEntry['type'],
    dueDate: '',
    priority: 'medium' as DiaryEntry['priority']
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.dueDate) return;
    
    onAddEntry({
      ...formData,
      completed: false
    });
    
    setFormData({
      title: '',
      description: '',
      type: 'assignment',
      dueDate: '',
      priority: 'medium'
    });
    setShowForm(false);
  };

  const sortedEntries = entries.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  const upcomingEntries = sortedEntries.filter(entry => !entry.completed);
  const completedEntries = sortedEntries.filter(entry => entry.completed);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-400 bg-red-50';
      case 'medium': return 'border-yellow-400 bg-yellow-50';
      case 'low': return 'border-green-400 bg-green-50';
      default: return 'border-gray-400 bg-gray-50';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'assignment': return 'bg-blue-100 text-blue-800';
      case 'tutorial': return 'bg-purple-100 text-purple-800';
      case 'exam': return 'bg-red-100 text-red-800';
      case 'other': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Study Diary</h1>
          <p className="text-gray-600 mt-1">Track your assignments, tutorials, and deadlines</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Entry</span>
        </button>
      </div>

      {/* Add Entry Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Entry</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter title..."
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  rows={3}
                  placeholder="Add details..."
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as DiaryEntry['type'] })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="assignment">Assignment</option>
                    <option value="tutorial">Tutorial</option>
                    <option value="exam">Exam</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as DiaryEntry['priority'] })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                <input
                  type="datetime-local"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                >
                  Add Entry
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Entries */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <Clock className="h-5 w-5 text-indigo-600" />
            <span>Upcoming ({upcomingEntries.length})</span>
          </h2>
          
          <div className="space-y-3">
            {upcomingEntries.map((entry) => (
              <div key={entry.id} className={`p-4 rounded-lg border-l-4 ${getPriorityColor(entry.priority)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-gray-900">{entry.title}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(entry.type)}`}>
                        {entry.type}
                      </span>
                    </div>
                    {entry.description && (
                      <p className="text-gray-600 text-sm mb-2">{entry.description}</p>
                    )}
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(entry.dueDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Flag className="h-4 w-4" />
                        <span className="capitalize">{entry.priority}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => onToggleComplete(entry.id)}
                      className="p-2 text-gray-400 hover:text-green-600 transition-colors duration-200"
                      title="Mark as complete"
                    >
                      <Check className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDeleteEntry(entry.id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors duration-200"
                      title="Delete entry"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            {upcomingEntries.length === 0 && (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">No upcoming entries</p>
                <p className="text-sm text-gray-500">Add your first entry to get started</p>
              </div>
            )}
          </div>
        </div>

        {/* Completed Entries */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <Check className="h-5 w-5 text-emerald-600" />
            <span>Completed ({completedEntries.length})</span>
          </h2>
          
          <div className="space-y-3">
            {completedEntries.map((entry) => (
              <div key={entry.id} className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 opacity-75">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-gray-900 line-through">{entry.title}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(entry.type)}`}>
                        {entry.type}
                      </span>
                    </div>
                    {entry.description && (
                      <p className="text-gray-600 text-sm mb-2 line-through">{entry.description}</p>
                    )}
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(entry.dueDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => onToggleComplete(entry.id)}
                      className="p-2 text-emerald-600 hover:text-gray-600 transition-colors duration-200"
                      title="Mark as incomplete"
                    >
                      <Check className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDeleteEntry(entry.id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors duration-200"
                      title="Delete entry"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            {completedEntries.length === 0 && (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <Check className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">No completed entries yet</p>
                <p className="text-sm text-gray-500">Complete some tasks to see them here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyDiary;