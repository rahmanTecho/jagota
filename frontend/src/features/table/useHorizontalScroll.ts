import { useRef, useState, useEffect, useCallback } from 'react';

const useHorizontalScroll = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollIndicatorPosition, setScrollIndicatorPosition] = useState(0);

  const handleScroll = useCallback(() => {
    const element = scrollContainerRef.current;
    if (element) {
      const scrollWidth = element.scrollWidth - element.clientWidth;
      const scrollRatio = element.scrollLeft / scrollWidth;
      setScrollIndicatorPosition(scrollRatio * element.clientWidth);
    }
  }, []);

  useEffect(() => {
    const element = scrollContainerRef.current;
    if (element) {
      element.addEventListener('scroll', handleScroll);
      return () => element.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  return { scrollContainerRef, scrollIndicatorPosition };
};

export default useHorizontalScroll;
