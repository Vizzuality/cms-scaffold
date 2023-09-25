import React from 'react';

import { useNProgress } from '@tanem/react-nprogress';

import { cn } from '@/lib/classnames';

export interface NProgressProps {
  loading?: boolean;
}

export const NProgress: React.FC<NProgressProps> = ({ loading }: NProgressProps) => {
  const { isFinished, progress } = useNProgress({
    isAnimating: loading,
  });

  return (
    <div
      className={cn({
        'pointer-events-none fixed z-50 h-full w-full': true,
        'opacity-0': isFinished,
      })}
    >
      <div
        className={cn({
          'from-navy-400 to-navy-500 absolute left-0 top-0 h-0.5 w-full bg-gradient-to-r transition-transform lg:h-1':
            true,
        })}
        style={{
          transform: `translateX(${-100 + progress * 100}%)`,
        }}
      />
    </div>
  );
};

export default NProgress;
