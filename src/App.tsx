/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { NeuralBackground } from './components/canvas/NeuralBackground';
import { Header } from './components/Header';
import { Hero } from './components/sections/Hero';
import { Problem } from './components/sections/Problem';
import { Approach } from './components/sections/Approach';
import { Applications } from './components/sections/Applications';
import { Evidence } from './components/sections/Evidence';
import { FinalCTA } from './components/sections/FinalCTA';
import { Footer } from './components/Footer';
import { CursorAura } from './components/CursorAura';

export default function App() {
  return (
    <div className="min-h-screen bg-brand-night text-neutral-300 relative">
      <NeuralBackground />
      <CursorAura />
      <Header />
      <main>
        <Hero />
        <Problem />
        <Approach />
        <Applications />
        <Evidence />
        <FinalCTA />
      </main>
      
      <Footer />
    </div>
  );
}
