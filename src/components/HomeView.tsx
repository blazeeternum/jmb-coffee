/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import { ActiveView, MENU_ITEMS, TESTIMONIALS, Testimonial } from '../types';
import { Sparkles, ArrowRight, Star, Heart, Leaf, Quote, Award, Plus, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import specialtyCoffeeImg from '../assets/images/specialty_coffee_1783584814461.jpg';
import icedCoffeeImg from '../assets/images/iced_coffee_1783584831760.jpg';

interface HomeViewProps {
  setActiveView: (view: ActiveView) => void;
}

export default function HomeView({ setActiveView }: HomeViewProps) {
  const getCoffeeImage = (item: any) => {
    if (item.category === 'pastries') return null;
    const isIced = item.category === 'frappe' || 
                   item.name.toLowerCase().includes('iced') || 
                   item.name.toLowerCase().includes('cold') || 
                   item.name.toLowerCase().includes('shakerato') || 
                   item.name.toLowerCase().includes('cloud');
    return isIced ? icedCoffeeImg : specialtyCoffeeImg;
  };

  // Best Sellers items
  const bestSellers = MENU_ITEMS.filter(item => item.isBestSeller);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [userReviews, setUserReviews] = useState<Testimonial[]>(TESTIMONIALS);

  // New review form states
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewRole, setNewReviewRole] = useState('Coffee Lover');
  const [reviewSuccess, setReviewSuccess] = useState(false);

  // Auto scroll best sellers carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bestSellers.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [bestSellers.length]);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bestSellers.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bestSellers.length) % bestSellers.length);
  };

  const handleAddReview = (e: FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewComment.trim()) return;

    const newReview: Testimonial = {
      id: `custom-review-${Date.now()}`,
      name: newReviewName,
      role: newReviewRole || 'Valued Guest',
      avatar: newReviewName.slice(0, 2).toUpperCase(),
      rating: newReviewRating,
      comment: newReviewComment,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    };

    setUserReviews([newReview, ...userReviews]);
    setNewReviewName('');
    setNewReviewComment('');
    setNewReviewRating(5);
    setNewReviewRole('Coffee Lover');
    setReviewSuccess(true);
    setTimeout(() => setReviewSuccess(false), 4000);
  };

  return (
    <div className="space-y-24 pb-20 bg-[#0a0a0a] text-[#e0e0e0]" id="home-view-root">
      {/* 1. HERO BANNER - Split Layout */}
      <section className="relative overflow-hidden bg-[#0a0a0a] py-16 sm:py-24 text-white" id="hero-section">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#c4a484]/15 via-[#0a0a0a] to-[#0d0d0d]"></div>
        
        {/* Abstract background blobs */}
        <div className="absolute top-1/4 right-1/4 h-72 w-72 rounded-full bg-[#c4a484]/5 blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 h-80 w-80 rounded-full bg-white/3 blur-3xl"></div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            
            {/* Left Content Column */}
            <div className="space-y-8 text-left">
              <div className="inline-flex items-center space-x-2 rounded-full bg-[#141414] px-3 py-1.5 border border-white/5 text-xs font-semibold uppercase tracking-wider text-[#c4a484]">
                <Sparkles className="h-4.5 w-4.5 animate-pulse text-[#c4a484]" />
                <span>Specialty Micro-Roaster & Cafe</span>
              </div>
              
              <h1 className="font-serif text-5xl font-light tracking-tight sm:text-6xl lg:text-7xl leading-tight">
                The Craft of <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c4a484] via-[#f3e1ce] to-[#b08e6f] italic font-serif">
                  Daily Rituals
                </span>
              </h1>
              
              <p className="max-w-xl text-base sm:text-lg text-stone-400 font-light leading-relaxed">
                Welcome to JMB Coffee. We source premium, single-origin beans, roasting them in small batches to unfold complex caramel, chocolate, and floral notes. Taste the difference of meticulous craft.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  id="hero-explore-menu-btn"
                  onClick={() => setActiveView('menu')}
                  className="flex items-center space-x-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-black transition-all duration-300 hover:bg-[#c4a484] hover:shadow-lg active:scale-98 cursor-pointer"
                >
                  <span>Explore Menu</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
                <button
                  id="hero-customizer-btn"
                  onClick={() => setActiveView('customizer')}
                  className="rounded-full border border-white/10 bg-[#1a1a1a] px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-[#c4a484] hover:bg-white/5 cursor-pointer"
                >
                  Brew Lab Customizer
                </button>
              </div>

              {/* Minimalist Trust Counters */}
              <div className="grid grid-cols-3 gap-6 border-t border-white/5 pt-8 max-w-md">
                <div>
                  <span className="block font-serif text-3xl font-light text-[#c4a484]">88+</span>
                  <span className="text-[10px] text-stone-500 uppercase tracking-widest font-bold">Bean Varieties</span>
                </div>
                <div>
                  <span className="block font-serif text-3xl font-light text-[#c4a484]">100%</span>
                  <span className="text-[10px] text-stone-500 uppercase tracking-widest font-bold">Direct Sourced</span>
                </div>
                <div>
                  <span className="block font-serif text-3xl font-light text-[#c4a484]">4.9★</span>
                  <span className="text-[10px] text-stone-500 uppercase tracking-widest font-bold">Guest Rating</span>
                </div>
              </div>
            </div>

            {/* Right Graphic Column: Interactive Animated Coffee Cup */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative flex h-[380px] w-[320px] sm:h-[450px] sm:w-[380px] items-center justify-center rounded-3xl bg-[#141414]/80 p-8 border border-white/5 shadow-2xl">
                
                {/* Embedded Steam Animation */}
                <div className="absolute top-12 flex space-x-4">
                  <div className="h-20 w-1.5 rounded-full bg-gradient-to-t from-white/5 via-[#c4a484]/20 to-transparent blur-[1px] animate-pulse" style={{ animationDuration: '2.5s' }}></div>
                  <div className="h-24 w-1.5 rounded-full bg-gradient-to-t from-white/5 via-[#c4a484]/30 to-transparent blur-[2px] animate-pulse" style={{ animationDuration: '3.5s', animationDelay: '0.4s' }}></div>
                  <div className="h-16 w-1.5 rounded-full bg-gradient-to-t from-white/5 via-[#c4a484]/20 to-transparent blur-[1.5px] animate-pulse" style={{ animationDuration: '2.8s', animationDelay: '0.8s' }}></div>
                </div>

                {/* Outer Coffee Cup */}
                <div className="relative mt-16 flex h-48 w-48 flex-col items-center justify-end rounded-b-[70px] rounded-t-lg border-[10px] border-[#c4a484]/20 bg-[#1a1a1a] shadow-xl">
                  {/* Cup Handle */}
                  <div className="absolute right-[-34px] top-[25%] h-24 w-12 rounded-r-[40px] border-[10px] border-[#c4a484]/20 bg-transparent"></div>
                  
                  {/* Glowing Coffee Layer */}
                  <div className="mb-2 h-[80%] w-[90%] rounded-b-[55px] rounded-t-sm bg-gradient-to-t from-black to-[#2b1b12] flex flex-col justify-between p-4 overflow-hidden relative border border-[#c4a484]/20">
                    <div className="w-full h-2.5 bg-[#c4a484]/20 blur-[1px] absolute top-0 left-0 animate-pulse"></div>
                    <div className="text-center font-serif text-[15px] font-bold tracking-widest text-[#c4a484]/70 mt-4 select-none">
                      JMB BREW
                    </div>
                    {/* Coffee wave texture */}
                    <div className="h-8 w-full bg-[#c4a484]/5 rounded-b-xl animate-bounce" style={{ animationDuration: '4s' }}></div>
                  </div>

                  {/* Embossed Logo Label */}
                  <div className="absolute -bottom-5 rounded-full bg-[#c4a484] px-4 py-1 text-[10px] font-extrabold uppercase tracking-widest text-[#0a0a0a] shadow-md">
                    EST. 2026
                  </div>
                </div>

                {/* Coaster shadow effect */}
                <div className="absolute bottom-16 h-4 w-60 rounded-full bg-black/95 blur-md"></div>

                {/* Flying Coffee Beans floating decoration */}
                <div className="absolute top-20 left-10 animate-bounce text-2xl" style={{ animationDuration: '5s' }}>🫘</div>
                <div className="absolute bottom-24 right-8 animate-bounce text-xl" style={{ animationDuration: '4s', animationDelay: '1s' }}>🫘</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. CORE VALUES / FEATURES SECTION */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-sm font-semibold uppercase tracking-widest text-[#c4a484]">The JMB Promise</span>
          <h2 className="font-serif text-3xl font-light tracking-tight text-white sm:text-4xl">What Defines JMB Coffee Experience?</h2>
          <p className="text-stone-400 font-light text-base">We prioritize quality over shortcuts. Every single bean undergoes meticulous validation, and every recipe is crafted by roasting experts.</p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 mt-16" id="core-values-grid">
          {/* Card 1: Sourcing */}
          <div className="group relative rounded-2xl bg-[#141414] border border-white/5 p-8 transition-all duration-300 hover:shadow-xl hover:border-[#c4a484]/30 hover:-translate-y-1">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1a1a1a] text-[#c4a484] transition-colors duration-300 group-hover:bg-[#c4a484] group-hover:text-[#0a0a0a]">
              <Leaf className="h-6 w-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-white mt-6 mb-3">100% Ethical & Green</h3>
            <p className="text-sm text-stone-400 leading-relaxed font-light">
              We practice direct-trade coffee sourcing. By cutting out middlemen, we guarantee fair living wages for coffee growers in Ethiopia, Colombia, and Sumatra while choosing organic certified farms.
            </p>
          </div>

          {/* Card 2: Micro-Roasting */}
          <div className="group relative rounded-2xl bg-[#141414] border border-white/5 p-8 transition-all duration-300 hover:shadow-xl hover:border-[#c4a484]/30 hover:-translate-y-1">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1a1a1a] text-[#c4a484] transition-colors duration-300 group-hover:bg-[#c4a484] group-hover:text-[#0a0a0a]">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-white mt-6 mb-3">Small Batch Master Roasts</h3>
            <p className="text-sm text-stone-400 leading-relaxed font-light">
              We roast our beans in state-of-the-art drum roasters in ultra-small, 10kg batches. This enables us to control convective heat perfectly, locking in distinct profiles of caramel smoothness.
            </p>
          </div>

          {/* Card 3: Barista Customizer */}
          <div className="group relative rounded-2xl bg-[#141414] border border-white/5 p-8 transition-all duration-300 hover:shadow-xl hover:border-[#c4a484]/30 hover:-translate-y-1">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1a1a1a] text-[#c4a484] transition-colors duration-300 group-hover:bg-[#c4a484] group-hover:text-[#0a0a0a]">
              <Heart className="h-6 w-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-white mt-6 mb-3">Interactive Cup Customizer</h3>
            <p className="text-sm text-stone-400 leading-relaxed font-light">
              You call the shots. Use our virtual Brew Lab customizer to specify precise espresso levels, organic milk types, custom infusions, and sweet toppings. Enjoy coffee crafted exactly to your preference.
            </p>
          </div>
        </div>
      </section>

      {/* 3. DYNAMIC INTERACTIVE GALLERY & CAROUSEL (Best Seller Image Slider) */}
      <section className="bg-[#0c0c0c] py-16 border-y border-white/5 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div className="space-y-4 text-left max-w-xl">
              <span className="text-sm font-semibold uppercase tracking-widest text-[#c4a484]">Our Pride</span>
              <h2 className="font-serif text-3xl font-light tracking-tight text-white sm:text-4xl">Weekly Best Seller Spotlight</h2>
              <p className="text-stone-400 font-light text-sm">A curated showcase of our guests' absolute favorite caffeinated craft and sweet bakes. Use the controls to explore.</p>
            </div>
            
            {/* Slider Navigation Buttons */}
            <div className="flex space-x-3 mt-6 md:mt-0">
              <button
                id="best-seller-prev-btn"
                onClick={handlePrevSlide}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#141414] text-white hover:bg-[#c4a484] hover:text-[#0a0a0a] transition-all duration-300 cursor-pointer"
                aria-label="Previous Slide"
              >
                ←
              </button>
              <button
                id="best-seller-next-btn"
                onClick={handleNextSlide}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#141414] text-white hover:bg-[#c4a484] hover:text-[#0a0a0a] transition-all duration-300 cursor-pointer"
                aria-label="Next Slide"
              >
                →
              </button>
            </div>
          </div>

          {/* Slider Content Wrapper */}
          <div className="relative min-h-[350px]">
            <AnimatePresence mode="wait">
              {bestSellers.map((item, index) => {
                if (index !== currentSlide) return null;
                
                return (
                  <motion.div
                    key={item.id}
                    id={`best-seller-slide-${item.id}`}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-[#141414] rounded-3xl p-8 md:p-12 border border-white/5 shadow-xl"
                  >
                    {/* Slide Graphic */}
                    <div className="flex justify-center">
                      <div className="relative h-64 w-64 sm:h-72 sm:w-72 rounded-2xl bg-[#141414] overflow-hidden border border-white/5 shadow-inner flex items-center justify-center">
                        <span className="absolute top-4 left-4 z-10 rounded-full bg-[#c4a484] px-3 py-1 text-[10px] font-bold text-[#0a0a0a] uppercase tracking-wider shadow-sm animate-pulse">
                          {item.tags[0] || 'Popular'}
                        </span>
                        
                        {getCoffeeImage(item) ? (
                          <img
                            src={getCoffeeImage(item)!}
                            alt={item.name}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="text-center">
                            <div className="text-8xl select-none animate-bounce" style={{ animationDuration: '3.5s' }}>
                              🥐
                            </div>
                            <span className="block mt-4 text-[10px] font-semibold tracking-wider text-[#c4a484]/40 uppercase">
                              JMB Fresh Pastry
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Slide Details */}
                    <div className="space-y-6 text-left">
                      <div className="flex items-center space-x-1 text-[#c4a484]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-5 w-5 ${i < Math.floor(item.rating) ? 'fill-current' : 'opacity-30'}`} />
                        ))}
                        <span className="text-sm font-semibold text-stone-300 ml-2">({item.rating} / 5.0)</span>
                      </div>

                      <h3 className="font-serif text-3xl font-bold text-white">{item.name}</h3>
                      <p className="text-stone-400 font-light text-base leading-relaxed">{item.description}</p>

                      <div className="flex items-center justify-between border-t border-white/5 pt-6">
                        <div>
                          <span className="block text-[10px] text-stone-500 uppercase tracking-widest font-bold">Base Price</span>
                          <span className="text-3xl font-bold text-white">${item.price.toFixed(2)}</span>
                        </div>
                        
                        <div className="text-right">
                          <span className="block text-[10px] text-stone-500 uppercase tracking-widest font-bold">Calories</span>
                          <span className="text-lg font-semibold text-stone-300">{item.calories} kcal</span>
                        </div>
                      </div>

                      <div className="flex space-x-4 pt-2">
                        <button
                          id={`slide-customizer-${item.id}`}
                          onClick={() => setActiveView('customizer')}
                          className="flex-1 rounded-xl bg-[#c4a484] px-6 py-3.5 text-center text-sm font-semibold text-[#0a0a0a] shadow-md hover:bg-[#b08e6f] transition-all duration-300 cursor-pointer"
                        >
                          Customize & Order
                        </button>
                        <button
                          id={`slide-menu-${item.id}`}
                          onClick={() => setActiveView('menu')}
                          className="rounded-xl border border-white/10 bg-[#1a1a1a] px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/5 transition-all cursor-pointer"
                        >
                          View Full Menu
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Carousel dots/indicators */}
            <div className="flex justify-center space-x-2 mt-8">
              {bestSellers.map((_, index) => (
                <button
                  key={index}
                  id={`carousel-dot-${index}`}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2.5 transition-all duration-300 rounded-full cursor-pointer ${index === currentSlide ? 'w-8 bg-[#c4a484]' : 'w-2.5 bg-white/10'}`}
                  aria-label={`Go to slide ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. REVIEWS & TESTIMONIALS + INTERACTIVE REVIEW BOARD */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* Static introduction column */}
          <div className="lg:col-span-1 space-y-6 text-left">
            <span className="text-sm font-semibold uppercase tracking-widest text-[#c4a484]">Community</span>
            <h2 className="font-serif text-3xl font-light tracking-tight text-white sm:text-4xl">What our Guests Say</h2>
            <p className="text-stone-400 font-light leading-relaxed">
              We focus on building long-term community relationships. Read actual reviews from regular coffee enthusiasts or write your own to get showcased on our live website board!
            </p>
            <div className="rounded-2xl bg-[#141414] border border-white/5 p-6 space-y-3">
              <h4 className="font-semibold text-white">Total Reviews: 1,420+</h4>
              <div className="flex items-center space-x-1 text-[#c4a484] text-lg font-bold">
                <span>4.9</span>
                <span className="text-[#c4a484]">★★★★★</span>
              </div>
              <p className="text-xs text-stone-500">Consolidated rating verified from over 3 local branches.</p>
            </div>
          </div>

          {/* Scrolling Review Cards Stream */}
          <div className="lg:col-span-2 space-y-8">
            {/* Add Review Form (Unique interactive UI element) */}
            <form onSubmit={handleAddReview} className="rounded-2xl bg-[#141414] border border-white/5 p-6 md:p-8 shadow-sm">
              <h3 className="font-serif text-xl font-bold text-white mb-4 flex items-center space-x-2">
                <Plus className="h-5 w-5 text-[#c4a484]" />
                <span>Write a Live Guest Review</span>
              </h3>
              
              <AnimatePresence>
                {reviewSuccess && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-4 flex items-center space-x-2 rounded-lg bg-green-950/20 p-4 text-sm font-medium text-green-400 border border-green-900/30"
                  >
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Your review was successfully validated and posted to our live guest feed below!</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#c4a484] uppercase tracking-widest mb-1.5">Guest Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Jennifer Lopez"
                    value={newReviewName}
                    onChange={(e) => setNewReviewName(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-[#1a1a1a] px-4 py-2.5 text-[#e0e0e0] focus:border-[#c4a484] focus:outline-none focus:ring-1 focus:ring-[#c4a484] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#c4a484] uppercase tracking-widest mb-1.5">Role / Title</label>
                  <input
                    type="text"
                    placeholder="e.g., Cafe Enthusiast / Local Resident"
                    value={newReviewRole}
                    onChange={(e) => setNewReviewRole(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-[#1a1a1a] px-4 py-2.5 text-[#e0e0e0] focus:border-[#c4a484] focus:outline-none focus:ring-1 focus:ring-[#c4a484] text-sm"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-xs font-semibold text-[#c4a484] uppercase tracking-widest mb-1.5">Star Rating</label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReviewRating(star)}
                      className="text-2xl focus:outline-none cursor-pointer"
                    >
                      <span className={star <= newReviewRating ? 'text-[#c4a484]' : 'text-white/10'}>★</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-xs font-semibold text-[#c4a484] uppercase tracking-widest mb-1.5">Your Comment *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Tell others what you ordered and how you liked the flavor, vibe, or service!"
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-[#1a1a1a] px-4 py-2.5 text-[#e0e0e0] focus:border-[#c4a484] focus:outline-none focus:ring-1 focus:ring-[#c4a484] text-sm"
                />
              </div>

              <button
                type="submit"
                className="mt-4 rounded-xl bg-[#c4a484] px-6 py-3 text-sm font-semibold text-[#0a0a0a] shadow hover:bg-[#b08e6f] transition-colors cursor-pointer"
              >
                Post Review to Feed
              </button>
            </form>

            {/* Testimonials Stream */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {userReviews.map((rev) => (
                <div key={rev.id} className="rounded-2xl border border-white/5 bg-[#141414] p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-all hover:border-[#c4a484]/10">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#c4a484]/10 text-[#c4a484] font-extrabold text-xs">
                          {rev.avatar}
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-sm">{rev.name}</h4>
                          <span className="text-[10px] text-stone-500 block font-medium">{rev.role}</span>
                        </div>
                      </div>
                      <span className="text-xs text-stone-500 font-light">{rev.date}</span>
                    </div>

                    <p className="text-xs text-stone-400 italic font-light leading-relaxed">
                      <Quote className="inline h-3 w-3 mr-1 text-[#c4a484]/30" />
                      {rev.comment}
                    </p>
                  </div>

                  <div className="flex items-center space-x-1 text-[#c4a484] text-sm mt-4 pt-4 border-t border-white/5">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>{i < rev.rating ? '★' : '☆'}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 5. CULMINATING CTA BLOCK */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-[#141414] to-[#0c0c0c] p-12 text-center text-[#e0e0e0] shadow-2xl relative overflow-hidden border border-white/5">
          <div className="absolute inset-0 bg-black/40"></div>
          {/* Decorative shapes */}
          <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-[#c4a484]/5 blur-2xl"></div>
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#c4a484]/5 blur-2xl"></div>

          <div className="relative max-w-2xl mx-auto space-y-6">
            <h2 className="font-serif text-3xl font-light tracking-tight text-white sm:text-4xl">Ready to Craft Your Perfect Brew?</h2>
            <p className="text-stone-400 font-light text-base leading-relaxed">
              Step into our virtual Brew Lab where you are the master barista. Choose espresso shots, tweak sweeteners, experiment with plant-based milks, and get a visual printout recipe to present at any JMB Coffee store!
            </p>
            <div className="pt-4">
              <button
                id="cta-go-customizer"
                onClick={() => setActiveView('customizer')}
                className="rounded-full bg-white px-8 py-4 text-base font-bold text-black shadow-md transition-all duration-300 hover:bg-[#c4a484] hover:scale-103 active:scale-98 cursor-pointer"
              >
                Go to Brew Lab 🧪
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
