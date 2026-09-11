import { motion } from 'framer-motion';
import { PlayIcon } from 'lucide-react';

type StartScreenProps = {
  bestScore: number;
  roundSeconds: number;
  onStart: () => void;
};

/** 게임 시작 화면 컴포넌트 */
export function StartScreen({ bestScore, roundSeconds, onStart }: StartScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
      className="flex h-full w-full flex-col items-center justify-center px-10 text-center">
      
      <div className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-apple-500 shadow-[0_6px_0_0_rgba(150,32,26,0.45)]">
        <span aria-hidden="true" className="absolute -top-2 left-1/2 h-4 w-6 -translate-x-1/2 -rotate-12 rounded-[100%_0_100%_0] bg-leaf-400" />
        <span className="font-display text-4xl text-white">10</span>
      </div>

      <h1 className="font-display text-5xl text-stone-900">사과게임</h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-stone-600">
        마우스로 사과를 감싸 드래그하고, 선택된 숫자의 합을 정확히 10으로 만들어보세요. 제한 시간
        {' '}
        {roundSeconds}초 안에 최대한 많은 사과를 없애면 됩니다.
      </p>

      <button
        type="button"
        onClick={onStart}
        autoFocus
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-apple-500 px-9 py-3.5 font-display text-xl text-white shadow-[0_4px_0_0_rgba(150,32,26,0.5)] outline-none transition-[transform,background-color] duration-100 ease-out hover:bg-apple-600 focus-visible:ring-4 focus-visible:ring-apple-200 active:translate-y-[2px]">
        
        <PlayIcon className="h-5 w-5" aria-hidden="true" />
        게임 시작
      </button>

      <p className="mt-6 text-sm font-bold text-stone-500">
        최고 기록 <span className="text-stone-900 tabular-nums">{bestScore}</span>개
      </p>
    </motion.div>);

}