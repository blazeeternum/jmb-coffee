/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Coffee, Mail, ArrowRight, Instagram, Facebook, Twitter, Shield, Globe } from 'lucide-react';
import { useState, FormEvent } from 'react';
import { ActiveView } from '../types';

interface FooterProps {
  setActiveView: (view: ActiveView) => void;
}

export default function Footer({ setActiveView }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please provide a valid email format.');
      return;
    }

    setError('');
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer className="bg-[#080808] text-[#e0e0e0] border-t border-white/5 pt-16 pb-12" id="footer-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-white/5">
          
          {/* Logo & Slogan Column */}
          <div className="md:col-span-4 space-y-6 text-left">
            <div 
              onClick={() => setActiveView('home')} 
              className="flex cursor-pointer items-center space-x-3 group w-max"
              id="footer-logo"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#c4a484] text-[#0a0a0a] transition-all duration-300 group-hover:bg-[#dcc4ac]">
                <Coffee className="h-5 w-5" />
              </div>
              <div>
                <span className="block font-serif text-xl font-bold tracking-tight text-white">
                  JMB <span className="text-[#c4a484] font-sans font-light">Coffee</span>
                </span>
                <span className="block font-sans text-[8px] uppercase tracking-widest text-[#c4a484]/70 font-medium">
                  Est. 2026 • micro roastery
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-400 font-light leading-relaxed max-w-sm">
              We source single-origin specialty grades directly from independent farms, micro-roasting in small batches to preserve original terroir sweetness. Perfecting your daily ritual.
            </p>

            {/* Socials mockup */}
            <div className="flex space-x-4 pt-2">
              <a href="#instagram" className="h-8 w-8 rounded-full border border-white/5 flex items-center justify-center text-stone-400 hover:border-[#c4a484] hover:text-[#c4a484] transition-colors" aria-label="Instagram">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#facebook" className="h-8 w-8 rounded-full border border-white/5 flex items-center justify-center text-stone-400 hover:border-[#c4a484] hover:text-[#c4a484] transition-colors" aria-label="Facebook">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#twitter" className="h-8 w-8 rounded-full border border-white/5 flex items-center justify-center text-stone-400 hover:border-[#c4a484] hover:text-[#c4a484] transition-colors" aria-label="Twitter">
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-4 grid grid-cols-2 gap-8 text-left">
            <div className="space-y-4">
              <h4 className="text-xs uppercase font-extrabold tracking-widest text-[#c4a484]">Discover</h4>
              <ul className="space-y-2.5 text-xs font-light text-stone-400">
                <li>
                  <button onClick={() => setActiveView('home')} className="hover:text-white transition-colors">
                    Home Base
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveView('menu')} className="hover:text-white transition-colors">
                    Our Handcrafted Menu
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveView('customizer')} className="hover:text-white transition-colors">
                    Interactive Brew Lab 🧪
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveView('about')} className="hover:text-white transition-colors">
                    Our Roastery Story
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs uppercase font-extrabold tracking-widest text-[#c4a484]">Legal & Support</h4>
              <ul className="space-y-2.5 text-xs font-light text-stone-400">
                <li>
                  <button onClick={() => setActiveView('contact')} className="hover:text-white transition-colors">
                    Find JMB Stores
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveView('contact')} className="hover:text-white transition-colors">
                    Contact Validation HQ
                  </button>
                </li>
                <li className="flex items-center space-x-1.5 hover:text-white cursor-pointer transition-colors">
                  <Shield className="h-3.5 w-3.5 text-[#c4a484]" />
                  <span>Privacy Shield</span>
                </li>
                <li className="flex items-center space-x-1.5 hover:text-white cursor-pointer transition-colors">
                  <Globe className="h-3.5 w-3.5 text-[#c4a484]" />
                  <span>Sitemap Registry</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter subscription form column */}
          <div className="md:col-span-4 space-y-4 text-left">
            <h4 className="text-xs uppercase font-extrabold tracking-widest text-[#c4a484]">Join the JMB Journal</h4>
            <p className="text-xs text-stone-400 font-light leading-relaxed">
              Subscribe to unlock special micro-lot drops, brewing manuals, and secret lab recipes.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2" noValidate>
              <div className="relative">
                <input
                  type="email"
                  id="footer-email-input"
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  className={`w-full bg-[#141414] border text-[#e0e0e0] placeholder-stone-600 text-xs px-4 py-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#c4a484] transition-all ${
                    error ? 'border-red-500' : 'border-white/5'
                  }`}
                />
                <button
                  type="submit"
                  id="footer-subscribe-btn"
                  className="absolute right-1.5 top-1.5 rounded-lg bg-[#c4a484] p-1.5 text-[#0a0a0a] hover:bg-[#b08e6f] transition-colors"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              {error && <p className="text-[10px] font-bold text-red-500 mt-1" id="footer-email-err">{error}</p>}
              {subscribed && (
                <p className="text-[10px] font-bold text-green-500 mt-1" id="footer-email-ok">
                  ✔ Successfully subscribed to JMB Journal!
                </p>
              )}
            </form>
          </div>

        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 text-[11px] text-stone-500 font-light">
          <p>© 2026 JMB Coffee Roastery Co. All rights reserved. Crafting daily rituals.</p>
          <p className="mt-4 md:mt-0">
            BIBWB1114 Web Design Assignment Submission • Semester May 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
