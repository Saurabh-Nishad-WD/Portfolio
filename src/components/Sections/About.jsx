import { motion } from "framer-motion";

const About = () => {
    return (
        <section className="min-h-screen flex items-center justify-center py-24 px-6 relative z-10">
            <div className="max-w-4xl w-full">

                {/* Section Label */}
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="block text-zinc-500 text-lg md:text-xl font-bold tracking-widest uppercase mb-12"
                >
                    About Me
                </motion.span>

                <div className="space-y-14">

                    {/* Headline */}
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-3xl md:text-5xl font-light leading-tight text-zinc-300"
                    >
                        I’m a <span className="text-white font-semibold">web engineer</span> who
                        blends <span className="text-white font-semibold">strong computer science fundamentals</span>{" "}
                        with modern web technologies to build reliable, scalable systems.
                    </motion.p>

                    {/* Description */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="grid md:grid-cols-2 gap-12 text-zinc-400 text-lg leading-relaxed"
                    >
                        <p>
                            My foundation lies in data structures, algorithms, operating systems,
                            object-oriented design, databases, and system design. I approach every
                            project by thinking about performance, scalability, and long-term
                            maintainability — not just how it looks.
                        </p>

                        <p>
                            On the web side, I work extensively with modern frontend and full-stack
                            technologies to craft fast, accessible, and visually polished
                            applications. I enjoy building products where engineering discipline
                            meets thoughtful user experience.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
