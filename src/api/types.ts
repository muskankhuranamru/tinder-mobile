export interface Person {
  id: number;
  name: string;
  age: number;
  pictures: string[];
  location: string;
  like_count: number;
  admin_notified: boolean;
  created_at: string;
  updated_at: string;
  liked_at?: string;
}

export interface PaginatedResponse<T> {
  current_page: number;
  data: T[];
  per_page: number;
  total: number;
  last_page: number;
  next_page_url: string | null;
}

export interface LikeResponse {
  message: string;
  like: {
    user_id: number;
    person_id: number;
    created_at: string;
    id: number;
  };
}

export interface DislikeResponse {
  message: string;
  dislike: {
    user_id: number;
    person_id: number;
    created_at: string;
    id: number;
  };
}

