import { motion, useScroll, useTransform } from "framer-motion";

const Hero = () => {
    const { scrollYProgress } = useScroll({
        offset: ["start start", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.85]);
    const y = useTransform(scrollYProgress, [0, 0.5], [0, 80]);

    return (
        <section className="h-[200vh] relative">
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">

                {/* Main Content */}
                <motion.div
                    style={{ opacity, scale, y }}
                    className="text-center z-10 px-6"
                >
                    {/* Role */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.2 }}
                        className="text-xs md:text-sm text-zinc-400 uppercase tracking-[0.35em] mb-6"
                    >
                        Full-Stack Web Engineer · DSA Specialist · System Thinker
                    </motion.h2>

                    {/* Name */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="text-5xl md:text-9xl font-black text-white tracking-tight leading-[0.9]"
                    >
                        SAURABH <br className="hidden md:block" /> NISHAD
                    </motion.h1>

                    {/* Tagline */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.9 }}
                        className="mt-10 text-zinc-400 max-w-xl mx-auto text-base md:text-lg leading-relaxed"
                    >
                        Building modern, scalable, high-performance web applications with
                        strong foundations in data structures, algorithms, and system design —
                        not just visuals, but real-world engineering.
                    </motion.p>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 1.3 }}
                        className="mt-14 flex gap-6 justify-center flex-wrap"
                    >
                        <button
                            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                            className="px-10 py-3 bg-white text-black font-semibold rounded-full hover:bg-zinc-200 transition"
                        >
                            Explore Engineering Work
                        </button>

                        <button
                            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                            className="px-10 py-3 border border-zinc-700 text-white font-semibold rounded-full hover:bg-white/10 transition"
                        >
                            Let’s Build Something
                        </button>
                    </motion.div>

                    {/* Silent Skills */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        transition={{ duration: 1.2, delay: 1.8 }}
                        className="mt-10 text-xs tracking-widest uppercase text-zinc-500"
                    >
                        DSA · OS · OOPS · DBMS · System Design · ML Foundations
                    </motion.p>
                </motion.div>


            </div>
        </section>
    );
};

export default Hero;
