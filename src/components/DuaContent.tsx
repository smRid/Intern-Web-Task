'use client';

import { useState, useEffect } from 'react';
import { Dua } from '@/types';
import { Play, BookOpen, Copy, Share2 } from 'lucide-react';
import ErrorState from './ErrorState';

interface DuaContentProps {
  categoryId: number | null;
  subcategoryId: number | null;
}

export default function DuaContent({ categoryId, subcategoryId }: DuaContentProps) {
  const [duas, setDuas] = useState<Dua[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);

  useEffect(() => {
    if (!categoryId || !subcategoryId) {
      setDuas([]);
      return;
    }

    const fetchDuas = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/duas?cat_id=${categoryId}&subcat_id=${subcategoryId}`);
        const data = await response.json();
        if (data.success) {
          setDuas(data.data);
        } else {
          setError(data.error || 'Failed to fetch duas');
        }
      } catch (error) {
        console.error('Failed to fetch duas:', error);
        setError('Failed to fetch duas');
      } finally {
        setLoading(false);
      }
    };

    fetchDuas();
  }, [categoryId, subcategoryId]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const playAudio = (audioUrl: string) => {
    if (playingAudio === audioUrl) {
      setPlayingAudio(null);
      return;
    }
    
    setPlayingAudio(audioUrl);
    const audio = new Audio(audioUrl);
    audio.play().catch((err) => {
      console.error('Failed to play audio:', err);
      setPlayingAudio(null);
    });
    
    audio.onended = () => setPlayingAudio(null);
    audio.onerror = () => setPlayingAudio(null);
  };

  if (!categoryId || !subcategoryId) {
    return (
      <div className="flex-1 bg-white flex items-center justify-center" style={{ height: 'calc(100vh - 64px)' }}>
        <div className="text-center text-gray-500">
          <BookOpen className="h-16 w-16 mx-auto mb-4 text-gray-300" />
          <div className="text-lg font-medium">Welcome to Dua & Ruqyah</div>
          <div className="text-sm">Select a category and subcategory to view duas</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 bg-white">
        <ErrorState 
          message={error} 
          onRetry={() => {
            setError(null);
            if (categoryId && subcategoryId) {
              // Re-fetch data
              const fetchDuas = async () => {
                setLoading(true);
                setError(null);
                try {
                  const response = await fetch(`/api/duas?cat_id=${categoryId}&subcat_id=${subcategoryId}`);
                  const data = await response.json();
                  if (data.success) {
                    setDuas(data.data);
                  } else {
                    setError(data.error || 'Failed to fetch duas');
                  }
                } catch (error) {
                  console.error('Failed to fetch duas:', error);
                  setError('Failed to fetch duas');
                } finally {
                  setLoading(false);
                }
              };
              fetchDuas();
            }
          }}
        />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex-1 bg-white overflow-y-auto" style={{ height: 'calc(100vh - 64px)' }}>
        <div className="max-w-4xl mx-auto p-6">
          <div className="animate-pulse space-y-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-6">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-20 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100" style={{ height: 'calc(100vh - 64px)' }}>
      <div className="max-w-4xl mx-auto p-6 pb-8">
        <div className="space-y-6">
          {duas.map((dua, index) => (
            <div key={`${dua.cat_id}-${dua.subcat_id}-${dua.dua_id}-${index}`} className="bg-white rounded-lg shadow-sm border border-gray-200">
              {/* Dua Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {dua.dua_name_en}
                    </h3>
                    <div className="flex items-center space-x-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Dua #{dua.dua_id}
                      </span>
                      {dua.audio && (
                        <button 
                          onClick={() => playAudio(dua.audio!)}
                          className={`inline-flex items-center space-x-1 text-green-600 hover:text-green-700 ${
                            playingAudio === dua.audio ? 'bg-green-50 px-2 py-1 rounded' : ''
                          }`}
                        >
                          <Play className="h-4 w-4" />
                          <span className="text-sm">
                            {playingAudio === dua.audio ? 'Playing...' : 'Play Audio'}
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => copyToClipboard(dua.dua_arabic || '')}
                      className="p-2 text-gray-400 hover:text-gray-600"
                      title="Copy Arabic Text"
                    >
                      <Copy className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600" title="Share">
                      <Share2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Dua Content */}
              <div className="p-6 space-y-6">
                {/* Top Description */}
                {dua.top_en && (
                  <div className="prose prose-sm max-w-none">
                    <p className="text-gray-700 leading-relaxed">{dua.top_en}</p>
                  </div>
                )}

                {/* Arabic Text */}
                {dua.dua_arabic && (
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Arabic:</h4>
                    <div className="text-right text-2xl leading-loose text-gray-900 font-arabic">
                      {dua.dua_arabic}
                    </div>
                  </div>
                )}

                {/* Transliteration */}
                {dua.transliteration_en && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Transliteration:</h4>
                    <p className="text-gray-700 italic leading-relaxed">
                      {dua.transliteration_en}
                    </p>
                  </div>
                )}

                {/* Translation */}
                {dua.translation_en && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Translation:</h4>
                    <p className="text-gray-700 leading-relaxed">
                      {dua.translation_en}
                    </p>
                  </div>
                )}

                {/* Bottom Description */}
                {dua.bottom_en && (
                  <div className="prose prose-sm max-w-none">
                    <p className="text-gray-700 leading-relaxed">{dua.bottom_en}</p>
                  </div>
                )}

                {/* Reference */}
                {dua.refference_en && (
                  <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
                    <h4 className="text-sm font-medium text-blue-900 mb-1">Reference:</h4>
                    <p className="text-sm text-blue-800">{dua.refference_en}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
