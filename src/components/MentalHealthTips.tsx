import React, { useState } from 'react';
import { Heart, Brain, Moon, Target, Zap } from 'lucide-react';
import { mentalHealthTips } from '../data/mentalHealthTips';

const MentalHealthTips: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Tips', icon: Heart },
    { id: 'stress', label: 'Stress Management', icon: Brain },
    { id: 'focus', label: 'Focus & Concentration', icon: Target },
    { id: 'wellness', label: 'Overall Wellness', icon: Zap },
    { id: 'sleep', label: 'Sleep Quality', icon: Moon },
    { id: 'motivation', label: 'Motivation', icon: Target }
  ];

  const filteredTips = selectedCategory === 'all' 
    ? mentalHealthTips 
    : mentalHealthTips.filter(tip => tip.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'stress': return 'bg-red-100 text-red-800';
      case 'focus': return 'bg-blue-100 text-blue-800';
      case 'wellness': return 'bg-green-100 text-green-800';
      case 'sleep': return 'bg-purple-100 text-purple-800';
      case 'motivation': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
          <Heart className="h-8 w-8 text-emerald-600" />
          <span>Mental Health & Wellness</span>
        </h1>
        <p className="text-gray-600 mt-2">
          Take care of your mental health with these evidence-based tips and strategies
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Browse by Category</h2>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = selectedCategory === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-emerald-100 text-emerald-700 shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{category.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tips Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTips.map((tip) => (
          <div key={tip.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">{tip.title}</h3>
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${getCategoryColor(tip.category)}`}>
                {tip.category}
              </span>
            </div>
            
            <p className="text-gray-600 mb-6 leading-relaxed">{tip.content}</p>
            
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900 flex items-center space-x-2">
                <Target className="h-4 w-4 text-emerald-600" />
                <span>Action Steps:</span>
              </h4>
              <ul className="space-y-2">
                {tip.tips.map((actionTip, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-700 text-sm leading-relaxed">{actionTip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Emergency Resources */}
      <div className="mt-12 bg-red-50 border border-red-200 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-red-900 mb-3">Need Immediate Help?</h2>
        <p className="text-red-800 mb-4">
          If you're experiencing a mental health crisis or having thoughts of self-harm, please reach out immediately:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="bg-white p-4 rounded-lg">
            <h3 className="font-medium text-red-900 mb-2">Crisis Text Line</h3>
            <p className="text-red-700">Text HOME to 741741</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h3 className="font-medium text-red-900 mb-2">National Suicide Prevention Lifeline</h3>
            <p className="text-red-700">Call 988</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h3 className="font-medium text-red-900 mb-2">Emergency Services</h3>
            <p className="text-red-700">Call 911</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h3 className="font-medium text-red-900 mb-2">Campus Counseling</h3>
            <p className="text-red-700">Contact your student health center</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentalHealthTips;