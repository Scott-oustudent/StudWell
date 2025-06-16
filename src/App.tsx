import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import StudyDiary from './components/StudyDiary';
import MentalHealthTips from './components/MentalHealthTips';
import ReferencingGuide from './components/ReferencingGuide';
import { ActiveSection, DiaryEntry } from './types';

function App() {
  const [activeSection, setActiveSection] = useState<ActiveSection>('dashboard');
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('studyDiaryEntries');
    if (savedEntries) {
      try {
        setDiaryEntries(JSON.parse(savedEntries));
      } catch (error) {
        console.error('Error loading diary entries:', error);
      }
    } else {
      // Add some sample data for demonstration
      const sampleEntries: DiaryEntry[] = [
        {
          id: '1',
          title: 'Psychology Essay - Memory and Learning',
          description: 'Write a 2000-word essay on memory formation and learning processes',
          type: 'assignment',
          dueDate: '2024-01-20T23:59:00',
          completed: false,
          priority: 'high',
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Statistics Tutorial - Chapter 5',
          description: 'Complete exercises 5.1 to 5.15 on probability distributions',
          type: 'tutorial',
          dueDate: '2024-01-18T14:00:00',
          completed: true,
          priority: 'medium',
          createdAt: new Date().toISOString()
        },
        {
          id: '3',
          title: 'Midterm Exam - Biology',
          description: 'Covers chapters 1-8: Cell biology, genetics, and evolution',
          type: 'exam',
          dueDate: '2024-01-25T09:00:00',
          completed: false,
          priority: 'high',
          createdAt: new Date().toISOString()
        }
      ];
      setDiaryEntries(sampleEntries);
    }
  }, []);

  // Save diary entries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('studyDiaryEntries', JSON.stringify(diaryEntries));
  }, [diaryEntries]);

  const handleAddEntry = (newEntry: Omit<DiaryEntry, 'id' | 'createdAt'>) => {
    const entry: DiaryEntry = {
      ...newEntry,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setDiaryEntries(prev => [...prev, entry]);
  };

  const handleToggleComplete = (id: string) => {
    setDiaryEntries(prev =>
      prev.map(entry =>
        entry.id === id ? { ...entry, completed: !entry.completed } : entry
      )
    );
  };

  const handleDeleteEntry = (id: string) => {
    setDiaryEntries(prev => prev.filter(entry => entry.id !== id));
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard onSectionChange={setActiveSection} diaryEntries={diaryEntries} />;
      case 'diary':
        return (
          <StudyDiary
            entries={diaryEntries}
            onAddEntry={handleAddEntry}
            onToggleComplete={handleToggleComplete}
            onDeleteEntry={handleDeleteEntry}
          />
        );
      case 'mental-health':
        return <MentalHealthTips />;
      case 'referencing':
        return <ReferencingGuide />;
      default:
        return <Dashboard onSectionChange={setActiveSection} diaryEntries={diaryEntries} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="pb-8">
        {renderActiveSection()}
      </main>
    </div>
  );
}

export default App;