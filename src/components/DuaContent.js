"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import DuaSearchBox from './DuaSearchBox'

export default function DuaContent({ selectedCategory, selectedSubCategory }) {
  const [duas, setDuas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [playingAudio, setPlayingAudio] = useState(null);
  const [savedDuas, setSavedDuas] = useState([]);

  useEffect(() => {
    async function fetchDuas() {
      try {
        setLoading(true);
        let endpoint = 'http://localhost:3050/api/duas';
        
        if (selectedSubCategory) {
          endpoint += `?subcat_id=${selectedSubCategory.subcat_id}`;
        } else if (selectedCategory) {
          endpoint += `?cat_id=${selectedCategory.cat_id}`;
        }
        
        const response = await fetch(endpoint);
        const data = await response.json();
        setDuas(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching duas:', error);
        setLoading(false);
      }
    }

    fetchDuas();
  }, [selectedCategory, selectedSubCategory]);

  const handleAudioPlay = (audioId) => {
    if (playingAudio === audioId) {
      // Stop playing
      setPlayingAudio(null);
    } else {
      // Start playing new audio
      setPlayingAudio(audioId);
    }
  };

  const handleCopyDua = (dua) => {
    const textToCopy = `
${dua.dua_name_en}

${dua.top_en || ''}

${dua.dua_arabic || ''}

${dua.transliteration_en ? `Transliteration: ${dua.transliteration_en}` : ''}

${dua.translation_en ? `Translation: ${dua.translation_en}` : ''}

Reference: ${dua.reference_en || ''}
    `;
    
    navigator.clipboard.writeText(textToCopy.trim())
      .then(() => {
        alert('Dua copied to clipboard');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  const handleSaveDua = (duaId) => {
    if (savedDuas.includes(duaId)) {
      setSavedDuas(savedDuas.filter(id => id !== duaId));
    } else {
      setSavedDuas([...savedDuas, duaId]);
    }
  };

  return (
    <>
      <DuaSearchBox />
      <div className="w-[889px] h-[800px] absolute top-[130px] left-[580px] bg-gray-200 rounded-[10px]">
        {/* Fixed height container with internal scrolling */}
        <div className="w-full h-full overflow-y-auto px-0 pb-[10px]">
          <div className="flex flex-col gap-[10px] px-0">
            {loading ? (
              <div className="flex justify-center items-center h-[400px]">
                <p className="text-xl text-gray-600">Loading duas...</p>
              </div>
            ) : duas.length === 0 ? (
              <div className="flex justify-center items-center h-[400px]">
                <p className="text-xl text-gray-600">No duas found for the selected category.</p>
              </div>
            ) : (
              duas.map((dua) => (
                <div 
                  key={dua.dua_id} 
                  className="w-full bg-white border-[0.5px] border-gray-200 rounded-[10px] pt-[15px] pr-[30px] pb-[15px] pl-[30px] flex flex-col gap-[28px] mx-auto"
                >
                  {/* Dua Title */}
                  <div className="w-full flex items-center gap-[10px]">
                    <div className="w-[32px] h-[32px]">
                      <Image 
                        src="/images/allah.png" 
                        alt="Dua Icon" 
                        width={32} 
                        height={32} 
                        className="object-contain"
                      />
                    </div>
                    <h2 className="text-lg font-semibold text-green-600">{`${dua.dua_id}. ${dua.dua_name_en}`}</h2>
                  </div>
                  
                  {/* Dua Content */}
                  <div className="w-full flex flex-col gap-[28px]">
                    {/* Top English Text */}
                    {dua.top_en && (
                      <p className="text-gray-700 text-base leading-relaxed">{dua.top_en}</p>
                    )}
                    
                    {/* Arabic Text */}
                    {dua.dua_arabic && (
                      <p className="text-right text-2xl leading-loose font-arabic">{dua.dua_arabic}</p>
                    )}
                    
                    {/* Transliteration */}
                    {dua.transliteration_en && (
                      <div>
                        <p className="text-gray-500 font-semibold mb-1">Transliteration:</p>
                        <p className="text-gray-700 italic">{dua.transliteration_en}</p>
                      </div>
                    )}
                    
                    {/* Translation */}
                    {dua.translation_en && (
                      <div>
                        <p className="text-gray-500 font-semibold mb-1">Translation:</p>
                        <p className="text-gray-700">{dua.translation_en}</p>
                      </div>
                    )}
                    
                    {/* Reference */}
                    {dua.reference_en && (
                      <div>
                        <p className="text-green-600 font-semibold mb-1">Reference:</p>
                        <p className="text-gray-700">{dua.reference_en}</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="w-full flex justify-between items-center">
                    {/* Audio Play Button */}
                    <div>
                      {dua.audio && (
                        <button 
                          onClick={() => handleAudioPlay(dua.dua_id)}
                          className="w-[44px] h-[44px] bg-green-500 rounded-full flex items-center justify-center"
                        >
                          {playingAudio === dua.dua_id ? (
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <rect x="6" y="4" width="4" height="16" rx="1" ry="1" />
                              <rect x="14" y="4" width="4" height="16" rx="1" ry="1" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          )}
                        </button>
                      )}
                    </div>
                    
                    {/* Right Side Buttons */}
                    <div className="flex gap-4">
                      {/* Copy Button */}
                      <button 
                        onClick={() => handleCopyDua(dua)}
                        className="w-[40px] h-[40px] rounded-full flex items-center justify-center hover:bg-gray-100"
                        title="Copy Dua"
                      >
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                      
                      {/* Save Button */}
                      <button 
                        onClick={() => handleSaveDua(dua.dua_id)}
                        className="w-[40px] h-[40px] rounded-full flex items-center justify-center hover:bg-gray-100"
                        title="Save Dua"
                      >
                        <svg 
                          className={`w-5 h-5 ${savedDuas.includes(dua.dua_id) ? 'text-yellow-500 fill-current' : 'text-gray-600'}`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                      </button>
                      
                      {/* Insight Button */}
                      <button 
                        className="w-[40px] h-[40px] rounded-full flex items-center justify-center hover:bg-gray-100"
                        title="Dua Insights"
                      >
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </button>
                      
                      {/* Share Button */}
                      <button 
                        className="w-[40px] h-[40px] rounded-full flex items-center justify-center hover:bg-gray-100"
                        title="Share Dua"
                      >
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                      </button>
                      
                      {/* Info Button */}
                      <button 
                        className="w-[40px] h-[40px] rounded-full flex items-center justify-center hover:bg-gray-100"
                        title="Dua Information"
                      >
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
