```ts
import { useCallback, useState } from 'react';

import { IFolder } from 'types/cloudStorage';

interface FolderNavigationProps {
  initialFolder?: IFolder;
}

const useFolderNavigation = ({ initialFolder }: FolderNavigationProps = {}) => {
  const [folders, setFolders] = useState<IFolder[]>(() => initialFolder ? [initialFolder] : []);
  const [layerNumber, setLayerNumber] = useState(0);

  const goTo = useCallback((folder: IFolder) => {
    setLayerNumber(prevState => prevState + 1);
    setFolders(prevFolders => {
      const existingFolderIndex = prevFolders.findIndex(({ uid }) => uid === folder.uid);

      // if folder exists go to that folder else navigate forward
      if (~existingFolderIndex) {
        return prevFolders.slice(0, existingFolderIndex + 1);
      }

      return [...prevFolders, folder];
    });
  }, []);

  const goBack = useCallback(() => {
    setLayerNumber(prevState => prevState - 1);
    setFolders(prevFolders => prevFolders.slice(0, -1));
  }, []);

  return {
    currentFolder: folders[folders.length - 1],
    layerNumber,
    folders,
    goBack,
    goTo,
  };
};

export default useFolderNavigation;
```