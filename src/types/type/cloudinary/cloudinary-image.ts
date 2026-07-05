export interface ICloudinaryImage {
  publicId: string;
  folder: string;
  filename: string;
  format: string;
  resourceType: string;
  type: string;
  width: number;
  height: number;
  bytes: number;
  sizeText: string;
  url: string;
  secureUrl: string;
  createdAt: string;
}

export interface CloudinaryImageQueryParams {
  folder?: string;
  keyword?: string;
  maxResults?: number;
  nextCursor?: string | null;
}

export interface CloudinaryDeleteResult {
  input: string;
  publicId: string | null;
  result: string;
}

export interface CloudinaryImageApiResponse {
  message: string;
  count?: number;
  nextCursor?: string | null;
  totalCount?: number | null;
  images?: ICloudinaryImage[];
  cloudinaryResults?: CloudinaryDeleteResult[];
  error?: string;
}