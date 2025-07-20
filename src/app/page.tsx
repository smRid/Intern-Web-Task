'use client';

import { useState, useCallback } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import SubCategoryList from '@/components/SubCategoryList';
import DuaContent from '@/components/DuaContent';
import SettingsPanel from '@/components/SettingsPanel';
import { Category, SubCategory } from '@/types';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<SubCategory | null>(null);
  const [mobileView, setMobileView] = useState<'categories' | 'subcategories' | 'content'>('categories');
  const [showSettings] = useState(false);

  const handleCategorySelect = useCallback((category: Category) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null); 
    setMobileView('subcategories'); 
  }, []);

  const handleSubcategorySelect = useCallback((subcategory: SubCategory) => {
    setSelectedSubcategory(subcategory);
    setMobileView('content'); 
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        {/* Desktop Layout */}
        <div className="hidden lg:flex flex-1">
          <Sidebar 
            onCategorySelect={handleCategorySelect}
            selectedCategory={selectedCategory}
          />
          <SubCategoryList
            categoryId={selectedCategory?.cat_id || null}
            onSubcategorySelect={handleSubcategorySelect}
            selectedSubcategory={selectedSubcategory}
          />
          <DuaContent
            categoryId={selectedCategory?.cat_id || null}
            subcategoryId={selectedSubcategory?.subcat_id || null}
          />
          {showSettings && <SettingsPanel />}
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden w-full">
          {mobileView === 'categories' && (
            <Sidebar 
              onCategorySelect={handleCategorySelect}
              selectedCategory={selectedCategory}
            />
          )}
          {mobileView === 'subcategories' && (
            <div className="w-full">
              <div className="p-4 border-b border-gray-200 bg-white">
                <button 
                  onClick={() => setMobileView('categories')}
                  className="text-green-600 text-sm font-medium"
                >
                  ← Back to Categories
                </button>
              </div>
              <SubCategoryList
                categoryId={selectedCategory?.cat_id || null}
                onSubcategorySelect={handleSubcategorySelect}
                selectedSubcategory={selectedSubcategory}
              />
            </div>
          )}
          {mobileView === 'content' && (
            <div className="w-full">
              <div className="p-4 border-b border-gray-200 bg-white">
                <button 
                  onClick={() => setMobileView('subcategories')}
                  className="text-green-600 text-sm font-medium"
                >
                  ← Back to Subcategories
                </button>
              </div>
              <DuaContent
                categoryId={selectedCategory?.cat_id || null}
                subcategoryId={selectedSubcategory?.subcat_id || null}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
