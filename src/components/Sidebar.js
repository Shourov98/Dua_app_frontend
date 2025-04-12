"use client";
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GoHome } from "react-icons/go";
import { IoBulbOutline } from "react-icons/io5";
import { CiBookmark } from "react-icons/ci";
import { RxDashboard } from "react-icons/rx";
import { RiMedicineBottleLine } from "react-icons/ri";
import { IoBookOutline } from "react-icons/io5";
import { PiChatsTeardrop } from "react-icons/pi";

export default function Sidebar() {
  const [activeIcon] = useState('home');

  return (
    <div className="w-[80px] h-[890px] bg-white rounded-[15px] flex flex-col items-center fixed top-[40px] left-[30px]">
      {/* Top Logo */}
      <div className="w-[73px] h-[73px] mt-8 mb-22 rounded-[10px] flex items-center justify-center">
        <Image 
          src="/images/logo.png" 
          alt="Dua Logo" 
          width={75} 
          height={75} 
          className="object-contain"
        />
      </div>
      
      {/* Navigation Icons - with increased spacing */}
      <div className="flex flex-col items-center space-y-3">
        <Link href="/">
          <button className="w-[60px] h-[60px] rounded-full flex items-center justify-center bg-gray-100">
            <GoHome className="w-7 h-7 text-green-500"  />
          </button>
        </Link>
        
        <Link href="/categories">
          <button className="w-[60px] h-[60px] rounded-full flex items-center justify-center bg-transparent">
            <RxDashboard className="w-7 h-7 text-gray-400" />
          </button>
        </Link>
        
        <Link href="/font-settings">
          <button className="w-[60px] h-[60px] rounded-full flex items-center justify-center bg-transparent">
            <IoBulbOutline className="w-7 h-7 text-gray-400" style={{ strokeWidth: 2 }} />
          </button>
        </Link>
        
        <Link href="/appearance">
          <button className="w-[60px] h-[60px] rounded-full flex items-center justify-center bg-transparent">
            <CiBookmark className="w-7 h-7 text-gray-400" style={{ strokeWidth: 1 }} />
          </button>
        </Link>
        
        <Link href="/bookmarks">
          <button className="w-[60px] h-[60px] rounded-full flex items-center justify-center bg-transparent">
            <RiMedicineBottleLine className="w-7 h-7 text-gray-400" />
          </button>
        </Link>
        
        <Link href="/settings">
          <button className="w-[60px] h-[60px] rounded-full flex items-center justify-center bg-transparent">
            <PiChatsTeardrop className="w-7 h-7 text-gray-400" style={{ strokeWidth: 2 }} />
          </button>
        </Link>

        <Link href="/settings">
          <button className="w-[60px] h-[60px] rounded-full flex items-center justify-center bg-transparent">
            <IoBookOutline className="w-7 h-7 text-gray-400" style={{ strokeWidth: 2 }} />
          </button>
        </Link>
      </div>
      
      {/* Bottom Logo - with increased margin-top */}
      <div className="w-[70px] h-[70px] mt-auto rounded-[10px] flex items-center justify-center">
        <Image 
          src="/images/donation.png" 
          alt="Donation" 
          width={70} 
          height={70} 
          className="object-contain"
        />
      </div>
    </div>
  );
}
