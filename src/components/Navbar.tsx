/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Coffee, Menu, X, Flame, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { ActiveView } from '../types';

interface NavbarProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
}

export default function Navbar({ activeView, setActiveView }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Our Menu' },
    { id: 'customizer', label: 'Brew Lab 🧪' },
    { id: 'about', label: 'Our Story' },
    { id: 'contact', label: 'Contact & Finder' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0a0a0a]/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo Brand */}
          <div 
            onClick={() => setActiveView('home')} 
            className="flex cursor-pointer items-center space-x-3 group"
            id="nav-logo"
          >
            <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-[#c4a484] text-[#0a0a0a] transition-all duration-300 group-hover:scale-105 group-hover:bg-[#dcc4ac]">
              <Coffee className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#c4a484] opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-[#c4a484]"></span>
              </span>
            </div>
            <div>
              <span className="block font-serif text-2xl font-bold tracking-tight text-white">
                JMB <span className="text-[#c4a484] font-sans font-light">Coffee</span>
              </span>
              <span className="block font-sans text-[10px] uppercase tracking-widest text-[#c4a484]/80 font-medium">
                Est. 2026 • Premium Roastery
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => setActiveView(item.id as ActiveView)}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    isActive 
                      ? 'text-[#0a0a0a] font-semibold bg-[#c4a484]' 
                      : 'text-[#e0e0e0] hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Call to Action Customizer Button */}
          <div className="hidden md:block">
            <button
              id="desktop-customizer-btn"
              onClick={() => setActiveView('customizer')}
              className="group relative flex items-center space-x-2 overflow-hidden rounded-full bg-[#c4a484] px-5 py-2.5 text-sm font-semibold text-[#0a0a0a] transition-all duration-300 hover:bg-[#b08e6f] hover:shadow-md active:scale-98"
            >
              <Sparkles className="h-4 w-4 text-[#0a0a0a] transition-transform group-hover:rotate-12" />
              <span>Customize Cup</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden">
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-lg p-2 text-[#e0e0e0] hover:bg-white/5 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="md:hidden border-t border-white/5 bg-[#0e0e0e] px-2 pt-2 pb-4 space-y-1 shadow-inner">
          {navItems.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-nav-item-${item.id}`}
                onClick={() => {
                  setActiveView(item.id as ActiveView);
                  setIsOpen(false);
                }}
                className={`block w-full rounded-lg px-4 py-3 text-left text-base font-medium transition-colors ${
                  isActive 
                    ? 'bg-[#c4a484] text-[#0a0a0a] font-semibold' 
                    : 'text-[#e0e0e0] hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          <div className="pt-2 px-4">
            <button
              id="mobile-customizer-btn"
              onClick={() => {
                setActiveView('customizer');
                setIsOpen(false);
              }}
              className="flex w-full items-center justify-center space-x-2 rounded-lg bg-[#c4a484] py-3 text-center text-base font-semibold text-[#0a0a0a] shadow-sm hover:bg-[#b08e6f]"
            >
              <Sparkles className="h-5 w-5 text-[#0a0a0a]" />
              <span>Craft Your Custom Cup</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
