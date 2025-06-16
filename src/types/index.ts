export interface DiaryEntry {
  id: string;
  title: string;
  description: string;
  type: 'assignment' | 'tutorial' | 'exam' | 'other';
  dueDate: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}

export interface MentalHealthTip {
  id: string;
  title: string;
  category: 'stress' | 'focus' | 'wellness' | 'sleep' | 'motivation';
  content: string;
  tips: string[];
}

export interface ReferenceExample {
  id: string;
  style: 'harvard' | 'apa' | 'mla' | 'chicago' | 'vancouver';
  type: 'book' | 'journal' | 'website' | 'newspaper';
  title: string;
  example: string;
  explanation: string;
}

export type ActiveSection = 'dashboard' | 'diary' | 'mental-health' | 'referencing';