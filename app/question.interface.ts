export interface Question {
  position?: number;
  question: string;
  answer: string;
  type: string;
  videoUrl?: string;
  imageUrl?: string;
  audioUrl?: string;
}