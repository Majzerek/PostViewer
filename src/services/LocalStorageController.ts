import { StorageKeys } from '../types/StorageKeys';

class LocalStorageController {
  setItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
  getItem<T>(key: string): T | null {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }
  deleteItem(key: string): void {
    localStorage.removeItem(key);
  }
  clearFavorite(): void {
    localStorage.removeItem(StorageKeys.FAVORITES);
  }
}

const storage = new LocalStorageController();
export default storage;
