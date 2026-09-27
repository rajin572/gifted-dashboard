import { useRef, useEffect } from 'react';

/**
 * Custom hook that enables mouse-drag and smooth touch-drag horizontal scrolling
 * on any container element while preventing accidental tab activation during dragging.
 */
export function useDraggableScroll<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
    let isDragging = false;

    const onMouseDown = (e: MouseEvent) => {
      // Only trigger on primary left click
      if (e.button !== 0) return;
      isDown = true;
      isDragging = false;
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    };

    const onMouseLeave = () => {
      isDown = false;
    };

    const onMouseUp = () => {
      isDown = false;
      // Allow slight delay before clearing isDragging so onClickCapture catches drag releases
      setTimeout(() => {
        isDragging = false;
      }, 50);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 1.3;
      if (Math.abs(walk) > 4) {
        isDragging = true;
      }
      el.scrollLeft = scrollLeft - walk;
    };

    // Capture click events during active drag so clicking is ignored when dragging
    const onClickCapture = (e: MouseEvent) => {
      if (isDragging) {
        e.stopPropagation();
        e.preventDefault();
      }
    };

    el.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('mouseup', onMouseUp);
    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('click', onClickCapture, true);

    return () => {
      el.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mouseup', onMouseUp);
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('click', onClickCapture, true);
    };
  }, []);

  return ref;
}

export default useDraggableScroll;

