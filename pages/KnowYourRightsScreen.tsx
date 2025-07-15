
import React, { useState, useMemo } from 'react';
import { RIGHTS_TOPICS_CONFIG, SCENARIO_SIMULATOR_MODULES_CONFIG } from '../constants';
import { rightsContent } from '../data/rightsContent';
import FormattedContent from '../components/FormattedContent';
import { ArrowLeftIcon } from '../components/Icons';
import TrafficStopSimulation from '../components/simulations/TrafficStopSimulation';
import WorkplaceRaidSimulation from '../components/simulations/WorkplaceRaidSimulation';
import HomeVisitSimulation from '../components/simulations/HomeVisitSimulation';
import RightsQuiz from '../components/simulations/RightsQuiz';

type ViewType = 'topics' | 'content' | 'simulation';

const KnowYourRightsScreen: React.FC = () => {
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<ViewType>('topics');
  const [selectedSimulation, setSelectedSimulation] = useState<string | null>(null);

  const handleSelectTopic = (topicId: string) => {
    setSelectedTopicId(topicId);
    setCurrentView('content');
  };

  const handleGoBack = () => {
    setSelectedTopicId(null);
    setCurrentView('topics');
  };

  const handleSelectScenario = (simulationId: string) => {
    setSelectedSimulation(simulationId);
    setCurrentView('simulation');
  };

  const handleBackToSimulators = () => {
    setSelectedSimulation(null);
    setCurrentView('topics');
  };

  const content = useMemo(() => {
    if (!selectedTopicId) return null;
    const contentKey = selectedTopicId as keyof typeof rightsContent;
    const translatedContent = rightsContent[contentKey];
    return translatedContent || 'Could not find information for the selected topic.';
  }, [selectedTopicId]);

  const renderSimulation = () => {
    switch (selectedSimulation) {
      case 'traffic_stop_sim':
        return <TrafficStopSimulation onBack={handleBackToSimulators} />;
      case 'workplace_raid_sim':
        return <WorkplaceRaidSimulation onBack={handleBackToSimulators} />;
      case 'home_visit_sim':
        return <HomeVisitSimulation onBack={handleBackToSimulators} />;
      case 'rights_quiz':
        return <RightsQuiz onBack={handleBackToSimulators} />;
      default:
        return null;
    }
  };

  const TopicSelection = () => (
    <div>
      <h1 className="text-4xl font-bold text-center text-blue-300 mb-8">Know Your Rights</h1>
      
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center text-purple-400 mb-6">Educational Topics</h2>
        <p className="text-lg text-center text-gray-300 mb-8">
          Learn about your rights in different situations
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {RIGHTS_TOPICS_CONFIG.map((topic) => (
            <button
              key={topic.id}
              onClick={() => handleSelectTopic(topic.id)}
              className="bg-indigo-900/50 hover:bg-indigo-800/60 text-gray-200 rounded-lg p-6 shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 border border-indigo-700"
            >
              <div className="flex items-center">
                <div className="text-purple-400 mr-4 flex-shrink-0">{topic.icon}</div>
                <span className="text-lg font-semibold text-left">{topic.title}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold text-center text-purple-400">Scenario Simulator</h2>
         <p className="mt-4 text-lg text-center text-gray-300">
          Practice how to respond in real-life situations.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          {SCENARIO_SIMULATOR_MODULES_CONFIG.map((module) => (
            <button
              key={module.id}
              onClick={() => handleSelectScenario(module.id)}
              className="bg-indigo-900/50 hover:bg-indigo-800/60 text-gray-200 rounded-lg p-6 shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 border border-indigo-700"
            >
              <div className="flex items-center">
                 <div className="text-purple-400 mr-4 flex-shrink-0">{module.icon}</div>
                <span className="text-lg font-semibold text-left">{module.title}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const ContentView = () => (
    <div>
      <button 
        onClick={handleGoBack} 
        className="flex items-center gap-2 mb-6 text-blue-400 hover:text-blue-300 transition-colors"
      >
        <ArrowLeftIcon />
        Back to topics
      </button>
      {content ? (
        <div className="bg-gray-800 p-6 rounded-lg">
          <FormattedContent content={content} />
        </div>
      ) : (
        <div className="bg-red-900 border border-red-500 text-red-200 px-4 py-3 rounded-lg" role="alert">
          Could not find information for the selected topic.
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      {currentView === 'topics' && <TopicSelection />}
      {currentView === 'content' && <ContentView />}
      {currentView === 'simulation' && renderSimulation()}
    </div>
  );
};

export default KnowYourRightsScreen;
