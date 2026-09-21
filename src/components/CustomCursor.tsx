import { useEffect, useRef, useState } from 'react';

import { gsap } from '@/lib/gsap';
import { reducedMotionQuery } from '@/lib/motion';
import { CursorIcon, CursorOverlayIcon } from '@/lib/shared/Icons';

const CURSOR_SIZE = 50;
/** Share of the remaining gap the cursor closes in one 60fps frame. */
const CHASE = 0.22;
/** How far a target is allowed to pull the cursor off the pointer, in px. */
const PULL = 14;
const ACTIVE_SCALE = 1.3;

const INTERACTIVE = 'a, button, [role="button"], summary, label, input, select';

const CustomCursor = () => {
  const [isActive, setIsActive] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

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

    const pointer = { x: 0, y: 0 };
    const at = { x: 0, y: 0, scale: 1 };
    let target: Element | null = null;
    let placed = false;

    const onPointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      if (placed) return;
      // The first sighting is a jump, not a chase — otherwise the cursor
      // flies in across the page from wherever it was parked.
      placed = true;
      at.x = pointer.x;
      at.y = pointer.y;
      cursor.style.opacity = '1';
    };

    // `pointerover` fires for every element entered, so the closest match is
    // also how the cursor learns it has left one.
    const onPointerOver = (event: PointerEvent) => {
      const node = event.target;
      target = node instanceof Element ? node.closest(INTERACTIVE) : null;
    };

    const onLeave = () => {
      cursor.style.opacity = '0';
      root.classList.remove('custom-cursor');
    };
    const onEnter = () => {
      if (placed) cursor.style.opacity = '1';
      root.classList.add('custom-cursor');
    };

    const chase = (_time: number, delta: number) => {
      // Damping tied to elapsed time, not to frames, so the weight feels the
      // same at 60 and at 144Hz.
      const ease = 1 - Math.pow(1 - CHASE, delta / (1000 / 60));

      let toX = pointer.x;
      let toY = pointer.y;
      let toScale = 1;

      if (target) {
        // Measured every frame: the page keeps scrolling under the pointer.
        const box = target.getBoundingClientRect();
        toX += gsap.utils.clamp(-PULL, PULL, box.x + box.width / 2 - pointer.x);
        toY += gsap.utils.clamp(
          -PULL,
          PULL,
          box.y + box.height / 2 - pointer.y,
        );
        toScale = ACTIVE_SCALE;
      }

      at.x += (toX - at.x) * ease;
      at.y += (toY - at.y) * ease;
      at.scale += (toScale - at.scale) * ease;

      const half = CURSOR_SIZE / 2;
      cursor.style.transform = `translate3d(${at.x - half}px, ${at.y - half}px, 0) scale(${at.scale})`;
    };

    // The same clock Lenis and ScrollTrigger run on.
    gsap.ticker.add(chase);
    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerover', onPointerOver);
    root.addEventListener('mouseleave', onLeave);
    root.addEventListener('mouseenter', onEnter);

    return () => {
      gsap.ticker.remove(chase);
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerover', onPointerOver);
      root.removeEventListener('mouseleave', onLeave);
      root.removeEventListener('mouseenter', onEnter);
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
