import { motion } from 'framer-motion';

const education = [
    {
        degree: "Bachelor of Technology",
        field: "Computer Science & Engineering",
        school: "University of Technology",
        year: "2016 - 2020"
    },
    {
        degree: "Higher Secondary Education",
        field: "Science (PCM)",
        school: "City High School",
        year: "2014 - 2016"
    }
];

const Education = () => {
    return (
        <section className="min-h-[50vh] flex flex-col justify-center px-6 py-20 relative z-10">
            <div className="max-w-4xl mx-auto w-full border-t border-white/10 pt-20">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="block text-zinc-500 text-sm font-bold tracking-widest uppercase mb-12"
                >
                    Education
                </motion.span>

                <div className="grid gap-8">
                    {education.map((edu, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex flex-col md:flex-row md:items-center justify-between group"
                        >
                            <div>
                                <h3 className="text-xl text-zinc-200 group-hover:text-white transition-colors">{edu.degree}</h3>
                                <p className="text-zinc-500">{edu.field}</p>
                            </div>
                            <div className="text-right md:text-left mt-2 md:mt-0">
                                <p className="text-zinc-400">{edu.school}</p>
                                <p className="text-zinc-600 font-mono text-sm">{edu.year}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;
