import { motion } from 'framer-motion';
import { HomeIcon, RotateCcwIcon } from 'lucide-react';

type GameOverScreenProps = {
  score: number;
  bestScore: number;
  isNewBest: boolean;
  onRestart: () => void;
  onHome: () => void;
};

/** 게임 종료 결과 컴포넌트 */
export function GameOverScreen({
  score,
  bestScore,
  isNewBest,
  onRestart,
  onHome
}: GameOverScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
      className="absolute inset-0 z-10 flex items-center justify-center bg-stone-900/45 backdrop-blur-[2px]">
      
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
        role="dialog"
        aria-modal="true"
        aria-label="게임 종료"
        className="w-[380px] rounded-2xl bg-white p-8 text-center shadow-2xl">
        
        <p className="font-display text-2xl tracking-wide text-stone-400">GAME OVER</p>

        {isNewBest &&
        <motion.p
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.12, duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
          className="mt-3 inline-block rounded-full bg-leaf-500 px-3 py-1 text-sm font-bold text-white">
          
            🎉 새로운 최고 기록!
          </motion.p>
        }

        <p className="mt-5 text-xs font-bold tracking-wide text-stone-500">없앤 사과</p>
        <motion.p
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
          className="font-display text-6xl leading-none text-apple-500 tabular-nums">
          
          {score}
        </motion.p>

        <p className="mt-4 text-sm font-bold text-stone-500">
          최고 기록 <span className="text-stone-900 tabular-nums">{bestScore}</span>개
        </p>

        <div className="mt-7 flex gap-3">
          <button
            type="button"
            onClick={onRestart}
            autoFocus
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-apple-500 px-4 py-3 font-display text-lg text-white shadow-[0_4px_0_0_rgba(150,32,26,0.5)] outline-none transition-[transform,background-color] duration-100 ease-out hover:bg-apple-600 focus-visible:ring-4 focus-visible:ring-apple-200 active:translate-y-[2px]">
            
            <RotateCcwIcon className="h-4 w-4" aria-hidden="true" />
            다시 시작
          </button>
          <button
            type="button"
            onClick={onHome}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-stone-100 px-4 py-3 font-display text-lg text-stone-700 outline-none transition-colors duration-100 ease-out hover:bg-stone-200 focus-visible:ring-4 focus-visible:ring-stone-200">
            
            <HomeIcon className="h-4 w-4" aria-hidden="true" />
            처음으로
          </button>
        </div>
      </motion.div>
    </motion.div>);

}