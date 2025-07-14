
import React, { useState } from 'react';
import { resourceData } from '../data/resourceData';
import { documentationContent } from '../data/documentationContent';
import { ChevronDownIcon, ArrowLeftIcon, InformationCircleIcon } from '../components/Icons';
import FormattedContent from '../components/FormattedContent';
import type { ResourceCategory } from '../types';

const GuideScreen: React.FC = () => {
  const [view, setView] = useState<'index' | 'docs'>('index');
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };
  
  const currentResourceData: ResourceCategory[] = resourceData;

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

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-4xl font-bold text-center text-blue-400">Guide & Resources</h1>
        <p className="mt-4 text-lg text-center text-gray-300">
          Your guide to the app and external support organizations.
        </p>
      </div>
      
      <div className="space-y-4">
        {/* App Documentation Card */}
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-purple-600/50">
           <button
              onClick={() => setView('docs')}
              className="w-full flex justify-between items-center p-5 text-left transition-colors bg-purple-900/30 hover:bg-purple-800/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <div className="flex items-center">
                <InformationCircleIcon className="w-10 h-10 text-purple-400 mr-4 flex-shrink-0" />
                <div>
                  <h2 className="text-xl font-semibold text-gray-100">App User Guide</h2>
                  <p className="text-sm text-gray-400 mt-1">Learn how to use all features of the Firewatch app.</p>
                </div>
              </div>
               <svg className="w-5 h-5 text-gray-400 flex-shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
        </div>

        {/* External Resources */}
        {currentResourceData.map((category) => (
          <div key={category.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
            <button
              onClick={() => toggleAccordion(category.id)}
              className="w-full flex justify-between items-center p-5 text-left transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-expanded={openAccordion === category.id}
              aria-controls={`resources-${category.id}`}
            >
              <div className="flex items-center">
                <span className="text-3xl mr-4" aria-hidden="true">{category.icon}</span>
                <div>
                  <h2 className="text-xl font-semibold text-gray-100">{category.title}</h2>
                  <p className="text-sm text-gray-400 mt-1 hidden sm:block">{category.description}</p>
                </div>
              </div>
              <ChevronDownIcon
                className={`w-6 h-6 text-gray-400 transition-transform duration-300 flex-shrink-0 ml-4 ${
                  openAccordion === category.id ? 'transform rotate-180' : ''
                }`}
              />
            </button>
            <div
              id={`resources-${category.id}`}
              className={`transition-all duration-500 ease-in-out ${
                openAccordion === category.id ? 'max-h-[1000px]' : 'max-h-0'
              }`}
            >
              <div className={`p-5 border-t border-gray-700 ${openAccordion !== category.id && 'hidden'}`}>
                <ul className="space-y-4">
                  {category.resources.map((resource) => (
                    <li key={resource.name} className="bg-gray-900 p-4 rounded-lg shadow-inner">
                      <h3 className="font-bold text-lg text-blue-300">{resource.name}</h3>
                      <p className="mt-2 text-gray-300 leading-relaxed">{resource.description}</p>
                      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                        {resource.website && (
                          <a
                            href={resource.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-green-400 hover:text-green-300 transition-colors font-medium"
                          >
                            Website
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                          </a>
                        )}
                        {resource.phone && (
                          <a
                            href={`tel:${resource.phone}`}
                            className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors font-medium"
                          >
                             <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                            {resource.phone}
                          </a>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuideScreen;
