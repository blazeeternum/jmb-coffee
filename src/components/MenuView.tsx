/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { MenuItem, MENU_ITEMS, ActiveView } from '../types';
import { Search, Star, Flame, Eye, Sparkles, X, Heart, ShoppingBag, Coffee } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import specialtyCoffeeImg from '../assets/images/specialty_coffee_1783584814461.jpg';
import icedCoffeeImg from '../assets/images/iced_coffee_1783584831760.jpg';

interface MenuViewProps {
  setActiveView: (view: ActiveView) => void;
  setSelectedCustomizerPreset?: (preset: any) => void;
}

export default function MenuView({ setActiveView, setSelectedCustomizerPreset }: MenuViewProps) {
  const getCoffeeImage = (item: MenuItem) => {
    if (item.category === 'pastries') return null;
    const isIced = item.category === 'frappe' || 
                   item.name.toLowerCase().includes('iced') || 
                   item.name.toLowerCase().includes('cold') || 
                   item.name.toLowerCase().includes('shakerato') || 
                   item.name.toLowerCase().includes('cloud');
    return isIced ? icedCoffeeImg : specialtyCoffeeImg;
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('default');
  
  // Lightbox / detail modal state
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [itemSize, setItemSize] = useState<'S' | 'M' | 'L'>('M');
  const [itemTemp, setItemTemp] = useState<'hot' | 'iced'>('iced');
  const [cartSuccess, setCartSuccess] = useState(false);

  // Categories
  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'espresso', label: 'Classic Espresso' },
    { id: 'signature', label: 'Signature Brews' },
    { id: 'frappe', label: 'Ice Blended' },
    { id: 'tea-others', label: 'Tea & Others' },
    { id: 'pastries', label: 'Gourmet Pastries' }
  ];

  // Filtering & Sorting Logic
  const filteredAndSortedItems = useMemo(() => {
    let results = MENU_ITEMS.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    if (sortBy === 'price-low') {
      results = [...results].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      results = [...results].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      results = [...results].sort((a, b) => b.rating - a.rating);
    }

    return results;
  }, [searchTerm, selectedCategory, sortBy]);

  const handleOpenDetail = (item: MenuItem) => {
    setSelectedItem(item);
    setItemSize('M');
    setItemTemp(item.category === 'pastries' || item.category === 'frappe' ? 'iced' : 'iced');
    setCartSuccess(false);
  };

  const getAdjustedPrice = () => {
    if (!selectedItem) return 0;
    let base = selectedItem.price;
    if (itemSize === 'S') base -= 0.50;
    if (itemSize === 'L') base += 0.80;
    return base;
  };

  const handleDeepLinkCustomizer = () => {
    if (!selectedItem || !setSelectedCustomizerPreset) return;
    
    // Set appropriate preset
    const preset = {
      base: selectedItem.category === 'tea-others' && selectedItem.name.includes('Matcha') ? 'matcha' : 'espresso-double',
      milk: selectedItem.tags.includes('Oat Milk') || selectedItem.tags.includes('Dairy Free') ? 'oat' : 'whole',
      sweetness: 'normal',
      temperature: itemTemp,
      syrup: selectedItem.name.includes('Caramel') ? 'caramel' : selectedItem.name.includes('Vanilla') ? 'vanilla' : 'none',
      toppings: selectedItem.name.includes('Cloud') ? ['whipped-cream'] : []
    };
    
    setSelectedCustomizerPreset(preset);
    setSelectedItem(null);
    setActiveView('customizer');
  };

  const handleMockAddToCart = () => {
    setCartSuccess(true);
    setTimeout(() => {
      setCartSuccess(false);
      setSelectedItem(null);
    }, 1500);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-12 text-[#e0e0e0]" id="menu-view-root">
      
      {/* Editorial Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-sm font-semibold uppercase tracking-widest text-[#c4a484]">Sensory Journey</span>
        <h1 className="font-serif text-4xl font-light tracking-tight text-white sm:text-5xl">Our Crafted Menu</h1>
        <p className="text-stone-400 font-light text-base">
          Every beverage is handcrafted using single-origin Arabica coffee beans and premium additives. Our pastries are baked daily by artisan French pastry chefs.
        </p>
      </div>

      {/* FILTER & SEARCH RAIL */}
      <div className="bg-[#141414] rounded-2xl border border-white/5 p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Search box */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-stone-500" />
            </div>
            <input
              type="text"
              id="menu-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search coffee, tea, pastries..."
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-white/10 bg-[#1a1a1a] text-white focus:border-[#c4a484] focus:outline-none focus:ring-1 focus:ring-[#c4a484] text-sm transition-all"
            />
          </div>

          {/* Sort selection */}
          <div className="flex items-center space-x-3 self-end md:self-auto">
            <label className="text-xs font-semibold text-stone-500 uppercase tracking-widest" htmlFor="menu-sort-by">Sort By:</label>
            <select
              id="menu-sort-by"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-xl border border-white/10 bg-[#1a1a1a] px-4 py-3 text-white text-sm focus:border-[#c4a484] focus:outline-none focus:ring-1 focus:ring-[#c4a484] transition-all cursor-pointer"
            >
              <option value="default" className="bg-[#141414]">Default Featured</option>
              <option value="price-low" className="bg-[#141414]">Price: Low to High</option>
              <option value="price-high" className="bg-[#141414]">Price: High to Low</option>
              <option value="rating" className="bg-[#141414]">Rating: Top Rated</option>
            </select>
          </div>
        </div>

        {/* Category Filters (Horizontal Rail) */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5" id="category-filters">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`filter-${cat.id}`}
              onClick={() => setSelectedCategory(cat.id)}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#c4a484] text-[#0a0a0a] shadow-md font-semibold'
                  : 'bg-[#1a1a1a] text-stone-300 hover:bg-white/5 border border-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* FILTERABLE CATALOG GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <AnimatePresence>
          {filteredAndSortedItems.length > 0 ? (
            filteredAndSortedItems.map((item) => (
              <motion.div
                key={item.id}
                id={`menu-card-${item.id}`}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group relative rounded-2xl bg-[#141414] border border-white/5 p-5 flex flex-col justify-between hover:shadow-2xl hover:border-[#c4a484]/30 hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  {/* Dynamic Badges */}
                  <div className="absolute top-4 left-4 z-10 flex flex-col gap-1">
                    {item.isBestSeller && (
                      <span className="rounded-full bg-[#c4a484] px-3 py-1 text-[10px] font-bold text-[#0a0a0a] uppercase tracking-widest shadow-sm">
                        Best Seller
                      </span>
                    )}
                    {item.isNew && (
                      <span className="rounded-full bg-white px-3 py-1 text-[10px] font-bold text-black uppercase tracking-widest shadow-sm">
                        New
                      </span>
                    )}
                  </div>

                  {/* Aesthetic visual illustration card */}
                  <div className="relative h-44 w-full rounded-xl bg-[#1a1a1a] flex items-center justify-center overflow-hidden border border-white/5 mb-5">
                    {getCoffeeImage(item) ? (
                      <img
                        src={getCoffeeImage(item)!}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="text-6xl group-hover:scale-110 transition-transform duration-300 select-none">
                        🥐
                      </div>
                    )}
                    {/* View overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                      <button
                        id={`quick-view-btn-${item.id}`}
                        onClick={() => handleOpenDetail(item)}
                        className="rounded-full bg-white p-3 text-[#0a0a0a] hover:bg-[#c4a484] shadow-lg transition-transform hover:scale-105 cursor-pointer"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  {/* Title & Reviews */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#c4a484]">
                      {item.category.replace('-', ' ')}
                    </span>
                    <div className="flex items-center space-x-1 text-[#c4a484] text-xs font-semibold">
                      <span>★</span>
                      <span className="text-stone-300">{item.rating}</span>
                    </div>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-white mt-2 hover:text-[#c4a484] transition-colors">
                    {item.name}
                  </h3>
                  
                  <p className="text-xs text-stone-400 font-light mt-1.5 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Pricing & CTA */}
                <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/5">
                  <div>
                    <span className="block text-[10px] text-stone-500 uppercase tracking-widest">Price</span>
                    <span className="text-xl font-extrabold text-white">${item.price.toFixed(2)}</span>
                  </div>

                  <button
                    id={`view-details-${item.id}`}
                    onClick={() => handleOpenDetail(item)}
                    className="rounded-lg bg-[#1a1a1a] border border-white/5 px-4 py-2.5 text-xs font-semibold text-stone-300 hover:bg-[#c4a484] hover:text-[#0a0a0a] transition-colors cursor-pointer"
                  >
                    Select Options
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 bg-[#141414] rounded-2xl border border-white/5">
              <span className="text-4xl">☕</span>
              <h3 className="font-serif text-xl font-bold text-white mt-4">No beverages found</h3>
              <p className="text-sm text-stone-400 mt-2">Try adjusting your filters or search keywords.</p>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* LIGHT-BOX POPUP / DETAIL MODAL */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="menu-lightbox">
            {/* Modal backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            ></motion.div>

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-[#141414] p-6 md:p-8 shadow-2xl border border-white/5 text-left z-10"
            >
              {/* Close Button */}
              <button
                id="lightbox-close-btn"
                onClick={() => setSelectedItem(null)}
                className="absolute right-4 top-4 rounded-full bg-[#1a1a1a] p-2 text-stone-300 hover:bg-white/5 cursor-pointer border border-white/5"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Visual Card */}
                <div className="flex flex-col justify-between">
                  <div className="relative h-64 w-full rounded-2xl bg-[#1a1a1a] flex items-center justify-center border border-white/5 overflow-hidden">
                    <span className="absolute top-4 left-4 z-10 rounded-full bg-[#c4a484] px-3 py-1 text-[10px] font-bold text-[#0a0a0a] uppercase tracking-widest shadow-sm">
                      {selectedItem.tags[0] || 'Selected Item'}
                    </span>
                    {getCoffeeImage(selectedItem) ? (
                      <img
                        src={getCoffeeImage(selectedItem)!}
                        alt={selectedItem.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <span className="text-8xl select-none">🥐</span>
                    )}
                  </div>

                  {/* Mini-nutrition details */}
                  <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                    <div className="bg-[#1a1a1a] rounded-xl p-2.5 border border-white/5">
                      <span className="block text-[8px] text-stone-500 uppercase tracking-wider">Calories</span>
                      <span className="text-xs font-bold text-[#c4a484]">{selectedItem.calories} kcal</span>
                    </div>
                    <div className="bg-[#1a1a1a] rounded-xl p-2.5 border border-white/5">
                      <span className="block text-[8px] text-stone-500 uppercase tracking-wider">Sugar</span>
                      <span className="text-xs font-bold text-[#c4a484]">
                        {selectedItem.category === 'pastries' ? '12g' : selectedItem.category === 'frappe' ? '24g' : '0g'}
                      </span>
                    </div>
                    <div className="bg-[#1a1a1a] rounded-xl p-2.5 border border-white/5">
                      <span className="block text-[8px] text-stone-500 uppercase tracking-wider">Rating</span>
                      <span className="text-xs font-bold text-[#c4a484]">★ {selectedItem.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Details & Customizers inside Lightbox */}
                <div className="flex flex-col justify-between space-y-6">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#c4a484] bg-[#c4a484]/10 px-2.5 py-1 rounded-full">
                      {selectedItem.category.replace('-', ' ')}
                    </span>
                    <h2 className="font-serif text-2xl font-light text-white mt-3">{selectedItem.name}</h2>
                    <p className="text-xs text-stone-400 font-light mt-2 leading-relaxed">
                      {selectedItem.description}
                    </p>
                  </div>

                  {/* Size selector */}
                  {selectedItem.category !== 'pastries' && (
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-[#c4a484] uppercase tracking-widest">Select Size:</span>
                      <div className="flex space-x-2">
                        {(['S', 'M', 'L'] as const).map((sz) => (
                          <button
                            key={sz}
                            id={`lightbox-size-${sz}`}
                            onClick={() => setItemSize(sz)}
                            className={`flex-1 rounded-lg py-2 text-xs font-bold border transition-all cursor-pointer ${
                              itemSize === sz
                                ? 'bg-[#c4a484] text-[#0a0a0a] border-[#c4a484]'
                                : 'bg-[#1a1a1a] text-stone-300 border-white/5 hover:bg-white/5'
                            }`}
                          >
                            {sz === 'S' ? 'Small' : sz === 'M' ? 'Medium (Std)' : 'Large'}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Ice or Hot selector */}
                  {selectedItem.category !== 'pastries' && selectedItem.category !== 'frappe' && (
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-[#c4a484] uppercase tracking-widest">Temperature:</span>
                      <div className="flex space-x-2">
                        {(['hot', 'iced'] as const).map((temp) => (
                          <button
                            key={temp}
                            id={`lightbox-temp-${temp}`}
                            onClick={() => setItemTemp(temp)}
                            className={`flex-1 rounded-lg py-2 text-xs font-bold border capitalize transition-all cursor-pointer ${
                              itemTemp === temp
                                ? 'bg-[#c4a484] text-[#0a0a0a] border-[#c4a484]'
                                : 'bg-[#1a1a1a] text-stone-300 border-white/5 hover:bg-white/5'
                            }`}
                          >
                            {temp}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Price & Checkout or Customizer redirection */}
                  <div className="border-t border-white/5 pt-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="block text-[10px] text-stone-500 uppercase tracking-widest">Estimated Price</span>
                        <span className="text-2xl font-extrabold text-white">${getAdjustedPrice().toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      {/* Deep-link to customizer */}
                      {selectedItem.category !== 'pastries' && setSelectedCustomizerPreset && (
                        <button
                          id="lightbox-deeplink-btn"
                          onClick={handleDeepLinkCustomizer}
                          className="flex items-center justify-center space-x-2 flex-1 rounded-xl border border-[#c4a484] text-[#c4a484] py-3.5 text-xs font-bold hover:bg-[#c4a484]/10 transition-colors cursor-pointer"
                        >
                          <Sparkles className="h-4 w-4" />
                          <span>Advanced Lab Customize</span>
                        </button>
                      )}

                      <button
                        id="lightbox-add-cart"
                        onClick={handleMockAddToCart}
                        className="flex-1 rounded-xl bg-white text-black py-3.5 text-xs font-bold hover:bg-[#c4a484] transition-colors flex items-center justify-center space-x-2 cursor-pointer"
                      >
                        <ShoppingBag className="h-4 w-4" />
                        <span>{cartSuccess ? 'Adding...' : 'Add to Order'}</span>
                      </button>
                    </div>

                    {cartSuccess && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center text-xs font-bold text-green-400 bg-green-950/20 rounded-lg p-2 border border-green-900/30"
                      >
                        ✔ Added successfully to JMB guest order!
                      </motion.div>
                    )}
                  </div>

                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
