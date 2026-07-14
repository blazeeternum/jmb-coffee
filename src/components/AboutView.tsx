/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Award, ShieldCheck, Heart, Sparkles, MapPin, Coffee, Calendar, Compass } from 'lucide-react';
import { motion } from 'motion/react';

export default function AboutView() {
  const [roastLevel, setRoastLevel] = useState<'light' | 'medium' | 'dark'>('medium');

  const roastDetails = {
    light: {
      title: 'Light Roast (Cinnamon / New England)',
      color: 'bg-amber-600',
      shadow: 'shadow-amber-500/20',
      temp: '196°C - 205°C',
      origin: 'Yirgacheffe Ethiopia & Sidamo',
      notes: 'High complex acidity, bright floral jasmine, sweet citrus rind, honey tea body.',
      desc: 'Roasted just until the "first crack". This preserves the original terroir, organic acids, and floral flavor molecules of the coffee cherry. Best enjoyed as pour-over black.'
    },
    medium: {
      title: 'Medium Roast (City / American)',
      color: 'bg-amber-800',
      shadow: 'shadow-amber-800/30',
      temp: '210°C - 220°C',
      origin: 'Huila Colombia & Antigua Guatemala',
      notes: 'Balanced acidity & body, hazelnut praline, caramelized brown sugar, ripe stonefruits.',
      desc: 'Roasted through the first crack but stopped before the second. This achieves a perfect caramelization of natural sugars, balancing sweet body with elegant, smooth acidity.'
    },
    dark: {
      title: 'Dark Roast (French / Italian)',
      color: 'bg-stone-900',
      shadow: 'shadow-stone-900/40',
      temp: '225°C - 245°C',
      origin: 'Sumatra Mandheling & Premium Santos',
      notes: 'Heavy velvet body, low acidity, bittersweet dark chocolate, toasted oak, smoky molasses.',
      desc: 'Roasted until the "second crack". Oils migrate to the surface of the bean, resulting in a rich, bittersweet, chocolatey, and extremely bold body. Ideal for classic espresso and rich milk lattes.'
    }
  };

  const currentRoast = roastDetails[roastLevel];

  const milestones = [
    { year: 'Feb 2026', title: 'The Seed is Planted', desc: 'JMB Coffee was founded in a modest 150 sq.ft garage with a vintage 1kg roaster, driven by a simple mission: bringing world-class micro-roasts to our local community.' },
    { year: 'May 2026', title: 'Downtown Flagship', desc: 'Opened our flagship location featuring an open roastery concept, giving guests a multisensory look at raw beans transitioning to fresh cups.' },
    { year: 'Jul 2026', title: 'Global Direct Trade', desc: 'Formed direct partnerships with smallholder family farms in Colombia and Ethiopia, securing organic coffee lots while paying 45% above Fair Trade baselines.' }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-24 pb-20 text-[#e0e0e0]">
      
      {/* 1. EDITORIAL INTRO */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-left">
          <span className="text-sm font-semibold uppercase tracking-widest text-[#c4a484]">Our Heritage</span>
          <h1 className="font-serif text-4xl font-light tracking-tight text-white sm:text-5xl">
            Where Craft Meets Daily Rituals
          </h1>
          <p className="text-stone-400 font-light text-base leading-relaxed">
            At JMB Coffee, we believe a cup of coffee is more than just a shot of caffeine—it is a conscious choice, a sensory experience, and a daily ritual of mindfulness. 
          </p>
          <p className="text-stone-400 font-light text-base leading-relaxed">
            Our journey began with a persistent curiosity: how can we extract the cleanest, sweetest, and most complex flavors from a single green coffee seed? Today, we answer that through meticulous sourcing, precision roasting, and artistic barista execution.
          </p>
          
          <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/5">
            <div className="flex items-start space-x-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#c4a484]/10 text-[#c4a484]">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-medium text-white text-sm">Direct Trade Only</h4>
                <p className="text-xs text-stone-500 font-light mt-0.5">Sourced ethically from independent farmers.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#c4a484]/10 text-[#c4a484]">
                <Compass className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-medium text-white text-sm">Small-Batch Roasts</h4>
                <p className="text-xs text-stone-500 font-light mt-0.5">Roasting maximum 10kg batches for absolute control.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Banner graphic */}
        <div className="flex justify-center">
          <div className="relative h-[400px] w-full max-w-[450px] bg-gradient-to-b from-[#141414] to-[#0a0a0a] rounded-3xl p-8 text-stone-100 flex flex-col justify-between overflow-hidden shadow-2xl border border-white/5">
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#c4a484]/10 blur-3xl"></div>
            
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <span className="text-xs uppercase tracking-widest text-[#c4a484] font-bold">JMB Roastery Logbook</span>
              <span className="text-xs text-stone-500">Vol. 01</span>
            </div>

            <div className="my-auto space-y-6">
              <span className="text-5xl block font-serif text-[#c4a484]">“</span>
              <p className="text-lg italic font-light leading-relaxed text-stone-300">
                We roast not to impose a flavor, but to uncover the soul of the bean that the soil, high altitude, and the farmer have painstakingly forged.
              </p>
              <span className="text-sm font-semibold block text-[#c4a484]">— JMB Head Roaster</span>
            </div>

            <div className="flex items-center space-x-4 border-t border-white/5 pt-4">
              <div className="h-10 w-10 rounded-full bg-[#c4a484] flex items-center justify-center font-bold text-sm text-[#0a0a0a]">JMB</div>
              <div>
                <span className="block text-xs font-bold text-stone-100">JMB Coffee Roastery</span>
                <span className="block text-[10px] text-stone-500">Est. 2026 • Premium Grade</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DYNAMIC INTERACTIVE ROASTING bean color SIMULATOR (Unique Interactive UI Component!) */}
      <section className="bg-[#141414] rounded-3xl p-8 md:p-12 border border-white/5">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-sm font-semibold uppercase tracking-widest text-[#c4a484]">Interactive Lab</span>
          <h2 className="font-serif text-3xl font-light tracking-tight text-white">Precision Roasting Color Simulator</h2>
          <p className="text-stone-400 font-light text-sm">
            Coffee beans transform radically during the heat roasting process. Click the roast levels below to simulate the physical bean color shift and see tasting notes change in real-time!
          </p>
        </div>

        {/* Interactive Controls */}
        <div className="flex justify-center space-x-2 sm:space-x-4 mt-8" id="roast-level-controls">
          {(['light', 'medium', 'dark'] as const).map((level) => (
            <button
              key={level}
              id={`roast-btn-${level}`}
              onClick={() => setRoastLevel(level)}
              className={`rounded-full px-6 py-3 text-xs sm:text-sm font-semibold uppercase tracking-widest transition-all cursor-pointer ${
                roastLevel === level
                  ? 'bg-[#c4a484] text-[#0a0a0a] shadow-md font-bold'
                  : 'bg-[#1a1a1a] text-stone-300 border border-white/5 hover:bg-white/5'
              }`}
            >
              {level} Roast
            </button>
          ))}
        </div>

        {/* Simulator display screen */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mt-12 bg-black/40 rounded-2xl p-6 md:p-10 border border-white/5 shadow-2xl">
          
          {/* Simulated Coffee Bean Illustration (5 cols) */}
          <div className="md:col-span-5 flex flex-col items-center justify-center space-y-4">
            <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Simulated Bean Physical State</span>
            
            {/* Elegant physical coffee bean drawing using tailwind curves */}
            <div className="relative flex items-center justify-center h-48 w-48">
              {/* Bean back shadow */}
              <div className="absolute inset-0 rounded-full bg-black/40 blur-md"></div>
              
              {/* Bean halves (Split by vertical crack line) */}
              <div className="relative flex w-36 h-28">
                {/* Left Half of bean */}
                <div className={`w-1/2 h-full rounded-l-[70px] rounded-r-[10px] ${currentRoast.color} ${currentRoast.shadow} shadow-2xl transition-all duration-700 border-r border-amber-950/20`}></div>
                
                {/* Right Half of bean */}
                <div className={`w-1/2 h-full rounded-r-[70px] rounded-l-[10px] ${currentRoast.color} ${currentRoast.shadow} shadow-2xl transition-all duration-700 border-l border-amber-950/20`}></div>
                
                {/* Organic wavy center crack line */}
                <div className="absolute inset-y-0 left-1/2 -ml-[2px] w-1 bg-stone-950/40 rounded-full rotate-3 transition-all duration-500"></div>
              </div>
            </div>

            {/* Simulated Bean Temperature badge */}
            <div className="rounded-lg bg-[#1a1a1a] border border-white/5 px-4 py-1.5 text-xs font-mono font-bold text-[#c4a484]">
              Chamber Heat: {currentRoast.temp}
            </div>
          </div>

          {/* Details (7 cols) */}
          <div className="md:col-span-7 space-y-5 text-left border-t md:border-t-0 md:border-l border-white/5 pt-6 md:pt-0 md:pl-10">
            <span className="text-xs uppercase font-extrabold tracking-wider text-[#c4a484]">Active Profile</span>
            <h3 className="font-serif text-2xl font-light text-white">{currentRoast.title}</h3>
            
            <p className="text-sm text-stone-400 leading-relaxed font-light">{currentRoast.desc}</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/5 pt-5">
              <div>
                <span className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest">Best Varieties:</span>
                <span className="text-xs font-semibold text-stone-300">{currentRoast.origin}</span>
              </div>
              <div>
                <span className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest">Tasting Notes:</span>
                <span className="text-xs font-semibold text-[#c4a484]">{currentRoast.notes}</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. TIMELINE HISTORY */}
      <section className="mx-auto max-w-3xl space-y-12">
        <div className="text-center space-y-4">
          <span className="text-sm font-semibold uppercase tracking-widest text-[#c4a484]">Timeline</span>
          <h2 className="font-serif text-3xl font-light tracking-tight text-white">The Story So Far</h2>
          <p className="text-stone-400 font-light text-sm">Tracing our footprints from a small passionate roaster to a premium neighborhood hub.</p>
        </div>

        <div className="relative border-l border-white/10 pl-6 ml-4 md:ml-20 space-y-10" id="story-timeline">
          {milestones.map((ms, index) => (
            <div key={index} className="relative group text-left">
              {/* Point Dot */}
              <span className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#0a0a0a] border-2 border-[#c4a484]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#c4a484]"></span>
              </span>
              
              <div className="space-y-2">
                <span className="inline-block rounded-md bg-[#141414] border border-white/5 px-2.5 py-1 text-xs font-mono font-bold text-[#c4a484]">
                  {ms.year}
                </span>
                <h4 className="font-serif text-lg font-light text-white group-hover:text-[#c4a484] transition-colors">{ms.title}</h4>
                <p className="text-sm text-stone-400 leading-relaxed font-light">{ms.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
