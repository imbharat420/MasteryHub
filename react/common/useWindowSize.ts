import { useState, useEffect } from 'react';

const getSize = () => ({
  width: window.innerWidth,
  height: window.innerHeight,
});

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    const handleResize = () => setWindowSize(getSize());

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

export default useWindowSize;
