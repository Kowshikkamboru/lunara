/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense } from 'react';
import { NeuralBackground } from './components/canvas/NeuralBackground';
import { Header } from './components/Header';
import { Hero } from './components/sections/Hero';
import { CursorAura } from './components/CursorAura';
import { SmoothScroll } from './utils/scrollTo';

// Lazy load below-the-fold sections for faster initial paint
const Problem = React.lazy(() => import('./components/sections/Problem').then(m => ({ default: m.Problem })));
const Approach = React.lazy(() => import('./components/sections/Approach').then(m => ({ default: m.Approach })));
const Solutions = React.lazy(() => import('./components/sections/Solutions').then(m => ({ default: m.Solutions })));
const Evidence = React.lazy(() => import('./components/sections/Evidence').then(m => ({ default: m.Evidence })));
const FinalCTA = React.lazy(() => import('./components/sections/FinalCTA').then(m => ({ default: m.FinalCTA })));
const Footer = React.lazy(() => import('./components/Footer').then(m => ({ default: m.Footer })));

export default function App() {
  React.useEffect(() => {
    // Force browser to start at the top of the page on every reload
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-brand-night text-neutral-300 relative">
      <SmoothScroll />
      <NeuralBackground />
      <CursorAura />
      <Header />
      <main>
        <Hero />
        <Suspense fallback={<div className="min-h-screen bg-brand-night" />}>
          <Problem />
          <Approach />
          <Solutions />
          <Evidence />
          <FinalCTA />
        </Suspense>
      </main>
      
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}
