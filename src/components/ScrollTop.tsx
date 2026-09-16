import React, { useState, useEffect } from 'react';

export const ScrollTop: React.FC = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => {
      if (window.scrollY >= 560) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, []);

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <a
      href="#home"
      className={`scrollup ${showScroll ? 'show-scroll' : ''}`}
      id="scroll-up"
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <i className="uil uil-arrow-up scrollup__icon" aria-hidden="true"></i>
    </a>
  );
};
