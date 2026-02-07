import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter } from 'lucide-react';

const Contact = () => {
    return (
        <section className="min-h-screen flex flex-col items-center justify-center px-6 relative z-10 overflow-hidden">
            {/* Background decoration for end of page */}
            <div className="absolute bottom-0 left-0 w-full h-[50vh] bg-gradient-to-t from-zinc-900 via-transparent to-transparent pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center z-10"
            >
                <span className="block text-zinc-500 text-sm font-bold tracking-widest uppercase mb-6">
                    Get in Touch
                </span>

                <h2 className="text-5xl md:text-7xl font-black text-white mb-10 tracking-tight">
                    Let's work <br /> together.
                </h2>

                <a
                    href="mailto:contact@saurabh.dev"
                    className="inline-block text-xl md:text-2xl text-zinc-300 hover:text-white transition-colors border-b border-zinc-700 hover:border-white pb-1 mb-16"
                >
                    contact@saurabh.dev
                </a>

                <div className="flex gap-8 justify-center">
                    <a href="#" className="p-4 bg-white/5 rounded-full hover:bg-white/10 hover:scale-110 transition-all">
                        <Github className="text-white" size={24} />
                    </a>
                    <a href="#" className="p-4 bg-white/5 rounded-full hover:bg-white/10 hover:scale-110 transition-all">
                        <Linkedin className="text-white" size={24} />
                    </a>
                    <a href="#" className="p-4 bg-white/5 rounded-full hover:bg-white/10 hover:scale-110 transition-all">
                        <Twitter className="text-white" size={24} />
                    </a>
                    <a href="#" className="p-4 bg-white/5 rounded-full hover:bg-white/10 hover:scale-110 transition-all">
                        <Mail className="text-white" size={24} />
                    </a>
                </div>

                <p className="mt-32 text-zinc-700 text-sm">
                    © {new Date().getFullYear()} Saurabh Nishad. All rights reserved.
                </p>
            </motion.div>
        </section>
    );
};

export default Contact;
