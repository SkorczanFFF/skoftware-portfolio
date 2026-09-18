import { useEffect, useRef, useState } from 'react';

import { reducedMotionQuery } from '@/lib/motion';
import { CursorIcon, CursorOverlayIcon } from '@/lib/shared/Icons';

const CURSOR_SIZE = 50;

const CustomCursor = () => {
  const [isActive, setIsActive] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const rafId = useRef(0);

  // Only for a real pointer, and never when motion is reduced.
  useEffect(() => {
    const pointer = window.matchMedia('(pointer: fine)');
    const motion = reducedMotionQuery();

    const update = () => setIsActive(pointer.matches && !motion.matches);
    update();

    pointer.addEventListener('change', update);
    motion.addEventListener('change', update);
    return () => {
      pointer.removeEventListener('change', update);
      motion.removeEventListener('change', update);
    };
  }, []);

  // `html.custom-cursor` hides the OS cursor (globals.css); it is dropped
  // while the pointer is outside the window so the OS cursor shows there.
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!isActive || !cursor) return;

    const root = document.documentElement;
    root.classList.add('custom-cursor');

    const onMouseMove = (event: MouseEvent) => {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        cursor.style.left = `${event.clientX - CURSOR_SIZE / 2}px`;
        cursor.style.top = `${event.clientY - CURSOR_SIZE / 2}px`;
        cursor.style.opacity = '1';
      });
    };
    const onMouseLeave = () => {
      cursor.style.opacity = '0';
      root.classList.remove('custom-cursor');
    };
    const onMouseEnter = () => {
      cursor.style.opacity = '1';
      root.classList.add('custom-cursor');
    };

    document.addEventListener('mousemove', onMouseMove);
    root.addEventListener('mouseleave', onMouseLeave);
    root.addEventListener('mouseenter', onMouseEnter);
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      root.removeEventListener('mouseleave', onMouseLeave);
      root.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(rafId.current);
      root.classList.remove('custom-cursor');
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div ref={cursorRef} className='invert-cursor' aria-hidden='true'>
      <CursorIcon className='text-2xl -scale-x-100 mt-6 ml-6' aria-hidden />
      <CursorOverlayIcon
        className='pointer-events-none absolute z-10 text-2xl text-raspberry -scale-x-100 mt-6 ml-6 drop-shadow-xs'
        aria-hidden
      />
    </div>
  );
};

export default CustomCursor;
