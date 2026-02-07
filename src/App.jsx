import ParallaxBackground from './components/Layout/ParallaxBackground';
import Hero from './components/Sections/Hero';
import About from './components/Sections/About';
import Skills from './components/Sections/Skills';
import Experience from './components/Sections/Experience';
import Projects from './components/Sections/Projects';
import Education from './components/Sections/Education';
import Contact from './components/Sections/Contact';
import ScrollyTelling from './components/Sections/ScrollyTelling';

function App() {
  return (
    <div className="min-h-screen bg-transparent relative text-white selection:bg-white/20">
      <ParallaxBackground />

      <main className="relative z-10 w-full">
        <Hero />
        {/* <Education /> */}
        <About />
        <Skills />
        <Experience />
        <Projects />
        {/* <Contact /> */}
        <ScrollyTelling />
      </main>
    </div>
  )
}

export default App
