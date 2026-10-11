"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Loader() {
  const [done, setDone] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let n = 0;
    const id = setInterval(() => {
      n = Math.min(100, n + Math.ceil(Math.random() * 14));
      setCount(n);
      if (n >= 100) {
        clearInterval(id);
        setTimeout(() => setDone(true), 450);
      }
    }, 90);
    document.documentElement.style.overflow = "hidden";
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (done) document.documentElement.style.overflow = "";
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.span
            className="font-gothic chrome-text text-[28vw] leading-none md:text-[14vw]"
            initial={{ opacity: 0, filter: "blur(20px)" }}
            animate={{ opacity: [0, 1, 0.2, 1, 0.6, 1], filter: "blur(0px)" }}
            transition={{ duration: 1.2, times: [0, 0.3, 0.38, 0.5, 0.56, 1] }}
          >
            Tibe
          </motion.span>
          <span className="mt-6 font-mono text-xs tracking-[0.4em] text-silver">
            LADEN — {String(count).padStart(3, "0")}
          </span>
          <motion.span
            className="absolute bottom-0 left-0 h-[2px] bg-blood"
            animate={{ width: `${count}%` }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
