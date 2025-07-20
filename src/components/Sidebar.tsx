'use client';

import { useState, useEffect } from 'react';
import { Category } from '@/types';
import { Book } from 'lucide-react';

interface SidebarProps {
  onCategorySelect: (category: Category) => void;
  selectedCategory: Category | null;
}

export default function Sidebar({ onCategorySelect, selectedCategory }: SidebarProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        if (data.success) {
          setCategories(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="w-80 bg-white h-screen border-r border-gray-200">
        <div className="p-4">
          <div className="animate-pulse space-y-4">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full lg:w-80 bg-white border-r border-gray-200 flex flex-col" style={{ height: 'calc(100vh - 64px)' }}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex-shrink-0">
        <h2 className="text-lg font-semibold text-gray-900">Categories</h2>
      </div>

      {/* Categories List*/}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <div className="p-4 pb-8">
          <div className="space-y-2">{categories.map((category) => (
            <button
              key={category.cat_id}
              onClick={() => onCategorySelect(category)}
              className={`w-full flex items-center p-3 rounded-lg text-left transition-colors duration-200 ${
                selectedCategory?.cat_id === category.cat_id
                  ? 'bg-green-50 border border-green-200 text-green-700'
                  : 'hover:bg-gray-50 border border-transparent'
              }`}
            >
              <div className="flex items-center space-x-3 w-full">
                <div className={`p-2 rounded-lg ${
                  selectedCategory?.cat_id === category.cat_id
                    ? 'bg-green-100'
                    : 'bg-gray-100'
                }`}>
                  <Book className="h-5 w-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">
                    {category.cat_name_en}
                  </div>
                  <div className="text-xs text-gray-500">
                    Subcategory: {category.no_of_subcat}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-600">
                    {category.no_of_dua}
                  </div>
                  <div className="text-xs text-gray-400">Duas</div>
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
