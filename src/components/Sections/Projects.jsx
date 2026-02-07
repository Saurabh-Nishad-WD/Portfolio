import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ExternalLink } from "lucide-react";

const projects = [
    {
        title: "Srinzo",
        category: "Venue Booking Platform",
        description: "A comprehensive venue booking application streamlining event management.",
        link: "https://srinzo.co.in/",
        color: "from-purple-900/50 to-blue-900/50"
    },
    {
        title: "SnapSync",
        category: "File Transfer Utility",
        description: "Quick and secure file transfer application built for speed and privacy.",
        link: "https://snap-sync-sepia.vercel.app/",
        color: "from-blue-900/50 to-cyan-900/50"
    },
    {
        title: "Open Source Contribution",
        category: "Open Source Contribution",
        description: "An open-source authentication UI project showcasing clean form validation, reusable components, and modern frontend best practices.",
        link: "https://github.com/Saurabh-Nishad/Login-Signup-Form",
        color: "from-orange-900/50 to-red-900/50"
    }
];

const ProjectCard = ({ project, index, progress }) => {
    const cardScale = useTransform(
        progress,
        [index * 0.2, 1],
        [1, 1 - (projects.length - index) * 0.05]
    );

    const cardY = useTransform(
        progress,
        [index * 0.25, index * 0.25 + 0.1],
        [100, 0]
    );

    return (
        <motion.div
            style={{ scale: cardScale, y: cardY }}
            className={`sticky top-20 md:top-[20vh] h-auto md:h-[60vh] w-full max-w-5xl mx-auto rounded-2xl border border-white/10 overflow-hidden bg-gradient-to-br ${project.color} backdrop-blur-xl shadow-2xl flex flex-col md:flex-row mb-12 md:mb-[10vh]`}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8 }}
        >
            {/* Text */}
            <div className="flex-1 p-6 md:p-10 flex flex-col justify-between order-2 md:order-1">
                <div>
                    <span className="text-xs font-bold tracking-widest uppercase text-white/60">
                        {project.category}
                    </span>
                    <h3 className="text-3xl md:text-5xl font-black text-white mt-4 mb-4 md:mb-6">
                        {project.title}
                    </h3>
                    <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-md">
                        {project.description}
                    </p>
                </div>

                <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-white font-bold text-base md:text-lg hover:text-white/80 transition-colors mt-6 md:mt-8"
                >
                    View Project <ExternalLink size={20} />
                </a>
            </div>

            {/* Visual Placeholder */}
            <div className="flex-1 h-48 md:h-auto bg-black/20 m-4 rounded-xl border border-white/5 relative overflow-hidden group order-1 md:order-2">
                <div className="absolute inset-0 flex items-center justify-center text-white/20 bg-grid-white/[0.05]">
                    <span className="text-6xl md:text-9xl font-black mix-blend-overlay opacity-40">
                        {index + 1}
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

const Projects = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    return (
        <section ref={containerRef} className="relative py-24 px-6 min-h-[300vh]">
            <div className="sticky top-10 mb-24 z-10 text-center">
                <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-zinc-500 text-sm md:text-lg font-bold tracking-widest uppercase"
                >
                    Selected Works
                </motion.span>
            </div>

            <div className="relative z-10 w-full">
                {projects.map((project, index) => (
                    <ProjectCard
                        key={index}
                        project={project}
                        index={index}
                        progress={scrollYProgress}
                    />
                ))}
            </div>
        </section>
    );
};

export default Projects;
