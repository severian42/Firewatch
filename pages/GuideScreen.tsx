
import React, { useState } from 'react';
import { enhancedResources } from '../data/resourceData';
import { documentationContent } from '../data/documentationContent';
import { ChevronDownIcon, ArrowLeftIcon, InformationCircleIcon, PhoneIcon, GlobeAltIcon, LifebuoyIcon } from '../components/Icons';
import FormattedContent from '../components/FormattedContent';

const GuideScreen: React.FC = () => {
  const [view, setView] = useState<'index' | 'docs' | 'resources'>('index');

  if (view === 'docs') {
    return (
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => setView('index')} 
          className="flex items-center gap-2 mb-6 text-blue-400 hover:text-blue-300 transition-colors font-semibold"
        >
          <ArrowLeftIcon />
          Back to Guide
        </button>
        <div className="bg-gray-800 p-6 rounded-lg">
          <FormattedContent content={documentationContent} />
        </div>
      </div>
    );
  }

  if (view === 'resources') {
  return (
      <div className="max-w-4xl mx-auto">
           <button
          onClick={() => setView('index')} 
          className="flex items-center gap-2 mb-6 text-blue-400 hover:text-blue-300 transition-colors font-semibold"
        >
          <ArrowLeftIcon />
          Back to Guide
            </button>
        <div className="space-y-6">
          {enhancedResources.map((category) => (
            <div key={category.category} className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-bold text-blue-400 mb-4">{category.category}</h3>
              <div className="space-y-4">
                {category.items.map((item: any, index: number) => (
                  <div key={index} className="bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-semibold text-white">{item.name}</h4>
                    <p className="text-sm text-gray-300 mb-2">{item.description}</p>
                    {item.phone && (
                      <a href={`tel:${item.phone}`} className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm mr-4">
                        <PhoneIcon className="w-4 h-4" />
                        {item.phone}
                          </a>
                        )}
                    {item.website && (
                      <a href={`https://${item.website}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm">
                        <GlobeAltIcon className="w-4 h-4" />
                        {item.website}
                          </a>
                        )}
                      </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-100 mb-8">Firewatch Guide & Resources</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          onClick={() => setView('docs')}
          className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors text-left"
        >
          <InformationCircleIcon className="w-12 h-12 text-blue-400 mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">App Documentation</h2>
          <p className="text-gray-400">Complete guide to all Firewatch features and how to use them effectively.</p>
        </button>

        <button
          onClick={() => setView('resources')}
          className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors text-left"
        >
          <LifebuoyIcon className="w-12 h-12 text-green-400 mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Emergency Resources</h2>
          <p className="text-gray-400">Legal hotlines, support organizations, and emergency contacts.</p>
        </button>
          </div>

      <div className="mt-8 bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-bold text-yellow-400 mb-4">⚠️ Important Legal Notice</h3>
        <p className="text-gray-300">
          This app provides information and tools for educational purposes. It is not a substitute for professional legal advice. 
          Always consult with a qualified attorney for legal matters. Laws vary by jurisdiction and may change over time.
        </p>
      </div>
    </div>
  );
};

export default GuideScreen;
