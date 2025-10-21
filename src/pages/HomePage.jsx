import React, { useState, useEffect } from 'react';
import { LogIn, UserPlus, Zap, LayoutDashboard, MessageSquare, Sun, Moon } from 'lucide-react';

// Main App component that simulates the HomePage.jsx file

// Helper component for the glassmorphic feature cards
const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <div
      className="p-6 md:p-8 rounded-2xl shadow-xl backdrop-blur-md transition duration-300
                 bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700
                 hover:shadow-2xl hover:scale-[1.02] transform cursor-pointer flex flex-col items-start
                 w-full h-full"
    >
      <div className="p-3 mb-4 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300">
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm">{description}</p>
    </div>
  );
};

// Helper component for the pricing cards
const PricingCard = ({ title, features, price, isPremium }) => {
  const textColor = isPremium ? 'text-white' : 'text-gray-900 dark:text-white';
  const buttonColor = isPremium ? 'bg-white text-blue-600 hover:bg-gray-200' : 'bg-blue-600 text-white hover:bg-blue-700';

  return (
    <div
      className={`p-6 rounded-2xl shadow-xl transition duration-300 w-full transform ${isPremium ? 'border-4 border-blue-500' : 'border border-gray-300 dark:border-gray-600'}
                  bg-white dark:bg-gray-800`}
    >
      <h3 className={`text-2xl font-bold mb-2 ${textColor}`}>{title}</h3>
      <p className={`text-sm mb-4 ${isPremium ? 'text-blue-200' : 'text-gray-500 dark:text-gray-400'}`}>
        {features}
      </p>
      <p className={`text-4xl font-extrabold mb-6 ${isPremium ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
        {price}
      </p>
      <button
        className={`w-full py-3 rounded-xl font-semibold transition duration-200 ${buttonColor}`}
      >
        {isPremium ? 'Go Premium' : 'Start for Free'}
      </button>
    </div>
  );
};


const HomePage = () => {
  // Initialize darkMode state based on localStorage or system preference
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('theme');
    if (savedMode) {
      return savedMode === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Effect to apply/remove the 'dark' class and update localStorage
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen font-inter ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 p-4 backdrop-blur-lg bg-white/70 dark:bg-gray-900/70 shadow-lg dark:shadow-2xl">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
          {/* Logo/Title */}
          <div className="flex items-center space-x-2">
            <Zap className="text-blue-600 dark:text-blue-400" size={24} />
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              AI-Expense-Tracker
            </h1>
          </div>

          {/* Nav Links and Auth Buttons (Adjusted for mobile stacking/hiding) */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <nav className="hidden md:flex space-x-6 text-sm font-medium">
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition">Features</a>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition">Pricing</a>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition">Testimonials</a>
            </nav>

            <button
              onClick={() => console.log('Log In Clicked')}
              className="px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold rounded-xl text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition flex items-center"
            >
              <LogIn size={14} className="sm:mr-1" /> <span className='hidden sm:inline'>Log In</span>
            </button>
            <button
              onClick={() => console.log('Sign Up Clicked')}
              className="px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition shadow-lg flex items-center"
            >
              <UserPlus size={14} className="sm:mr-1" /> <span className='hidden sm:inline'>Sign Up</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* 1. Hero Section (Enhanced Mobile Stacking) */}
        <section className="relative flex flex-col lg:flex-row items-center justify-between pt-10 pb-10 sm:pb-20">
          <div
            className="absolute inset-0 w-full h-full bg-blue-50 dark:bg-gray-800 opacity-50 rounded-[4rem] blur-3xl -z-10 transition duration-500"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0% 100%)' }}
          ></div>
          
          {/* Text and CTAs */}
          <div className="lg:w-1/2 mb-10 lg:mb-0 text-center lg:text-left">
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-3 block">
              CODEZAP-2025 MVP
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-gray-900 dark:text-white mb-6">
              Simplify Your Spending. <span className="text-blue-600 dark:text-blue-400">Automate with AI</span>.
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-lg lg:mx-0 mx-auto">
              Intelligent expense tracking and insights, designed for effortless financial clarity. Your personal finance coach, not just a tracker.
            </p>
            <div className="flex space-x-4 justify-center lg:justify-start">
              <button
                onClick={() => console.log('Get Started CTA Clicked')}
                className="px-6 py-3 sm:px-8 sm:py-3 text-base sm:text-lg font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition shadow-xl transform hover:scale-[1.05]"
              >
                Get Started
              </button>
              <button
                onClick={() => console.log('Watch Demo Clicked')}
                className="px-6 py-3 sm:px-8 sm:py-3 text-base sm:text-lg font-semibold rounded-xl border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                Watch Demo
              </button>
            </div>
          </div>
          
          {/* Mockup Illustration - Uses responsive width */}
          <div className="lg:w-1/2 w-full flex justify-center relative p-4 sm:p-8">
            <svg
              className="w-full max-w-sm sm:max-w-md h-auto rounded-3xl shadow-2xl backdrop-blur-sm bg-white/20 dark:bg-gray-700/20"
              viewBox="0 0 400 300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="5" y="5" width="390" height="290" rx="15" stroke="url(#gradient-border)" strokeWidth="2" />
              <defs>
                <linearGradient id="gradient-border" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#3B82F6', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#6366F1', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#3B82F6" fontSize="24" fontWeight="bold">
                Smart Analytics Dashboard
              </text>
              <text x="50%" y="65%" dominantBaseline="middle" textAnchor="middle" fill="#6B7280" fontSize="14">
                (Mockup/Illustration Placeholder)
              </text>
            </svg>
          </div>
        </section>

        {/* 2. Core Features Showcase (Mobile grid adjustment) */}
        <section className="py-16">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-10 text-center">
            The Power of AI in Your Pocket
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <FeatureCard
              icon={Zap}
              title="AI Categorization"
              description="Instantly classify transactions from text input using our custom NLP model. No more manual tags."
            />
            <FeatureCard
              icon={LayoutDashboard}
              title="Smart Dashboard"
              description="Visualize spending with predictive analytics and trend tracking to meet your financial goals."
            />
            <FeatureCard
              icon={MessageSquare}
              title="Chatbot Assistant"
              description="Query your expenses and get financial advice by simply chatting with the AI."
            />
          </div>
        </section>

        {/* 3. Pricing Section (Mobile stacking) */}
        <section className="py-16 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 text-center sm:text-left">Pricing Plans</h3>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-12 text-center sm:text-left">
            Choose the plan that fits your financial journey.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-sm mx-auto md:max-w-4xl md:mx-auto">
            <PricingCard
              title="Free"
              features="Basic tracking, 1 connection, manual entry only."
              price="$0/month"
              isPremium={false}
            />
            <PricingCard
              title="Premium"
              features="Unlimited features, AI forecasting, budget alerts, and priority support."
              price="$9/month"
              isPremium={true}
            />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500 dark:text-gray-500">
          &copy; {new Date().getFullYear()} Team Zenitsu. All rights reserved. Built for CODEZAP-2025.
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
