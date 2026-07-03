export interface IPost {
  _id: string;
  title: string;
  slug: string;
  catalog: string;
  catalogId: number;
  content: string;
  imageUrl: string;
  source?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostFormValues {
  title: string;
  slug?: string;
  catalogId: number;
  content?: string;
  source?: string;
  imageUrl?: FileList;
}

export interface PostQueryParams {
  catalogId?: number;
  catalog?: string;
  slug?: string;
  keyword?: string;
  page?: number;
  limit?: number;
}

export interface PostApiResponse {
  message: string;
  count?: number;
  visibleCount?: number;
  page?: number;
  limit?: number;
  posts?: IPost[];
  post?: IPost;
  deletedPost?: IPost;
}
