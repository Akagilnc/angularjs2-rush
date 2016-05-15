export interface Question {
  position?: number;
  question: string;
  answer: string;
  displayAnswer: string;
  type: string;
  videoUrl?: string;
  imageUrl?: string;
  audioUrl?: string;
  youtubeVideoId?: string;
}