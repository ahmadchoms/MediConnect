import { motion } from "framer-motion";

export const IllustrationSection = ({ bgColor, children }) => (
  <motion.div
    className="hidden md:block"
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
  >
    <div className="relative h-96 w-full">
      <div
        className={`absolute inset-0 ${bgColor} rounded-2xl overflow-hidden flex items-center justify-center`}
      >
        <div className="p-8">{children}</div>
      </div>
    </div>
  </motion.div>
);
