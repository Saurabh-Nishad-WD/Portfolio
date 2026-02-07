import { motion } from "framer-motion";

const skills = [
    // 🔥 Highest Priority — Core Engineering
    { name: "Data Structures & Algorithms", level: "Strong" },
    { name: "JavaScript (ES6+)", level: "Advanced" },
    { name: "React.js", level: "Advanced" },
    { name: "HTML5 · CSS3 · Tailwind CSS", level: "Advanced" },

    // 🚀 Modern Web & Frameworks
    { name: "Next.js", level: "Intermediate" },
    { name: "TypeScript", level: "Intermediate" },
    { name: "Node.js", level: "Intermediate" },
    { name: "Express.js", level: "Intermediate" },

    // 🧠 System & CS Fundamentals
    { name: "System Design", level: "Learning / Practicing" },
    { name: "Object-Oriented Programming", level: "Strong" },
    { name: "Operating Systems", level: "Fundamentals" },
    { name: "DBMS", level: "Fundamentals" },

    // 🗄️ Databases
    { name: "SQL (MySQL · PostgreSQL)", level: "Intermediate" },
    { name: "NoSQL (MongoDB)", level: "Intermediate" },

    // 🤖 AI & Advanced Concepts
    { name: "AI Integrity", level: "Conceptual Knowledge" },

    // 🧰 Tools & Workflow
    { name: "Git & GitHub", level: "Daily Use" },
    { name: "Postman", level: "Comfortable" },
    { name: "Figma", level: "Comfortable" },
    { name: "shadcn/ui", level: "Intermediate" },

    // 🌀 Motion & Interaction
    { name: "Framer Motion", level: "Advanced" },
    { name: "Antigravity", level: "Creative Motion" },
];

const Skills = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.06 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 14 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <section className="min-h-[70vh] flex flex-col justify-center px-6 py-24 relative z-10">
            <div className="max-w-7xl mx-auto w-full">

                {/* Section Title */}
                <motion.span
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="block text-zinc-500 text-lg md:text-xl font-bold tracking-widest uppercase mb-14 text-center"
                >
                    Skills & Expertise
                </motion.span>

                {/* Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                >
                    {skills.map((skill, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ scale: 1.03 }}
                            className="p-5 border border-white/5 bg-black/30 backdrop-blur-sm rounded-md hover:border-white/10 transition-colors"
                        >
                            <h3 className="text-sm font-medium text-zinc-300">
                                {skill.name}
                            </h3>
                            <p className="text-[10px] mt-2 uppercase tracking-widest text-zinc-600 font-mono">
                                {skill.level}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;
