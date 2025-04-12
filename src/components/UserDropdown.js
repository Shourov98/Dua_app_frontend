import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { MdArrowDropDown } from "react-icons/md";

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div 
      ref={dropdownRef}
      className="relative"
      style={{
        width: '85px', // Increased from 67.5px
        height: '45px',
        position: 'absolute',
        top: '57.5px',
        left: '1725px'
      }}
    >
      {/* Icon and dropdown arrow */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full h-full rounded-md focus:outline-none"
      >
        <div className="w-12 h-12 rounded-full flex items-center justify-center">
          {/* User icon */}
          <Image src='/images/Vector.png' width={45} height={45} alt="User" />
        </div>
        
        {/* Added gap between icon and dropdown arrow */}
        <div className="ml-4">
          <MdArrowDropDown 
            className={`w-8 h-8 text-gray-600 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
          />
        </div>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</a>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</a>
        </div>
      )}
    </div>
  );
}
