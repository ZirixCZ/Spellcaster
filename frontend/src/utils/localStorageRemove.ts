const localStorageRemove = (item: string): boolean => {
  if (localStorage.getItem(item)) {
    localStorage.removeItem(item);
    return true;
  }
  return false;
};

export default localStorageRemove;
