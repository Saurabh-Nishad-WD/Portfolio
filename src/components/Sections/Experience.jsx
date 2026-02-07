import { motion } from "framer-motion";

const experiences = [
    {
        year: "2023",
        role: "Engineering Foundations",
        company: "KNIT Sultanpur",
        description:
            "Started my journey in Information Technology, focusing on frontend development, programming fundamentals, and problem-solving basics while understanding how modern web systems are built.",
        highlight: false,
    },
    {
        year: "2024",
        role: "Full-Stack & Core CS Learning",
        company: "Academic & Self-Driven Practice",
        description:
            "Expanded into backend development and advanced frameworks. Built strong foundations in Data Structures & Algorithms, Operating Systems, DBMS, OOPS, and system design concepts.",
        highlight: false,
    },
    {
        year: "2025",
        role: "Technical Engineer",
        company: "Srinzo (Startup)",
        description:
            "Managing and owning the technical aspects of Srinzo. Responsible for frontend and backend development, architectural decisions, performance optimization, and maintaining production-ready systems while collaborating closely with the founding team.",
        highlight: true,
    },
    {
        year: "2025 – Present",
        role: "Aspiring Software Engineer",
        company: "Seeking Internship Opportunities",
        description:
            "Actively seeking internship opportunities to apply my engineering skills in real-world teams, contribute to impactful products, and grow under experienced mentors.",
        highlight: false,
    },
];

const Experience = () => {
    return (
        <section className="min-h-screen flex flex-col justify-center px-6 py-28 relative z-10">
            <div className="max-w-4xl mx-auto w-full">

                {/* Section Title */}
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="block text-zinc-500 text-lg md:text-xl font-bold tracking-widest uppercase mb-20"
                >
                    Experience & Journey
                </motion.span>

                {/* Timeline */}
                <div className="relative border-l border-white/10 ml-3 md:ml-6 space-y-16">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                            className={`relative pl-8 md:pl-12 ${exp.highlight ? "py-8" : ""
                                }`}
                        >
                            {/* Timeline Dot */}
                            <div
                                className={`absolute -left-[7px] top-4 w-[14px] h-[14px] rounded-full border ${exp.highlight
                                        ? "bg-white border-white shadow-[0_0_20px_rgba(255,255,255,0.6)]"
                                        : "bg-black border-zinc-600"
                                    }`}
                            />

                            {/* Highlight Card */}
                            <div
                                className={`${exp.highlight
                                        ? "p-6 md:p-8 rounded-xl border border-white/20 bg-white/5 backdrop-blur-md"
                                        : ""
                                    }`}
                            >
                                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 mb-3">
                                    <h3
                                        className={`text-xl md:text-2xl ${exp.highlight
                                                ? "font-semibold text-white"
                                                : "font-normal text-white"
                                            }`}
                                    >
                                        {exp.role}
                                    </h3>
                                    <span className="text-sm font-mono text-zinc-500">
                                        {exp.year}
                                    </span>
                                </div>

                                <div
                                    className={`mb-4 ${exp.highlight
                                            ? "text-zinc-300 font-medium"
                                            : "text-zinc-400 font-medium"
                                        }`}
                                >
                                    {exp.company}
                                </div>

                                <p
                                    className={`leading-relaxed max-w-2xl ${exp.highlight ? "text-zinc-300" : "text-zinc-500"
                                        }`}
                                >
                                    {exp.description}
                                </p>

                                {/* Startup Badge */}
                                {exp.highlight && (
                                    <div className="mt-6 inline-block px-4 py-1 text-xs uppercase tracking-widest text-black bg-white rounded-full font-semibold">
                                        Startup · Technical Ownership
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
