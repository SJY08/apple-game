import { AnimatePresence, motion } from 'framer-motion';

type AppleTileProps = {
  value: number | null;
  selected: boolean;
  interactive: boolean;
  exitDelay: number;
};

/** 사과 타일 컴포넌트 */
export function AppleTile({ value, selected, interactive, exitDelay }: AppleTileProps) {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <AnimatePresence>
        {value != null &&
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: selected ? 1.08 : 1, opacity: 1, y: 0, rotate: 0 }}
          exit={{
            y: 140,
            rotate: 26,
            scale: 0.85,
            opacity: 0,
            transition: {
              duration: 0.28,
              delay: exitDelay,
              ease: [0.4, 0, 0.7, 1]
            }
          }}
          transition={{ duration: selected ? 0.12 : 0.18, ease: [0.23, 1, 0.32, 1] }}
          className={[
          'relative flex h-full w-full items-center justify-center rounded-full',
          'text-[20px] font-black leading-none text-white',
          interactive && !selected ? 'hover:brightness-110' : '',
          selected ?
          'bg-apple-600 shadow-[0_2px_0_0_rgba(120,20,16,0.5)] ring-2 ring-white' :
          'bg-apple-500 shadow-[0_2px_0_0_rgba(150,32,26,0.45)]',
          'transition-[background-color,filter] duration-100 ease-out'].
          join(' ')}>

            <span
            aria-hidden="true"
            className="absolute -top-[3px] left-1/2 h-[7px] w-[9px] -translate-x-1/2 -rotate-12 rounded-[100%_0_100%_0] bg-leaf-400" />
          
            <span className="relative translate-y-[1px] tabular-nums">{value}</span>
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}