// src/components/AuthModal.jsx
import React, { useState } from "react";
import { auth, googleProvider } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

const AuthModal = ({ isOpen, onClose, setUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let userCredential;
      if (isLogin) {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      }
      setUser({
        name: userCredential.user.displayName || email.split("@")[0],
        email: userCredential.user.email,
      });
      onClose();
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      setUser({
        name: user.displayName,
        email: user.email,
      });
      onClose();
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-[1000] bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-8 shadow-2xl w-[90%] max-w-md relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-red-500"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
          {isLogin ? "Welcome Back 👋" : "Create Your Account 🚀"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 
                       bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 
                       focus:ring-blue-500 outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 
                       bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 
                       focus:ring-blue-500 outline-none"
          />
          <button
            type="submit"
            className="w-full py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 
                       transition duration-200 shadow-md"
          >
            {isLogin ? "Log In" : "Sign Up"}
          </button>
        </form>

        <button
          onClick={handleGoogleLogin}
          className="w-full mt-3 py-2 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition duration-200 shadow-md"
        >
          Continue with Google
        </button>

        <p className="text-sm text-center text-gray-600 dark:text-gray-400 mt-4">
          {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            {isLogin ? "Sign Up" : "Log In"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
