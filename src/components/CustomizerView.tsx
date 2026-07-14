/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { CoffeeCustomization } from '../types';
import { Sparkles, RefreshCw, Clipboard, Check, HelpCircle, Star, Flame, Award, Coffee, Eye, Plus, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CustomizerViewProps {
  preset?: Partial<CoffeeCustomization> | null;
  clearPreset?: () => void;
}

export default function CustomizerView({ preset, clearPreset }: CustomizerViewProps) {
  // Initialize customization state
  const [customization, setCustomization] = useState<CoffeeCustomization>({
    base: 'espresso-double',
    milk: 'whole',
    sweetness: 'normal',
    temperature: 'iced',
    syrup: 'none',
    toppings: []
  });

  const [ticketOpen, setTicketOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Apply deep link preset if present
  useEffect(() => {
    if (preset) {
      setCustomization((prev) => ({
        ...prev,
        ...preset
      }));
      if (clearPreset) clearPreset();
    }
  }, [preset, clearPreset]);

  // RESET handler
  const handleReset = () => {
    setCustomization({
      base: 'espresso-double',
      milk: 'whole',
      sweetness: 'normal',
      temperature: 'iced',
      syrup: 'none',
      toppings: []
    });
    setTicketOpen(false);
  };

  // Live Calculations
  const calculateStats = () => {
    let price = 3.50; // Base coffee price
    let calories = 5; // Base plain black coffee calories
    let caffeine = '150mg (High)';
    let sugar = 0;

    // 1. Base Adjustment
    if (customization.base === 'espresso-single') {
      price += 0.50;
      calories += 5;
      caffeine = '75mg (Medium)';
    } else if (customization.base === 'espresso-double') {
      price += 1.00;
      calories += 10;
      caffeine = '150mg (High)';
    } else if (customization.base === 'cold-brew') {
      price += 1.20;
      calories += 3;
      caffeine = '200mg (Very High)';
    } else if (customization.base === 'matcha') {
      price += 1.50;
      calories += 25;
      caffeine = '60mg (Medium)';
    } else if (customization.base === 'decaf') {
      price += 0.80;
      calories += 5;
      caffeine = '2mg (Minimal)';
    }

    // 2. Milk Adjustment
    if (customization.milk === 'whole') {
      price += 0.40;
      calories += 110;
    } else if (customization.milk === 'oat') {
      price += 0.80; // premium oat milk
      calories += 90;
    } else if (customization.milk === 'almond') {
      price += 0.70;
      calories += 45;
    } else if (customization.milk === 'coconut') {
      price += 0.75;
      calories += 75;
    }

    // 3. Syrup Adjustment
    if (customization.syrup !== 'none') {
      price += 0.50;
      calories += 80;
      sugar += 19; // grams of sugar per shot
    }

    // 4. Sweetness Adjustment
    if (customization.sweetness === 'less') {
      sugar += 5;
      calories += 20;
    } else if (customization.sweetness === 'normal') {
      sugar += 10;
      calories += 40;
    } else if (customization.sweetness === 'extra') {
      sugar += 20;
      calories += 80;
    }

    // 5. Toppings Adjustment
    customization.toppings.forEach((top) => {
      price += 0.40;
      if (top === 'whipped-cream') calories += 70;
      if (top === 'caramel-drizzle') {
        calories += 30;
        sugar += 7;
      }
      if (top === 'cocoa-powder' || top === 'cinnamon') calories += 5;
    });

    return { price, calories, caffeine, sugar };
  };

  const { price, calories, caffeine, sugar } = calculateStats();

  const handleToggleTopping = (top: string) => {
    setCustomization((prev) => {
      const exists = prev.toppings.includes(top);
      if (exists) {
        return { ...prev, toppings: prev.toppings.filter((t) => t !== top) };
      } else {
        return { ...prev, toppings: [...prev.toppings, top] };
      }
    });
  };

  const generateRecipeInstructions = () => {
    const list: string[] = [];
    
    // Step 1: Base cup syrup prep
    if (customization.syrup !== 'none') {
      list.push(`Pump 1 shot of gourmet ${customization.syrup} syrup into the base.`);
    }

    // Step 2: Ice prep
    if (customization.temperature === 'iced') {
      list.push('Fill the glass 70% full with crystal ice cubes.');
    } else if (customization.temperature === 'frappe') {
      list.push('Add ice and base ingredients to blender.');
    }

    // Step 3: Brew Base
    if (customization.base === 'espresso-single') {
      list.push('Extract 1 shot of espresso (30ml) using our Ethiopian single-origin bean.');
    } else if (customization.base === 'espresso-double') {
      list.push('Extract a rich double espresso (60ml) directly over the base.');
    } else if (customization.base === 'cold-brew') {
      list.push('Slow pour 90ml of cold-brewed coffee concentrate.');
    } else if (customization.base === 'matcha') {
      list.push('Whisk 3g of premium ceremonial Uji matcha with 40ml of hot water until frothy, then pour.');
    } else if (customization.base === 'decaf') {
      list.push('Extract 2 shots of Swiss water decaffeinated espresso.');
    }

    // Step 4: Milk
    if (customization.milk !== 'none') {
      const milkStyle = customization.temperature === 'hot' ? 'steamed and microfoamed' : 'cold organic';
      list.push(`Pour 150ml of ${milkStyle} ${customization.milk} milk into the mixture.`);
    } else {
      list.push('Fill remaining volume with filtered pure mountain water.');
    }

    // Step 5: Toppings
    if (customization.toppings.length > 0) {
      list.push(`Artfully garnish with: ${customization.toppings.map(t => t.replace('-', ' ')).join(', ')}.`);
    }

    return list;
  };

  const handleCopyRecipeText = () => {
    const text = `JMB COFFEE LAB RECIPE:
Base: ${customization.base}
Milk: ${customization.milk}
Sweetness: ${customization.sweetness}
Temperature: ${customization.temperature}
Syrup: ${customization.syrup}
Toppings: ${customization.toppings.join(', ') || 'none'}
---
Price: $${price.toFixed(2)} | Calories: ${calories} kcal | Caffeine: ${caffeine} | Sugar: ${sugar}g
Instructions:
${generateRecipeInstructions().map((ins, i) => `${i + 1}. ${ins}`).join('\n')}
    `;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper to determine the height fractions of coffee vs milk layers in the visual mug
  const getVisualLayerHeights = () => {
    let syrupHeight = customization.syrup !== 'none' ? '12%' : '0%';
    let baseHeight = '35%';
    let milkHeight = customization.milk !== 'none' ? '45%' : '0%';
    let toppingHeight = customization.toppings.includes('whipped-cream') ? '15%' : '8%';

    if (customization.milk === 'none') {
      baseHeight = '75%';
    }

    return { syrupHeight, baseHeight, milkHeight, toppingHeight };
  };

  const { syrupHeight, baseHeight, milkHeight, toppingHeight } = getVisualLayerHeights();

  // Helper colors for layers
  const getBaseColorClass = () => {
    if (customization.base === 'matcha') return 'bg-emerald-700 text-emerald-100';
    if (customization.base === 'cold-brew') return 'bg-stone-900 text-amber-500';
    return 'bg-amber-950 text-amber-400'; // espresso
  };

  const getMilkColorClass = () => {
    if (customization.milk === 'oat') return 'bg-amber-50 text-stone-600';
    if (customization.milk === 'almond') return 'bg-stone-100 text-stone-600';
    if (customization.milk === 'coconut') return 'bg-white text-stone-600';
    return 'bg-stone-50 text-stone-700'; // whole milk
  };

  const getSyrupColorClass = () => {
    if (customization.syrup === 'caramel') return 'bg-amber-600';
    if (customization.syrup === 'vanilla') return 'bg-yellow-100';
    if (customization.syrup === 'hazelnut') return 'bg-orange-800';
    return 'bg-transparent';
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-12 text-[#e0e0e0]" id="customizer-view-root">
      
      {/* Page Title */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-sm font-semibold uppercase tracking-widest text-[#c4a484]">Barista Workshop</span>
        <h1 className="font-serif text-4xl font-light tracking-tight text-white sm:text-5xl">Interactive Brew Lab</h1>
        <p className="text-stone-400 font-light text-base">
          Unleash your inner coffee curator. Adjust the parameters on the right to see your custom beverage layers and ingredients take shape dynamically in real-time.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* LEFT COLUMN: INTERACTIVE VISUAL MUG PREVIEW (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center bg-[#141414] rounded-3xl p-8 border border-white/5 shadow-2xl space-y-8 sticky top-28">
          <div className="flex w-full items-center justify-between border-b border-white/5 pb-4">
            <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">Active Recipe Preview</span>
            <button
              id="reset-customizer"
              onClick={handleReset}
              className="flex items-center space-x-1.5 text-xs text-[#c4a484] hover:text-[#b08e6f] font-semibold cursor-pointer"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Reset</span>
            </button>
          </div>

          {/* DYNAMIC CUP STACK WRAPPER */}
          <div className="relative h-[320px] w-full max-w-[260px] flex items-end justify-center pt-10">
            
            {/* Floatings Steam Vectors for Hot Cups */}
            {customization.temperature === 'hot' && (
              <div className="absolute top-0 flex space-x-3 text-[#c4a484]/30 select-none animate-pulse">
                <span className="text-xl animate-bounce" style={{ animationDuration: '2s' }}>~</span>
                <span className="text-2xl animate-bounce" style={{ animationDuration: '3s', animationDelay: '0.4s' }}>~</span>
                <span className="text-xl animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.8s' }}>~</span>
              </div>
            )}

            {/* MUG CONSTRUCT */}
            <div className="relative w-48 h-56 rounded-b-[60px] rounded-t-md border-x-8 border-b-8 border-white/10 bg-white/5 backdrop-blur-xs flex flex-col justify-end overflow-hidden shadow-xl z-10">
              
              {/* Floating Ice Cubes layer overlay (if iced) */}
              {customization.temperature === 'iced' && (
                <div className="absolute inset-0 z-20 flex flex-wrap items-center justify-center p-6 gap-3 pointer-events-none select-none opacity-60">
                  <div className="h-6 w-6 bg-cyan-200/40 rounded-md rotate-12 border border-white/40 shadow-sm"></div>
                  <div className="h-5 w-5 bg-cyan-100/40 rounded-md -rotate-12 border border-white/40 shadow-sm"></div>
                  <div className="h-6 w-6 bg-cyan-200/40 rounded-md rotate-45 border border-white/40 shadow-sm"></div>
                </div>
              )}

              {/* TOPPING / FOAM LAYER */}
              <div 
                style={{ height: toppingHeight }} 
                className="w-full bg-stone-900 flex items-center justify-center text-[10px] font-bold text-stone-500 uppercase tracking-widest relative transition-all duration-500"
              >
                {customization.toppings.includes('whipped-cream') ? (
                  <div className="absolute inset-x-0 bottom-0 h-10 bg-white rounded-t-full flex items-center justify-center text-[9px] font-extrabold text-stone-600">
                    ☁ WHIPPED CREAM
                  </div>
                ) : (
                  <span className="opacity-40 text-[8px] text-stone-500">🥛 Froth/Foam</span>
                )}
                
                {/* Sprinkles overlays */}
                {customization.toppings.includes('cocoa-powder') && (
                  <div className="absolute inset-x-0 top-0 h-1 bg-[radial-gradient(#5C4033_20%,transparent_30%)] bg-[length:6px_6px]"></div>
                )}
                {customization.toppings.includes('cinnamon') && (
                  <div className="absolute inset-x-0 top-1 h-1 bg-[radial-gradient(#D27D2D_20%,transparent_30%)] bg-[length:5px_5px]"></div>
                )}
              </div>

              {/* STEAMED MILK LAYER */}
              {customization.milk !== 'none' && (
                <div 
                  style={{ height: milkHeight }} 
                  className={`w-full ${getMilkColorClass()} flex items-center justify-center text-[10px] font-bold transition-all duration-500 relative border-t border-white/10`}
                >
                  <span className="opacity-75 tracking-wider font-extrabold uppercase text-[9px]">
                    🥛 {customization.milk} milk
                  </span>
                </div>
              )}

              {/* COFFEE/BASE BREW LAYER */}
              <div 
                style={{ height: baseHeight }} 
                className={`w-full ${getBaseColorClass()} flex items-center justify-center text-[10px] font-bold transition-all duration-500 relative border-t border-white/10`}
              >
                <span className="opacity-80 tracking-widest font-extrabold uppercase text-[9px]">
                  ☕ {customization.base.replace('-', ' ')}
                </span>
              </div>

              {/* SYRUP LAYER (bottom) */}
              {customization.syrup !== 'none' && (
                <div 
                  style={{ height: syrupHeight }} 
                  className={`w-full ${getSyrupColorClass()} flex items-center justify-center text-[8px] font-extrabold text-white uppercase tracking-widest transition-all duration-500`}
                >
                  🍯 {customization.syrup}
                </div>
              )}

            </div>

            {/* MUG HANDLE */}
            <div className="absolute right-6 top-[35%] h-24 w-12 rounded-r-[35px] border-8 border-white/10 bg-transparent z-0"></div>

            {/* Coaster bottom decoration */}
            <div className="absolute bottom-[-6px] h-3 w-56 rounded-full bg-black/40"></div>
          </div>

          {/* DYNAMIC CALCULATED NUTRITION & PRICE */}
          <div className="w-full bg-black/40 rounded-2xl p-6 text-[#e0e0e0] grid grid-cols-2 gap-4 border border-white/5">
            
            <div className="col-span-2 flex items-baseline justify-between border-b border-white/5 pb-3">
              <span className="text-xs text-stone-500 uppercase tracking-widest font-bold">Estimated Lab Price</span>
              <span className="text-3xl font-extrabold text-[#c4a484]" id="custom-total-price">
                ${price.toFixed(2)}
              </span>
            </div>

            <div className="text-left">
              <span className="block text-[10px] text-stone-500 uppercase tracking-wider font-semibold">Calories</span>
              <span className="text-sm font-bold text-[#e0e0e0]">{calories} kcal</span>
            </div>

            <div className="text-left">
              <span className="block text-[10px] text-stone-500 uppercase tracking-wider font-semibold">Caffeine Level</span>
              <span className="text-sm font-bold text-[#e0e0e0]">{caffeine}</span>
            </div>

            <div className="text-left">
              <span className="block text-[10px] text-stone-500 uppercase tracking-wider font-semibold">Sugar Level</span>
              <span className="text-sm font-bold text-[#e0e0e0]">{sugar} g</span>
            </div>

            <div className="text-left">
              <span className="block text-[10px] text-stone-500 uppercase tracking-wider font-semibold">Rating Grade</span>
              <span className="text-sm font-bold text-[#c4a484]">★ 5.0 (Custom)</span>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: INTERACTIVE CONTROLS PANEL (7 cols) */}
        <div className="lg:col-span-7 space-y-8 text-left">
          
          {/* Section 1: Temperature */}
          <div className="bg-[#141414] border border-white/5 p-6 rounded-2xl space-y-4">
            <h3 className="font-serif text-lg font-light text-white flex items-center space-x-2">
              <Flame className="h-5 w-5 text-[#c4a484]" />
              <span>1. Choose Temperature</span>
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {([
                { id: 'iced', label: 'Iced ❄', desc: 'Chilled over cubed ice' },
                { id: 'hot', label: 'Hot 🔥', desc: 'Perfectly warm and comforting' },
                { id: 'frappe', label: 'Blended 🌪', desc: 'Creamy milk blended ice' }
              ] as const).map((temp) => (
                <button
                  key={temp.id}
                  id={`option-temp-${temp.id}`}
                  onClick={() => setCustomization({ ...customization, temperature: temp.id })}
                  className={`rounded-xl p-3 border text-left transition-all cursor-pointer ${
                    customization.temperature === temp.id
                      ? 'bg-[#c4a484]/15 border-[#c4a484] ring-1 ring-[#c4a484]'
                      : 'bg-[#1a1a1a] border-white/5 hover:bg-white/5'
                  }`}
                >
                  <span className={`block font-bold text-sm ${customization.temperature === temp.id ? 'text-[#c4a484]' : 'text-white'}`}>{temp.label}</span>
                  <span className="block text-[10px] text-stone-400 mt-1">{temp.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Section 2: Brew Base */}
          <div className="bg-[#141414] border border-white/5 p-6 rounded-2xl space-y-4">
            <h3 className="font-serif text-lg font-light text-white flex items-center space-x-2">
              <Coffee className="h-5 w-5 text-[#c4a484]" />
              <span>2. Choose Brew Base</span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { id: 'espresso-single', label: 'Single Espresso', cost: '+$0.50' },
                { id: 'espresso-double', label: 'Double Espresso', cost: '+$1.00' },
                { id: 'cold-brew', label: 'Nitro Cold Brew', cost: '+$1.20' },
                { id: 'matcha', label: 'Ceremonial Matcha', cost: '+$1.50' },
                { id: 'decaf', label: 'Swiss Decaf', cost: '+$0.80' }
              ].map((b) => (
                <button
                  key={b.id}
                  id={`option-base-${b.id}`}
                  onClick={() => setCustomization({ ...customization, base: b.id as any })}
                  className={`rounded-xl p-3 border text-left transition-all cursor-pointer ${
                    customization.base === b.id
                      ? 'bg-[#c4a484]/15 border-[#c4a484] ring-1 ring-[#c4a484]'
                      : 'bg-[#1a1a1a] border-white/5 hover:bg-white/5'
                  }`}
                >
                  <span className={`block font-bold text-xs ${customization.base === b.id ? 'text-[#c4a484]' : 'text-white'}`}>{b.label}</span>
                  <span className="block text-[10px] text-stone-400 mt-1">Extra {b.cost}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Section 3: Milk Option */}
          <div className="bg-[#141414] border border-white/5 p-6 rounded-2xl space-y-4">
            <h3 className="font-serif text-lg font-light text-white flex items-center space-x-2">
              <Award className="h-5 w-5 text-[#c4a484]" />
              <span>3. Plant-Based & Premium Milk</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
              {[
                { id: 'none', label: 'Black / None', cost: '+$0.00' },
                { id: 'whole', label: 'Whole Milk', cost: '+$0.40' },
                { id: 'oat', label: 'Oat Milk 🌾', cost: '+$0.80' },
                { id: 'almond', label: 'Almond Milk 🥛', cost: '+$0.70' },
                { id: 'coconut', label: 'Coconut Milk 🥥', cost: '+$0.75' }
              ].map((m) => (
                <button
                  key={m.id}
                  id={`option-milk-${m.id}`}
                  onClick={() => setCustomization({ ...customization, milk: m.id as any })}
                  className={`rounded-xl p-2.5 border text-center transition-all cursor-pointer ${
                    customization.milk === m.id
                      ? 'bg-[#c4a484]/15 border-[#c4a484] ring-1 ring-[#c4a484] font-bold'
                      : 'bg-[#1a1a1a] border-white/5 hover:bg-white/5'
                  }`}
                >
                  <span className={`block font-semibold text-xs ${customization.milk === m.id ? 'text-[#c4a484]' : 'text-white'}`}>{m.label}</span>
                  <span className="block text-[9px] text-stone-500 mt-0.5">{m.cost}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Section 4: Sweetness & Syrups */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Sweetness */}
            <div className="bg-[#141414] border border-white/5 p-6 rounded-2xl space-y-4">
              <h4 className="font-serif text-base font-light text-white">Sweetness Intensity</h4>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'none', label: 'Unsweetened (0%)' },
                  { id: 'less', label: 'Less Sweet (30%)' },
                  { id: 'normal', label: 'Normal Standard' },
                  { id: 'extra', label: 'Extra Sweet (120%)' }
                ].map((s) => (
                  <button
                    key={s.id}
                    id={`option-sweetness-${s.id}`}
                    onClick={() => setCustomization({ ...customization, sweetness: s.id as any })}
                    className={`rounded-xl p-2.5 border text-left transition-all cursor-pointer ${
                      customization.sweetness === s.id
                        ? 'bg-[#c4a484]/15 border-[#c4a484] ring-1 ring-[#c4a484]'
                        : 'bg-[#1a1a1a] border-white/5 hover:bg-white/5'
                    }`}
                  >
                    <span className={`block font-semibold text-xs ${customization.sweetness === s.id ? 'text-[#c4a484]' : 'text-stone-300'}`}>{s.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Syrups */}
            <div className="bg-[#141414] border border-white/5 p-6 rounded-2xl space-y-4">
              <h4 className="font-serif text-base font-light text-white">Artisanal Syrup</h4>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'none', label: 'No Syrup' },
                  { id: 'caramel', label: 'Salted Caramel' },
                  { id: 'vanilla', label: 'Madagascar Vanilla' },
                  { id: 'hazelnut', label: 'Toasted Hazelnut' }
                ].map((sy) => (
                  <button
                    key={sy.id}
                    id={`option-syrup-${sy.id}`}
                    onClick={() => setCustomization({ ...customization, syrup: sy.id as any })}
                    className={`rounded-xl p-2.5 border text-left transition-all cursor-pointer ${
                      customization.syrup === sy.id
                        ? 'bg-[#c4a484]/15 border-[#c4a484] ring-1 ring-[#c4a484]'
                        : 'bg-[#1a1a1a] border-white/5 hover:bg-white/5'
                    }`}
                  >
                    <span className={`block font-semibold text-xs ${customization.syrup === sy.id ? 'text-[#c4a484]' : 'text-stone-300'}`}>{sy.label}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Section 5: Toppings */}
          <div className="bg-[#141414] border border-white/5 p-6 rounded-2xl space-y-4">
            <h3 className="font-serif text-lg font-light text-white flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-[#c4a484]" />
              <span>4. Artisanal Toppings (+$0.40 each)</span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { id: 'whipped-cream', label: 'Whipped Cream' },
                { id: 'cocoa-powder', label: 'Dark Cocoa dust' },
                { id: 'cinnamon', label: 'Warm Cinnamon' },
                { id: 'caramel-drizzle', label: 'Caramel drizzle' }
              ].map((top) => {
                const isSelected = customization.toppings.includes(top.id);
                return (
                  <button
                    key={top.id}
                    id={`option-topping-${top.id}`}
                    onClick={() => handleToggleTopping(top.id)}
                    className={`rounded-xl p-3 border text-left transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-[#c4a484]/15 border-[#c4a484] ring-1 ring-[#c4a484] font-bold'
                        : 'bg-[#1a1a1a] border-white/5 hover:bg-white/5'
                    }`}
                  >
                    <span className={`text-xs ${isSelected ? 'text-[#c4a484] font-bold' : 'text-stone-300'}`}>{top.label}</span>
                    <span className="text-xs text-[#c4a484]">{isSelected ? '✔' : '+'}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Ticket generation trigger */}
          <div className="flex gap-4">
            <button
              id="generate-ticket-btn"
              onClick={() => setTicketOpen(true)}
              className="flex-1 rounded-2xl bg-[#c4a484] text-[#0a0a0a] py-4 font-bold text-base hover:bg-[#b08e6f] transition-all duration-300 shadow-lg flex items-center justify-center space-x-2 cursor-pointer"
            >
              <ShoppingBag className="h-5 w-5" />
              <span>Generate Barista QR Ticket & Recipe</span>
            </button>
          </div>

        </div>

      </div>

      {/* MODAL BARISTA ORDER TICKET & RECIPE PRINT (Unique high-end interactivity!) */}
      <AnimatePresence>
        {ticketOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="customizer-ticket">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setTicketOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            ></motion.div>

            {/* Ticket body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="relative w-full max-w-md bg-[#FFFDF9] rounded-3xl p-6 shadow-2xl border-2 border-stone-800 text-left z-10 font-mono text-stone-900 overflow-hidden"
            >
              {/* Ticket jagged edge effect overlay */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-[radial-gradient(#000_15%,transparent_30%)] bg-[length:12px_12px] bg-repeat-x"></div>

              <div className="text-center space-y-2 mt-4">
                <span className="font-serif text-2xl font-black tracking-tight text-stone-900">JMB Coffee</span>
                <p className="text-[10px] text-stone-500 tracking-widest font-bold">BARISTA ASSEMBLY TICKET</p>
                <div className="border-t border-dashed border-stone-300 py-2">
                  <p className="text-[10px]">TIME: {new Date().toLocaleTimeString()} | TRANS# {Math.floor(Math.random() * 90000) + 10000}</p>
                </div>
              </div>

              {/* Recipe Specifications */}
              <div className="space-y-3 my-6 text-sm">
                <div className="flex justify-between border-b border-stone-100 pb-1.5">
                  <span className="text-stone-400">BREW BASE:</span>
                  <span className="font-bold uppercase text-stone-900">{customization.base.replace('-', ' ')}</span>
                </div>
                <div className="flex justify-between border-b border-stone-100 pb-1.5">
                  <span className="text-stone-400">ORGANIC MILK:</span>
                  <span className="font-bold uppercase text-stone-900">{customization.milk}</span>
                </div>
                <div className="flex justify-between border-b border-stone-100 pb-1.5">
                  <span className="text-stone-400">SWEETNESS:</span>
                  <span className="font-bold uppercase text-stone-900">{customization.sweetness}</span>
                </div>
                <div className="flex justify-between border-b border-stone-100 pb-1.5">
                  <span className="text-stone-400">TEMPERATURE:</span>
                  <span className="font-bold uppercase text-stone-900">{customization.temperature}</span>
                </div>
                <div className="flex justify-between border-b border-stone-100 pb-1.5">
                  <span className="text-stone-400">INFUSED SYRUP:</span>
                  <span className="font-bold uppercase text-stone-900">{customization.syrup}</span>
                </div>
                <div className="border-b border-stone-100 pb-1.5">
                  <span className="text-stone-400 block mb-1">TOPPING GARNISHES:</span>
                  <div className="flex flex-wrap gap-1">
                    {customization.toppings.length > 0 ? (
                      customization.toppings.map(t => (
                        <span key={t} className="text-[10px] bg-stone-900 text-stone-50 px-2 py-0.5 rounded uppercase font-bold">
                          {t.replace('-', ' ')}
                        </span>
                      ))
                    ) : (
                      <span className="font-bold text-stone-500 uppercase">NONE</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Barista Instructions */}
              <div className="bg-stone-100 rounded-xl p-4 space-y-2 text-xs">
                <p className="font-bold uppercase text-[10px] text-stone-500 tracking-wider">Barista Brew Sequence:</p>
                <ol className="list-decimal list-inside space-y-1 text-stone-700">
                  {generateRecipeInstructions().map((step, idx) => (
                    <li key={idx} className="leading-relaxed">{step}</li>
                  ))}
                </ol>
              </div>

              {/* Pricing breakdown */}
              <div className="border-t border-dashed border-stone-300 my-6 pt-4 text-center space-y-1">
                <div className="flex justify-between font-bold text-base">
                  <span>TOTAL ESTIMATED:</span>
                  <span>${price.toFixed(2)}</span>
                </div>
                <p className="text-[9px] text-stone-400">({calories} kcal | Sugar: {sugar}g | Caffeine: {caffeine})</p>
              </div>

              {/* Barcode Mock & QR Scan area */}
              <div className="flex flex-col items-center justify-center space-y-4 border-t border-stone-200 pt-6">
                
                {/* Simulated Barcode */}
                <div className="w-full h-12 flex justify-between bg-stone-950 p-1 opacity-80 select-none">
                  {[...Array(24)].map((_, idx) => (
                    <div 
                      key={idx} 
                      style={{ width: `${Math.random() > 0.5 ? '4px' : '1px'}` }} 
                      className="bg-[#FFFDF9] h-full"
                    ></div>
                  ))}
                </div>

                <div className="text-[9px] text-stone-400 tracking-widest text-center">
                  * PRESENT TICKET TO CASHIER *
                </div>

                <div className="flex gap-2 w-full pt-2">
                  <button
                    id="copy-recipe-btn"
                    onClick={handleCopyRecipeText}
                    className="flex-1 rounded-xl border border-stone-300 py-3 text-xs font-bold text-stone-800 hover:bg-stone-50 flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                  >
                    {copied ? <Check className="h-4 w-4 text-green-600" /> : <Clipboard className="h-4 w-4" />}
                    <span>{copied ? 'Copied Recipe!' : 'Copy Brew Specs'}</span>
                  </button>

                  <button
                    id="close-ticket-btn"
                    onClick={() => setTicketOpen(false)}
                    className="flex-1 rounded-xl bg-black py-3 text-xs font-bold text-stone-50 hover:bg-neutral-800 transition-colors text-center cursor-pointer"
                  >
                    Done
                  </button>
                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
