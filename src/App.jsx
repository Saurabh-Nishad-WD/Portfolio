import { Suspense, lazy } from 'react';
import ParallaxBackground from './components/Layout/ParallaxBackground';
import Hero from './components/Sections/Hero';

// Lazy load heavy/below-the-fold components
const About = lazy(() => import('./components/Sections/About'));
const Skills = lazy(() => import('./components/Sections/Skills'));
const Experience = lazy(() => import('./components/Sections/Experience'));
const Projects = lazy(() => import('./components/Sections/Projects'));
const ScrollyTelling = lazy(() => import('./components/Sections/ScrollyTelling'));

// Simple loading spinner
const LoadingSpinner = () => (
  <div className="w-full h-[50vh] flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
  </div>
);

function App() {
  return (
    <div className="min-h-screen bg-transparent relative text-white selection:bg-white/20">
      <ParallaxBackground />

      <main className="relative z-10 w-full">
        <Hero />

        <Suspense fallback={<LoadingSpinner />}>
          <About />
          <Skills />
          <Experience />
          <Projects />
          <ScrollyTelling />
        </Suspense>
      </main>
    </div>
  )
}

export default App
