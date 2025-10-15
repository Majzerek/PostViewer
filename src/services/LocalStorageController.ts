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
  clearStorage(): void {
    localStorage.clear();
  }
}

const storage = new LocalStorageController();
export default storage;
