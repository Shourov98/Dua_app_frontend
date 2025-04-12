"use client";
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import DuaContent from '@/components/DuaContent';
import SettingsPanel from '@/components/SettingsPanel';
import CategoryList from '@/components/CategoryList';
import Head from 'next/head';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  
  return (
    <>
      <Head>
        <link rel="logo" href="/images/logo.png" />
        <title>Your Site Title</title>
      </Head>

      <main className="flex h-screen bg-gray-200">
        <Sidebar setSelectedCategory={setSelectedCategory} />

        <CategoryList 
          selectedCategory={selectedCategory}
          setSelectedSubCategory={setSelectedSubCategory} 
        />

        <DuaContent 
          selectedCategory={selectedCategory}
          selectedSubCategory={selectedSubCategory}
        />
        <SettingsPanel />
      </main>
    </>
  );
}
