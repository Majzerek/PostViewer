import { AuthorType } from '../models';
import ApiServices from '../services/ApiServices';
import storage from '../services/LocalStorageController';
import { StorageKeys } from '../types/StorageKeys';
import { useAsyncRequest } from './useAsyncRequest';

export const useAuthors = () => {
  const {
    data: authors,
    refetch: refetchAuthors,
    loading: loadingAuthors,
    error: errorAuthors,
  } = useAsyncRequest<AuthorType[]>(async (signal) => {
    const storageAuthors = storage.getItem<AuthorType[]>(StorageKeys.AUTHORS);
    if (storageAuthors && storageAuthors.length > 0) {
      return storageAuthors;
    }
    const authorsList = await ApiServices.getAuthors(signal);
    storage.setItem<AuthorType[]>(StorageKeys.AUTHORS, authorsList);
    return authorsList;
  }, []);

  return {
    authors: authors ?? [],
    refetchAuthors,
    loadingAuthors,
    errorAuthors,
  };
};
