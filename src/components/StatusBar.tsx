import { motion } from 'framer-motion';
import { ClockIcon, TrophyIcon } from 'lucide-react';

type StatusBarProps = {
  score: number;
  bestScore: number;
  timeLeft: number;
  roundSeconds: number;
};

/** 점수·시간 상태 표시 컴포넌트 */
export function StatusBar({ score, bestScore, timeLeft, roundSeconds }: StatusBarProps) {
  const urgent = timeLeft <= 10;

  return (
    <div className="flex w-full items-end justify-between gap-6">
      <div className="flex items-end gap-8">
        <div>
          <p className="text-xs font-bold tracking-wide text-stone-500">없앤 사과</p>
          <p className="font-display text-4xl leading-none text-stone-900 tabular-nums">{score}</p>
        </div>

        <div>
          <p className="flex items-center gap-1 text-xs font-bold tracking-wide text-stone-500">
            <TrophyIcon className="h-3.5 w-3.5" aria-hidden="true" />
            최고 기록
          </p>
          <p className="font-display text-2xl leading-none text-stone-500 tabular-nums">
            {bestScore}
          </p>
        </div>
      </div>

      <div className="w-64">
        <div className="mb-1 flex items-center justify-between">
          <span className="flex items-center gap-1 text-xs font-bold tracking-wide text-stone-500">
            <ClockIcon className="h-3.5 w-3.5" aria-hidden="true" />
            남은 시간
          </span>
          <span
            className={[
            'font-display text-2xl leading-none tabular-nums',
            urgent ? 'text-apple-500' : 'text-stone-900'].
            join(' ')}>
            
            {timeLeft}초
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-stone-200">
          <motion.div
            className={urgent ? 'h-full bg-apple-500' : 'h-full bg-stone-800'}
            animate={{ width: `${timeLeft / roundSeconds * 100}%` }}
            transition={{ duration: 0.25, ease: 'linear' }} />
          
        </div>
      </div>
    </div>);

}