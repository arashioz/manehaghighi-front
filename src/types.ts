export type User = {
  id: number;
  name: string;
  phone: string;
  email: string;
  phoneVerified: string;
  emailVerified: string;
  courses: Course[];
  tickets: Ticket[];
  exams: Exam[];
  createdAt: string;
};

export type Exam = {
  id: number;
  scores: number[];
  createdAt: string;
}

export type Article = {
  title: string;
  enTitle: string;
  description: string;
  hero: string;
  content?: string;
  comments?: Comment[];
};

export type Course = {
  id: number;
  title: string;
  enTitle: string;
  description: string;
  price: number;
  hero: string;
  Intro: string;
  users: User[];
  comments: Comment[];
  time: string;
  seasons: number;
};

export type Episode = {
  id: number;
  title: string;
  videoUrl480: string;
  videoUrl720: string;
  description: string;
  duration: number;
  order: number;
  course: Course;
}

export type Comment = {
  id: number;
  content: string;
  user?: User;
  course?: Course;
  article?: Article;
};

export type Ticket = {
  id: number;
  title: string;
  messages: Message[];
  open: boolean;
};

export type Message = {
  id: number;
  content: string;
  isAdmin: boolean;
};
