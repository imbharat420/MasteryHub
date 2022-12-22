import { useRef, useEffect } from 'react';

function useDocumentTitle(title: string, prevailOnUnmount = false) {
  const defaultTitle = useRef(document.title);

  useEffect(() => {
    const currentTitle = defaultTitle.current;

    document.title = title;

    return () => {
      if (!prevailOnUnmount) {
        document.title = currentTitle;
      }
    };
  }, [prevailOnUnmount, title]);
}

export default useDocumentTitle;
