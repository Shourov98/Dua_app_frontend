import { useState } from 'react';
import Image from 'next/image';
import UserDropdown from './UserDropdown';

export default function SettingsPanel() {
  const [activeTab, setActiveTab] = useState('appearance');
  const [nightMode, setNightMode] = useState(false);

  const tabs = [
    { id: 'language', name: 'Language Settings', icon: 'language' },
    { id: 'general', name: 'General Settings', icon: 'settings' },
    { id: 'font', name: 'Font Settings', icon: 'font' },
    { id: 'appearance', name: 'Appearance Settings', icon: 'appearance' },
  ];

  return (
    <>
      <UserDropdown />
      <div className="w-[330px] h-[800px] bg-white overflow-y-auto rounded-2xl shadow-sm absolute top-[133px] left-[1490px]">
        {/* Centered Settings title */}
        <div className="p-6 flex justify-center">
          <h2 className="text-xl font-bold text-gray-800">Settings</h2>
        </div>
        
        <div className="px-5">
          <div className="space-y-3">
            {tabs.map((tab) => (
              <div 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center p-4 rounded-xl cursor-pointer relative ${
                  activeTab === tab.id 
                    ? 'bg-green-50 text-green-600' 
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {activeTab === tab.id && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-600 rounded-l-xl"></div>
                )}
                
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${
                  activeTab === tab.id ? 'text-green-600' : 'text-gray-500'
                }`}>
                  {tab.icon === 'language' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                    </svg>
                  )}
                  {tab.icon === 'settings' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                  {tab.icon === 'font' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                  )}
                  {tab.icon === 'appearance' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  )}
                </div>
                <span className="text-base font-medium">{tab.name}</span>
              </div>
            ))}
          </div>
          
          {activeTab === 'appearance' && (
            <div className="mt-6">
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-gray-700 font-medium">Night Mode</span>
                <button 
                  onClick={() => setNightMode(!nightMode)}
                  className={`w-12 h-6 rounded-full transition-colors duration-200 focus:outline-none ${
                    nightMode ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  <div 
                    className={`w-5 h-5 rounded-full bg-white shadow transform transition-transform duration-200 ${
                      nightMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
