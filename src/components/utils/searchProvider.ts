export type SearchProvider = 'google' | 'facebook' | 'youtube' | 'tiktok' | 'x' | 'instagram' | 'reddit';

const SEARCH_BASE_URL: Record<SearchProvider, string> = {
  google: import.meta.env.VITE_GOOGLE_SEARCH_BASE_URL ?? '',
  facebook: import.meta.env.VITE_FACEBOOK_SEARCH_BASE_URL ?? '',
  youtube: import.meta.env.VITE_YOUTUBE_SEARCH_BASE_URL ?? '',
  tiktok: import.meta.env.VITE_TIKTOK_SEARCH_BASE_URL ?? '',
  x: import.meta.env.VITE_X_SEARCH_BASE_URL ?? '',
  instagram: import.meta.env.VITE_INSTAGRAM_SEARCH_BASE_URL ?? '',
  reddit: import.meta.env.VITE_REDDIT_SEARCH_BASE_URL ?? ''
};

const buildSearchUrl = (provider: SearchProvider, keyword: string): string => {
  const baseUrl = SEARCH_BASE_URL[provider];
  const query = encodeURIComponent(keyword.trim());

  if (provider === 'instagram') {
    return `${baseUrl}${query}/`;
  }

  return `${baseUrl}${query}`;
};

export const openSearchProvider = (provider: SearchProvider, keyword: string): void => {
  if (!keyword) return;

  const url = buildSearchUrl(provider, keyword);

  window.open(url, '_blank', 'noopener,noreferrer');
};
