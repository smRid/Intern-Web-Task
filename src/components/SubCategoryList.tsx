'use client';

import { useState, useEffect } from 'react';
import { SubCategory } from '@/types';

interface SubCategoryListProps {
  categoryId: number | null;
  onSubcategorySelect: (subcategory: SubCategory) => void;
  selectedSubcategory: SubCategory | null;
}

export default function SubCategoryList({ 
  categoryId, 
  onSubcategorySelect, 
  selectedSubcategory 
}: SubCategoryListProps) {
  const [subcategories, setSubcategories] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!categoryId) {
      setSubcategories([]);
      return;
    }

    const fetchSubcategories = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/subcategories?cat_id=${categoryId}`);
        const data = await response.json();
        if (data.success) {
          setSubcategories(data.data);
          if (data.data.length > 0) {
            onSubcategorySelect(data.data[0]);
          }
        }
      } catch (error) {
        console.error('Failed to fetch subcategories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubcategories();
  }, [categoryId, onSubcategorySelect]);

  if (!categoryId) {
    return (
      <div className="w-full lg:w-80 bg-white border-r border-gray-200 flex items-center justify-center" style={{ height: 'calc(100vh - 64px)' }}>
        <div className="text-center text-gray-500">
          <div className="text-lg font-medium">Select a Category</div>
          <div className="text-sm">Choose a category to view subcategories</div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="w-full lg:w-80 bg-white border-r border-gray-200" style={{ height: 'calc(100vh - 64px)' }}>
        <div className="p-4">
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full lg:w-80 bg-white border-r border-gray-200 flex flex-col" style={{ height: 'calc(100vh - 64px)' }}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-green-50 flex-shrink-0">
        <h2 className="text-lg font-semibold text-green-800">Sub Categories</h2>
      </div>

      {/* Subcategories List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <div className="p-4 pb-8">
          <div className="space-y-3">{subcategories.map((subcategory) => (
            <button
              key={`${subcategory.cat_id}-${subcategory.subcat_id}`}
              onClick={() => onSubcategorySelect(subcategory)}
              className={`w-full p-4 rounded-lg text-left transition-colors duration-200 border ${
                selectedSubcategory?.subcat_id === subcategory.subcat_id
                  ? 'bg-green-50 border-green-200 text-green-700'
                  : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900 leading-tight">
                    {subcategory.subcat_name_en}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {subcategory.no_of_dua} Duas
                  </div>
                </div>
                <div className="ml-3 flex-shrink-0">
                  <div className={`w-2 h-2 rounded-full ${
                    selectedSubcategory?.subcat_id === subcategory.subcat_id
                      ? 'bg-green-500'
                      : 'bg-gray-300'
                  }`}></div>
                </div>
              </div>
            </button>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
}
