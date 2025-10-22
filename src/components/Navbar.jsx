import React, { useState, useEffect } from "react";
import { LogIn, UserPlus, Sun, Moon } from "lucide-react";
import AuthModal from "../components/AuthModal";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // automatically updates UI on login/logout
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth); // Firebase signs out
      setShowProfileMenu(false); // close dropdown
      setUser(null); // optional: immediately clear user state
      console.log("Logged out successfully");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 p-4 backdrop-blur-lg bg-white/70 dark:bg-gray-900/70 shadow-lg dark:shadow-2xl">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            AI-Expense-Tracker
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          {!user ? (
            <>
              <button
                onClick={() => setShowAuthModal(true)}
                className="px-3 py-2 rounded-xl text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition flex items-center"
              >
                <LogIn size={16} /> Log In
              </button>
              <button
                onClick={() => setShowAuthModal(true)}
                className="px-3 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Sign Up
              </button>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold hover:opacity-90 transition"
              >
                {user.displayName ? user.displayName[0] : user.email[0].toUpperCase()}
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 space-y-2 z-50">
                  <p className="text-gray-900 dark:text-white font-semibold truncate">
                    {user.displayName || user.email}
                  </p>
                  <button
                    onClick={handleLogout}
                    className="w-full py-2 px-3 rounded-xl bg-red-500 text-white hover:bg-red-600 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>

        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      </div>
    </header>
  );
};

export default Navbar;
