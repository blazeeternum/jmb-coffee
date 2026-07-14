/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Navbar from './components/Navbar';
import HomeView from './components/HomeView';
import MenuView from './components/MenuView';
import CustomizerView from './components/CustomizerView';
import AboutView from './components/AboutView';
import ContactView from './components/ContactView';
import Footer from './components/Footer';
import { ActiveView, CoffeeCustomization } from './types';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [selectedCustomizerPreset, setSelectedCustomizerPreset] = useState<Partial<CoffeeCustomization> | null>(null);

  // Clear helper for Customizer View deep link preset
  const handleClearPreset = () => {
    setSelectedCustomizerPreset(null);
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'home':
        return <HomeView setActiveView={setActiveView} />;
      case 'menu':
        return (
          <MenuView 
            setActiveView={setActiveView} 
            setSelectedCustomizerPreset={setSelectedCustomizerPreset} 
          />
        );
      case 'customizer':
        return (
          <CustomizerView 
            preset={selectedCustomizerPreset} 
            clearPreset={handleClearPreset} 
          />
        );
      case 'about':
        return <AboutView />;
      case 'contact':
        return <ContactView />;
      default:
        return <HomeView setActiveView={setActiveView} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e0e0e0] font-sans flex flex-col justify-between" id="app-root-container">
      {/* Dynamic Floating Notification Banner (Promotional) */}
      <div className="bg-[#141414] text-[#c4a484] text-[10px] font-semibold py-2.5 px-4 text-center tracking-widest uppercase flex items-center justify-center space-x-2 border-b border-white/5">
        <span>🎉 OPENING SPECIAL: USE CODE "JMBCRAFT" FOR 20% OFF COFFEE MICRO-LOTS</span>
      </div>

      {/* Main Navbar */}
      <Navbar activeView={activeView} setActiveView={setActiveView} />

      {/* Main View Wrapper with Page Transitions */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            {renderActiveView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Common Footer */}
      <Footer setActiveView={setActiveView} />
    </div>
  );
}
