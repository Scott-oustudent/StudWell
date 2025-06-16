import React, { useState } from 'react';
import { FileText, Book, Globe, Newspaper, Copy, Check, BookOpen, GraduationCap } from 'lucide-react';
import { referenceExamples } from '../data/referenceExamples';

const ReferencingGuide: React.FC = () => {
  const [selectedStyle, setSelectedStyle] = useState<string>('harvard');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const styles = [
    { id: 'harvard', label: 'Harvard', icon: BookOpen, description: 'Author-date system' },
    { id: 'apa', label: 'APA', icon: GraduationCap, description: 'American Psychological Association' },
    { id: 'mla', label: 'MLA', icon: Book, description: 'Modern Language Association' },
    { id: 'chicago', label: 'Chicago', icon: FileText, description: 'Chicago Manual of Style' },
    { id: 'vancouver', label: 'Vancouver', icon: Globe, description: 'Numbered citation system' }
  ];

  const types = [
    { id: 'all', label: 'All Examples', icon: FileText },
    { id: 'book', label: 'Books', icon: Book },
    { id: 'journal', label: 'Journal Articles', icon: FileText },
    { id: 'website', label: 'Websites', icon: Globe },
    { id: 'newspaper', label: 'Newspapers', icon: Newspaper }
  ];

  const filteredExamples = referenceExamples.filter(example => {
    const styleMatch = example.style === selectedStyle;
    const typeMatch = selectedType === 'all' || example.type === selectedType;
    return styleMatch && typeMatch;
  });

  const getStyleColor = (style: string) => {
    switch (style) {
      case 'harvard': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'apa': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'mla': return 'bg-green-100 text-green-800 border-green-200';
      case 'chicago': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'vancouver': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'book': return 'bg-blue-100 text-blue-800';
      case 'journal': return 'bg-green-100 text-green-800';
      case 'website': return 'bg-purple-100 text-purple-800';
      case 'newspaper': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const getStyleGuidelines = (style: string) => {
    switch (style) {
      case 'harvard':
        return {
          inText: ['Use author\'s surname and year: (Smith, 2023)', 'Multiple authors: (Smith and Jones, 2023)', 'Page numbers for quotes: (Smith, 2023, p. 15)', 'No author: (Title, 2023)'],
          referenceList: ['Alphabetical order by author surname', 'Hanging indent for each entry', 'Include all sources cited in text', 'Use italics for titles of publications']
        };
      case 'apa':
        return {
          inText: ['Use author and year: (Smith, 2023)', 'Multiple authors: (Smith & Jones, 2023)', 'Page numbers: (Smith, 2023, p. 15)', 'Multiple works: (Smith, 2023; Jones, 2022)'],
          referenceList: ['Alphabetical order by author surname', 'Hanging indent for each entry', 'Use "&" for multiple authors', 'Include DOI when available']
        };
      case 'mla':
        return {
          inText: ['Use author and page: (Smith 15)', 'Multiple authors: (Smith and Jones 15)', 'No page numbers: (Smith)', 'Multiple works: (Smith 15; Jones 20)'],
          referenceList: ['Alphabetical order by author surname', 'Hanging indent for each entry', 'Use "et al." for 3+ authors', 'Include medium of publication']
        };
      case 'chicago':
        return {
          inText: ['Use footnotes or endnotes', 'Full citation in first note', 'Shortened form in subsequent notes', 'Bibliography at end of paper'],
          referenceList: ['Alphabetical order by author surname', 'Hanging indent for each entry', 'Full publication details', 'Use "and" for multiple authors']
        };
      case 'vancouver':
        return {
          inText: ['Use numbers in order of appearance: (1)', 'Multiple sources: (1,2,3)', 'Range of sources: (1-3)', 'Same source: (1)'],
          referenceList: ['Numerical order as cited in text', 'No hanging indent', 'Abbreviated journal titles', 'Use initials for first names']
        };
      default:
        return { inText: [], referenceList: [] };
    }
  };

  const guidelines = getStyleGuidelines(selectedStyle);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
          <FileText className="h-8 w-8 text-orange-600" />
          <span>Academic Referencing Guide</span>
        </h1>
        <p className="text-gray-600 mt-2">
          Master multiple citation styles with examples and guidelines
        </p>
      </div>

      {/* Style Selection */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Choose Citation Style</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {styles.map((style) => {
            const Icon = style.icon;
            const isActive = selectedStyle === style.id;
            
            return (
              <button
                key={style.id}
                onClick={() => setSelectedStyle(style.id)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                  isActive
                    ? getStyleColor(style.id) + ' shadow-md'
                    : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <Icon className="h-5 w-5" />
                  <span className="font-semibold">{style.label}</span>
                </div>
                <p className="text-sm opacity-75">{style.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Guidelines for Selected Style */}
      <div className={`rounded-xl p-6 mb-8 border-2 ${getStyleColor(selectedStyle)}`}>
        <h2 className="text-xl font-semibold mb-4">{styles.find(s => s.id === selectedStyle)?.label} Style Guidelines</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-2">In-Text Citations</h3>
            <ul className="space-y-1 text-sm">
              {guidelines.inText.map((guideline, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-current rounded-full mt-2 flex-shrink-0" />
                  <span>{guideline}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-2">Reference List</h3>
            <ul className="space-y-1 text-sm">
              {guidelines.referenceList.map((guideline, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-current rounded-full mt-2 flex-shrink-0" />
                  <span>{guideline}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Type Filter */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Browse by Source Type</h2>
        <div className="flex flex-wrap gap-3">
          {types.map((type) => {
            const Icon = type.icon;
            const isActive = selectedType === type.id;
            
            return (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-gray-900 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{type.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Examples */}
      <div className="space-y-6">
        {filteredExamples.map((example) => (
          <div key={example.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <h3 className="text-lg font-semibold text-gray-900">{example.title}</h3>
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${getTypeColor(example.type)}`}>
                  {example.type}
                </span>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-2">Reference Example:</h4>
                  <p className="text-gray-800 font-mono text-sm leading-relaxed break-all">{example.example}</p>
                </div>
                <button
                  onClick={() => copyToClipboard(example.example, example.id)}
                  className="ml-4 p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200 flex-shrink-0"
                  title="Copy to clipboard"
                >
                  {copiedId === example.id ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Explanation:</h4>
              <p className="text-blue-800 text-sm leading-relaxed">{example.explanation}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Reference Card */}
      <div className="mt-12 bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-indigo-900 mb-4">Universal Citation Checklist</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-indigo-900 mb-3">Before You Submit:</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-indigo-500 rounded-full" />
                <span className="text-indigo-800">Check all in-text citations have corresponding references</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-indigo-500 rounded-full" />
                <span className="text-indigo-800">Verify correct formatting for your chosen style</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-indigo-500 rounded-full" />
                <span className="text-indigo-800">Ensure consistent formatting throughout</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-indigo-500 rounded-full" />
                <span className="text-indigo-800">Double-check all URLs are accessible</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-indigo-900 mb-3">Common Mistakes to Avoid:</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full" />
                <span className="text-indigo-800">Mixing different citation styles</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full" />
                <span className="text-indigo-800">Inconsistent date formats</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full" />
                <span className="text-indigo-800">Missing access dates for websites</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full" />
                <span className="text-indigo-800">Incorrect punctuation and capitalization</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferencingGuide;