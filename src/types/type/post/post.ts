// Define the structure of a Post object
export interface IPost {
  _id: string;
  title: string;
  content: string;
  // author: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}
