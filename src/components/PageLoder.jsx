import { motion, AnimatePresence } from 'framer-motion';

const PageLoder = () => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#050816]"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center gap-8">
          <div className="relative perspective-[1000px]">
            {/* 3D Cube */}
            <motion.div
              className="w-32 h-32 relative transform-style-preserve-3d"
              animate={{
                rotateX: [0, 360],
                rotateY: [0, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {/* Front face */}
              <motion.div
                className="absolute w-full h-full bg-[#915EFF]/20 border-2 border-[#915EFF]"
                style={{
                  transform: 'translateZ(64px)',
                  backfaceVisibility: 'hidden'
                }}
                animate={{
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Back face */}
              <motion.div
                className="absolute w-full h-full bg-[#915EFF]/20 border-2 border-[#915EFF]"
                style={{
                  transform: 'translateZ(-64px) rotateY(180deg)',
                  backfaceVisibility: 'hidden'
                }}
              />
              
              {/* Right face */}
              <motion.div
                className="absolute w-full h-full bg-[#915EFF]/20 border-2 border-[#915EFF]"
                style={{
                  transform: 'translateX(64px) rotateY(90deg)',
                  backfaceVisibility: 'hidden'
                }}
              />
              
              {/* Left face */}
              <motion.div
                className="absolute w-full h-full bg-[#915EFF]/20 border-2 border-[#915EFF]"
                style={{
                  transform: 'translateX(-64px) rotateY(-90deg)',
                  backfaceVisibility: 'hidden'
                }}
              />
              
              {/* Top face */}
              <motion.div
                className="absolute w-full h-full bg-[#915EFF]/20 border-2 border-[#915EFF]"
                style={{
                  transform: 'translateY(-64px) rotateX(90deg)',
                  backfaceVisibility: 'hidden'
                }}
              />
              
              {/* Bottom face */}
              <motion.div
                className="absolute w-full h-full bg-[#915EFF]/20 border-2 border-[#915EFF]"
                style={{
                  transform: 'translateY(64px) rotateX(-90deg)',
                  backfaceVisibility: 'hidden'
                }}
              />
            </motion.div>

            {/* Glowing shadow effect */}
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-32 h-8 bg-[#915EFF]/20 rounded-full blur-xl" />
          </div>
          
          {/* Loading text */}
          <motion.div
            className="text-white text-xl font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            Loading...
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PageLoder;