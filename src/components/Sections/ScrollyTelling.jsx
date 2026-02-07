import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Mail, Github, Linkedin } from 'lucide-react';

const FRAME_COUNT = 41;
const SKILLS = [
    "Builds Reliable Web Applications",
    "Writes Clean and Maintainable Code",
    "Strong Problem Solving with DSA",
    "Understands System Design Basics",
    "Focuses on Performance and Scalability"

];

const ScrollyTelling = () => {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const [images, setImages] = useState([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Load images on mount
    useEffect(() => {
        const loadImages = async () => {
            const loadedImages = [];
            for (let i = 1; i <= FRAME_COUNT; i++) {
                const img = new Image();
                const frameIndex = i.toString().padStart(3, '0');
                img.src = `/frames/ffout${frameIndex}.gif`;
                await new Promise((resolve) => {
                    img.onload = resolve;
                    // Continue even on error to prevent blocking, but logs would be good
                    img.onerror = resolve;
                });
                loadedImages.push(img);
            }
            setImages(loadedImages);
            setImagesLoaded(true);
        };
        loadImages();
    }, []);

    // Render frame based on scroll
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !imagesLoaded || images.length === 0) return;

        const ctx = canvas.getContext('2d');

        // Set canvas dimensions to window size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            // Initial draw after resize
            const currentProgress = scrollYProgress.get();
            const frameIndex = Math.min(
                FRAME_COUNT - 1,
                Math.floor(currentProgress * (FRAME_COUNT - 1))
            );
            drawImage(images[frameIndex]);
        };

        const drawImage = (img) => {
            if (!img) return;

            // Calculate 'cover' fit
            const ratio = Math.max(canvas.width / img.width, canvas.height / img.height);
            const centerShift_x = (canvas.width - img.width * ratio) / 2;
            const centerShift_y = (canvas.height - img.height * ratio) / 2;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(
                img,
                0, 0, img.width, img.height,
                centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
            );
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        // Subscribe to scroll changes
        const unsubscribe = scrollYProgress.on("change", (latest) => {
            const frameIndex = Math.min(
                FRAME_COUNT - 1,
                Math.floor(latest * (FRAME_COUNT - 1))
            );
            drawImage(images[frameIndex]);
        });

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            unsubscribe();
        };
    }, [imagesLoaded, images, scrollYProgress]);

    // --- Animation Transforms ---

    // Overlay 1: 0% -> 30% Scroll (Slower reveal)
    const overlay1Opacity = useTransform(scrollYProgress, [0, 0.05, 0.25, 0.3], [0, 1, 1, 0]);
    const overlay1Y = useTransform(scrollYProgress, [0, 0.05, 0.3], [50, 0, -50]);

    // Create a transform index for skills based on scroll part of Overlay 1
    const skillIndexFloat = useTransform(scrollYProgress, [0.05, 0.25], [0, SKILLS.length - 1]);

    // Overlay 2: Contact Info (End of Scroll - Right Side)
    // 70% -> 100%
    const overlay2Opacity = useTransform(scrollYProgress, [0.7, 0.8, 1], [0, 1, 1]);
    const overlay2X = useTransform(scrollYProgress, [0.7, 0.8], [50, 0]);

    return (
        <section ref={containerRef} className="h-[400vh] relative z-20 bg-black">
            <div className="sticky top-0 h-screen w-full overflow-hidden">

                {/* Canvas Background */}
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover" />

                {/* Loading Indicator */}
                {!imagesLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black z-50">
                        <span className="text-zinc-500 text-sm tracking-widest uppercase animate-pulse">Loading Sequence...</span>
                    </div>
                )}

                {/* Overlay 1: Rolling Skills (Centered) */}
                <motion.div
                    style={{ opacity: overlay1Opacity, y: overlay1Y }}
                    className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
                >
                    <div className="h-[40vh] flex flex-col items-center justify-center overflow-hidden mask-image-gradient">
                        {SKILLS.map((skill, index) => (
                            <SkillItem key={index} skill={skill} index={index} scrollProgress={skillIndexFloat} total={SKILLS.length} />
                        ))}
                    </div>
                </motion.div>

                {/* Overlay 2: Merged Contact Section (Right Side) */}
                <motion.div
                    style={{ opacity: overlay2Opacity, x: overlay2X }}
                    className="absolute inset-0 flex flex-col justify-center items-end px-6 md:px-20 pointer-events-none"
                >
                    <div className="text-right pointer-events-auto">
                        <span className="block text-white text-xl font-['Dancing_Script'] font-bold tracking-widest uppercase mb-6 underline underline-offset-8 decoration-white/30">
                            Get In Touch
                        </span>

                        <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight leading-tight">
                            Let's work <br /> together.
                        </h2>

                        <a
                            href="tel:+917651837446"
                            className="block text-xl md:text-2xl text-white hover:text-zinc-300 transition-colors mb-2"
                        >
                            +91 76518 37446
                        </a>

                        <a
                            href="mailto:bharatnishad.840@gmail.com"
                            className="inline-block text-xl md:text-2xl text-white hover:text-zinc-300 transition-colors border-b border-zinc-500 hover:border-white pb-1 mb-12"
                        >
                            bharatnishad.840@gmail.com
                        </a>

                        <div className="flex gap-6 justify-end">
                            <a href="https://github.com/Saurabh-Nishad-WD" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 rounded-full hover:bg-white/20 hover:scale-110 transition-all backdrop-blur-md">
                                <Github className="text-white" size={24} />
                            </a>
                            <a href="https://www.linkedin.com/in/saurabh-nishad-5ab072325/" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 rounded-full hover:bg-white/20 hover:scale-110 transition-all backdrop-blur-md">
                                <Linkedin className="text-white" size={24} />
                            </a>
                            <a href="mailto:bharatnishad.840@gmail.com" className="p-3 bg-white/10 rounded-full hover:bg-white/20 hover:scale-110 transition-all backdrop-blur-md">
                                <Mail className="text-white" size={24} />
                            </a>
                        </div>


                    </div>
                </motion.div>

            </div>
        </section>
    );
};

const SkillItem = ({ skill, index, scrollProgress, total }) => {
    // Determine the distance from the current scroll center
    const opacity = useTransform(scrollProgress, [index - 1, index, index + 1], [0.1, 1, 0.1]);
    const scale = useTransform(scrollProgress, [index - 1, index, index + 1], [0.8, 1.5, 0.8]);
    const color = useTransform(scrollProgress, [index - 0.5, index, index + 0.5], ["#9ca3af", "#60a5fa", "#9ca3af"]); // Gray -> Blue -> Gray

    // Y Position: Shift the entire list up as we scroll
    // We want the current index to be at the visual center (0 relative Y)
    // So if progress is 2, index 2 should be at 0.
    // If progress is 2, index 3 should be below.
    const itemHeight = 100; // Estimated height in px including margin
    const y = useTransform(scrollProgress, (val) => {
        return (index - val) * itemHeight;
    });

    return (
        <motion.div
            style={{ opacity, scale, y, color }}
            className="absolute inset-x-0 mx-auto max-w-[80%] md:max-w-full text-lg sm:text-2xl md:text-5xl font-black tracking-tight text-center leading-tight"
        >
            {skill}
        </motion.div>
    );
};

export default ScrollyTelling;
