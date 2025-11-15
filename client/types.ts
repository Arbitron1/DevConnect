export interface Author {
  _id: string;
  name: string;
  avatar?: string;
  bio?: string;
}

export interface Post {
  _id: string;
  author: Author;
  content: string;
  images?: string[];        
  likes?: string[];          
  commentsCount?: number;    
  createdAt: string;         
}
