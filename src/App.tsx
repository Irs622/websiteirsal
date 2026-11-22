import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Preloader } from './components/Preloader';
import { LazyMount } from './components/util/LazyMount';

const Footer = lazy(() => import('./components/Footer').then((m) => ({ default: m.Footer })));
import { Home } from './pages/Home';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetail } from './pages/ProjectDetail';
import { AboutPage } from './pages/AboutPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { ResearchPage } from './pages/ResearchPage';
import { ContactPage } from './pages/ContactPage';
import { CvPage } from './pages/CvPage';
import { NotFound } from './pages/NotFound';

function ScrollHandler() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace('#', '');
      const el = document.getElementById(targetId);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 50);
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash]);

  return null;
}

function MainLayout() {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#F4F4F2] text-[#1A1A18]">
      <Navigation />
      <main className="flex-1 overflow-x-clip">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/research" element={<ResearchPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/cv" element={<CvPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <LazyMount minHeight="420px">
        <Suspense fallback={<div style={{ minHeight: 420 }} aria-hidden="true" />}>
          <Footer />
        </Suspense>
      </LazyMount>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Preloader />
      <ScrollHandler />
      <MainLayout />
    </Router>
  );
}
