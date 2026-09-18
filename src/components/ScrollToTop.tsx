import { useCallback, useEffect, useState } from 'react';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('home');
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.1 },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 rounded-sm backdrop-blur-[10px] p-1 transition-all duration-300 ${
        visible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-4 opacity-0 pointer-events-none'
      }`}
    >
      <button
        onClick={scrollToTop}
        aria-label='Scroll to top'
        className='flex h-12 w-12 items-center justify-center rounded-sm bg-raspberry text-white shadow-lg transition-all duration-300 hover:bg-raspberry-dark hover:scale-110 cursor-pointer'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='20'
          height='20'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path d='M18 15l-6-6-6 6' />
        </svg>
      </button>
    </div>
  );
}
