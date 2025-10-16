import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import storage from '../services/LocalStorageController';
import { StorageKeys } from '../types/StorageKeys';

type FavoritesContextType = {
  favorites: FavoritesType[];
  toggleFavorite: (postId: number, author: string) => void;
  isFavorite: (id: number) => boolean;
};
type FavoritesType = {
  postId: string;
  author: string;
};
const FavoritesContext = createContext<FavoritesContextType | null>(null);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const storedFavorites = storage.getItem<FavoritesType[]>(StorageKeys.FAVORITES);
  const [favorites, setFavorites] = useState<FavoritesType[]>(
    storedFavorites ? storedFavorites : [],
  );

  useEffect(() => {
    storage.setItem(StorageKeys.FAVORITES, favorites);
  }, [favorites]);

  const toggleFavorite = (postId: number, author: string) => {
    const postIdStr = postId.toString();

    const exists = favorites.some((fav) => fav.postId === postIdStr);

    setFavorites((prev) =>
      exists
        ? prev.filter((fav) => fav.postId !== postIdStr)
        : [...prev, { postId: postIdStr, author }],
    );
  };

  const isFavorite = (postId: number) => {
    return favorites.some((fav) => fav.postId === postId.toString());
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
