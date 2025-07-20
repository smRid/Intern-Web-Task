'use client';

import { Settings as SettingsIcon, Languages, Palette, Volume2 } from 'lucide-react';

export default function SettingsPanel() {
  return (
    <div className="w-80 bg-white h-screen border-l border-gray-200 overflow-y-auto scrollbar-thin">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
          <SettingsIcon className="h-5 w-5 mr-2" />
          Settings
        </h2>
      </div>

      {/* Settings Options */}
      <div className="p-4 space-y-6">
        {/* Language Settings */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
            <Languages className="h-4 w-4 mr-2" />
            Language Settings
          </h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="language"
                value="english"
                defaultChecked
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">English</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="language"
                value="bengali"
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">বাংলা</span>
            </label>
          </div>
        </div>

        {/* Font Settings */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Font Settings</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Font Size</label>
              <select className="w-full p-2 border border-gray-300 rounded-md text-sm">
                <option>Small</option>
                <option selected>Medium</option>
                <option>Large</option>
                <option>Extra Large</option>
              </select>
            </div>
          </div>
        </div>

        {/* Appearance Settings */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
            <Palette className="h-4 w-4 mr-2" />
            Appearance Settings
          </h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="theme"
                value="light"
                defaultChecked
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">Light Theme</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="theme"
                value="dark"
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">Dark Theme</span>
            </label>
          </div>
        </div>

        {/* Audio Settings */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
            <Volume2 className="h-4 w-4 mr-2" />
            Audio Settings
          </h3>
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                defaultChecked
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">Auto-play Audio</span>
            </label>
          </div>
        </div>

        {/* General Settings */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">General</h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                defaultChecked
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">Show Transliteration</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                defaultChecked
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">Show Translation</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                defaultChecked
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">Show References</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
