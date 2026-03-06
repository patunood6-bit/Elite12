
export type Subject = 'Math' | 'Literature' | 'English' | 'General';

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
  timestamp: number;
}

export interface VocabularyItem {
  word: string;
  ipa: string;
  meaning: string;
  type: string;
  level: string;
  topic: string; // New field for categorization
  example?: string;
  exampleTranslation?: string;
  synonyms?: string;
  antonyms?: string;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  category: string;
}

export interface FlashcardSet {
  id: string;
  title: string;
  subject: Subject;
  cards: Flashcard[];
}
