/* eslint-disable react/prop-types */
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import gsap from "gsap";

export const DeleteConfirmationModal = ({ isOpen, onConfirm, onCancel }) => {
    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
      return () => document.body.style.overflow = 'auto';
    }, [isOpen]);
  
    useEffect(() => {
      if (isOpen) {
        gsap.fromTo(
          ".modal-container",
          { y: "-100%", opacity: 0 },
          { y: "0", opacity: 1, duration: 0.6, ease: "power3.out" }
        );
      }
    }, [isOpen]);
  
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed inset-0 bg-gray-900 bg-opacity-80  z-50 flex justify-center items-center" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="modal-container bg-primary-white rounded-xl p-10 text-center shadow-2xl transform transition-all duration-500 ease-in-out" 
              initial={{ y: -20, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              exit={{ y: 20, opacity: 0 }}
            >
              <h2 className="text-2xl font-extrabold text-gray-800 mb-6">Confirm Deletion</h2>
              <p className="text-gray-600 mb-4">Are you sure you want to delete this? This action cannot be undone.</p>
              <div className="flex justify-around mt-6">
                <button 
                  className="bg-red-600 hover:bg-red-700 text-primary-white font-semibold py-3 px-8 rounded-lg transform hover:scale-105 transition-transform duration-200 shadow-md" 
                  onClick={onConfirm}
                >
                  Yes, Delete
                </button>
                <button 
                  className="bg-blue-600 hover:bg-blue-700 text-primary-white font-semibold py-3 px-8 rounded-lg transform hover:scale-105 transition-transform duration-200 shadow-md" 
                  onClick={onCancel}
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };