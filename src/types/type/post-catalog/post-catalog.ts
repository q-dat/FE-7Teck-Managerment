export interface IPostCatalog {
  _id: string;
  name: string;
  slug: string;
  catalogId: number;
  createdAt: string;
  updatedAt: string;
}

export interface PostCatalogFormValues {
  name: string;
  slug?: string;
  catalogId: number;
}

export interface PostCatalogQueryParams {
  catalogId?: number;
  keyword?: string;
}

export interface PostCatalogApiResponse {
  message: string;
  count?: number;
  visibleCount?: number;
  postCatalogs?: IPostCatalog[];
  postCatalog?: IPostCatalog;
  deletedPostCatalog?: IPostCatalog;
}
