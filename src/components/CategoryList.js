"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import PageTitle from './PageTitle';

export default function CategoryList({ setSelectedSubCategory }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch categories
        const catResponse = await fetch('http://localhost:3050/api/categories');
        const catData = await catResponse.json();
        setCategories(catData);
        
        // Fetch subcategories
        const subcatResponse = await fetch('http://localhost:3050/api/subcategories');
        const subcatData = await subcatResponse.json();
        setSubcategories(subcatData);
        
        // Set first category as expanded by default
        if (catData.length > 0) {
          setExpandedCategory(catData[0].cat_id);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleCategoryClick = (categoryId) => {
    if (expandedCategory === categoryId) {
      // If clicking the already expanded category, do nothing
      return;
    }
    setExpandedCategory(categoryId);
  };

  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubCategory(subcategory);
  };

  const filteredCategories = categories.filter(category =>
    category.cat_name_en.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSubcategoriesForCategory = (categoryId) => {
    return subcategories.filter(subcat => subcat.cat_id === categoryId);
  };

  return (
    <>
      <PageTitle />
      <div className="w-[429px] h-[800px] bg-white rounded-[10px] border-[0.5px] border-gray-200 overflow-hidden flex flex-col absolute top-[133px] left-[135px]">
        {/* Header */}
        <div className="bg-green-600 py-4">
          <h2 className="text-white text-xl font-medium text-center">Categories</h2>
        </div>
        
        {/* Search Box */}
        <div className="px-[15px] pt-[15px]">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by Categories"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-[399px] h-[50px] border-[1.5px] border-gray-200 rounded-[7px] pl-10 pr-4 py-[13px] focus:outline-none focus:border-green-500"
            />
            <svg className="absolute left-3 top-[17px] h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        
        {/* Categories List */}
        <div className="flex-1 overflow-y-auto px-[15px] pt-[15px] pb-[15px] space-y-[15px]">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <p>Loading categories...</p>
            </div>
          ) : (
            filteredCategories.map((category) => (
              <div key={category.cat_id} className="rounded-[5px] overflow-hidden">
                {/* Category Header */}
                <div 
                  className={`flex items-center p-[10px] cursor-pointer ${
                    expandedCategory === category.cat_id ? 'bg-gray-100' : 'bg-gray-50'
                  }`}
                  onClick={() => handleCategoryClick(category.cat_id)}
                >
                  <div className="w-[60px] h-[60px] bg-blue-50 rounded-md flex items-center justify-center mr-4">
                    <Image 
                      src='/images/fever.png'
                      alt={category.cat_name_en}
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">{category.cat_name_en}</h3>
                    <p className="text-sm text-gray-500">Subcategory: {category.no_of_subcat}</p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-xl font-medium text-gray-700">{category.no_of_dua}</p>
                    <p className="text-sm text-gray-500">Duas</p>
                  </div>
                </div>
                
                {/* Subcategories (shown when expanded) with dotted line */}
                {expandedCategory === category.cat_id && (
                  <div className="relative ml-[40px] mt-2">
                    {/* Dotted vertical line */}
                    <div className="absolute left-0 top-0 bottom-0 border-l-2 border-green-500 border-dashed h-full"></div>
                    
                    {getSubcategoriesForCategory(category.cat_id).map((subcat, index) => (
                      <div 
                        key={subcat.subcat_id}
                        className="py-4 cursor-pointer hover:bg-gray-50 flex items-center pl-6"
                        onClick={() => handleSubcategoryClick(subcat)}
                      >
                        {/* Green circle positioned on the dotted line */}
                        <div className="absolute left-[-4px] w-2 h-2 rounded-full bg-green-500"></div>
                        <p className="text-gray-800">{subcat.subcat_name_en}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </>
    
  );
}
