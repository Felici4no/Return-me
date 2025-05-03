export interface QuizOption {
  id: string;
  text: string;
  traits: string[];
}

export interface QuizQuestion {
  id: string;
  text: string;
  options: QuizOption[];
}

export interface QuizCharacter {
  id: string;
  name: string;
  description: string;
  image: string;
  traits: string[];
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  characters: QuizCharacter[];
}

export interface QuizListing {
  id: string;
  title: string;
  description: string;
  image: string;
  questions: number;
  slug: string;
}