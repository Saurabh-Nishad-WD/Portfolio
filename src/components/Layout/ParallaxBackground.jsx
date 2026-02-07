import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const ParallaxBackground = () => {
    const { scrollYProgress } = useScroll();

    // Parallax transforms
    const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
    const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0.8]);

    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-black">
            {/* Deep Space / Dark Premium Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-black" />

            {/* Animated Gradient Orb 1 */}
            <motion.div
                style={{ y: y1, opacity }}
                className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-900/20 blur-[100px] rounded-full mix-blend-screen"
            />

            {/* Animated Gradient Orb 2 */}
            <motion.div
                style={{ y: y2 }}
                className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-blue-900/10 blur-[120px] rounded-full mix-blend-screen"
            />

            {/* Noise Texture Overlay for grain effect */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            {/* Grid overlay (optional technical feel) */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
        </div>
    );
};

export default ParallaxBackground;
