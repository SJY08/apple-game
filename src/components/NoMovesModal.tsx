import { motion } from 'framer-motion';
import { FrownIcon } from 'lucide-react';

/** 더 이상 만들 수 있는 조합이 없을 때 뜨는 안내 모달 */
export function NoMovesModal() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
      className="absolute inset-0 z-10 flex items-center justify-center bg-stone-900/45 backdrop-blur-[2px]">

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
        role="alertdialog"
        aria-modal="true"
        aria-label="더 이상 사과를 제거할 수 없습니다"
        className="w-[380px] rounded-2xl bg-white p-8 text-center shadow-2xl">

        <FrownIcon className="mx-auto h-10 w-10 text-apple-500" aria-hidden="true" />
        <p className="mt-4 font-display text-xl text-stone-700">
          더 이상 사과를 제거할 수 없습니다.
        </p>
      </motion.div>
    </motion.div>);

}
