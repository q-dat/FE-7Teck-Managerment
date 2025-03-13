import { IPhoneCatalog } from '../../types/type/phone-catalog/phone-catalog';

export const slugify = (text: string) => {
    return text
      .toString()
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };
export const handleSearch = (
  query: string,
  phoneCatalogs: IPhoneCatalog[],
  setSearchQuery: (query: string) => void,
  setSearchResults: (results: IPhoneCatalog[]) => void
) => {
  setSearchQuery(query);
  if (query.trim() === '') {
    setSearchResults([]);
    return;
  }
  const phoneCatalogResults = phoneCatalogs.filter(phoneCatalog =>
    phoneCatalog.name.toLowerCase().includes(query.toLowerCase())
  );
  setSearchResults(phoneCatalogResults);
};

