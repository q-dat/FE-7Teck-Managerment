import { IPhoneCatalog } from '../../types/type/phone-catalog/phone-catalog';
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
