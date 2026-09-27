import React from 'react';
import { cn } from '@/lib/utils';
import { useDraggableScroll } from '@/hooks/useDraggableScroll';

export interface DraggableTabsWrapProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

/**
 * Wraps tab bars to make them horizontally scrollable and draggable on mobile and desktop,
 * hiding scrollbars cleanly while preserving all styling, active borders, and badges.
 */
export const DraggableTabsWrap: React.FC<DraggableTabsWrapProps> = ({
  children,
  className,
  ...props
}) => {
  const scrollRef = useDraggableScroll<HTMLDivElement>();

  return (
    <div
      ref={scrollRef}
      className={cn(
        'w-full overflow-x-auto scrollbar-none select-none cursor-grab active:cursor-grabbing',
        'touch-pan-x flex items-center flex-nowrap',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default DraggableTabsWrap;

