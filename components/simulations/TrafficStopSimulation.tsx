import React, { useState } from 'react';
import { ChevronRightIcon, ArrowLeftIcon } from '../Icons';

interface TrafficStopSimulationProps {
  onBack: () => void;
}

interface SimulationStep {
  id: string;
  scenario: string;
  options: {
    text: string;
    consequence: string;
    nextStep?: string;
    isCorrect?: boolean;
  }[];
}

const simulationSteps: Record<string, SimulationStep> = {
  start: {
    id: 'start',
    scenario: "You're driving home when you see flashing lights in your rearview mirror. The police are pulling you over. What's your first move?",
    options: [
      {
        text: "Continue driving until I find a safe, well-lit area to pull over",
        consequence: "Good thinking! Safety first. Signal your intention and pull over when safe.",
        nextStep: 'pull_over',
        isCorrect: true
      },
      {
        text: "Stop immediately wherever I am",
        consequence: "While you should pull over promptly, prioritize safety. Find a safe spot if possible.",
        nextStep: 'pull_over'
      },
      {
        text: "Keep driving to avoid the stop",
        consequence: "This could escalate the situation and lead to more serious charges.",
        nextStep: 'escalation'
      }
    ]
  },
  pull_over: {
    id: 'pull_over',
    scenario: "You've safely pulled over. The officer approaches your window. What should you do first?",
    options: [
      {
        text: "Roll down the window, keep hands visible on the steering wheel",
        consequence: "Excellent! This shows cooperation and keeps the officer at ease.",
        nextStep: 'officer_questions',
        isCorrect: true
      },
      {
        text: "Get out of the car to talk to the officer",
        consequence: "Staying in the car is generally safer unless instructed otherwise.",
        nextStep: 'officer_questions'
      },
      {
        text: "Start recording on my phone immediately",
        consequence: "While you have the right to record, focus on safety and cooperation first.",
        nextStep: 'officer_questions'
      }
    ]
  },
  officer_questions: {
    id: 'officer_questions',
    scenario: "The officer asks: 'Do you know why I pulled you over?' How do you respond?",
    options: [
      {
        text: "I'm not sure, officer. Can you tell me?",
        consequence: "Good response! You haven't admitted to anything while remaining polite.",
        nextStep: 'license_registration',
        isCorrect: true
      },
      {
        text: "Yes, I was probably speeding",
        consequence: "You've just admitted to a traffic violation. Avoid self-incrimination.",
        nextStep: 'license_registration'
      },
      {
        text: "I don't have to answer that",
        consequence: "While legally true, this could escalate tensions. Consider a more diplomatic approach.",
        nextStep: 'license_registration'
      }
    ]
  },
  license_registration: {
    id: 'license_registration',
    scenario: "The officer asks for your license and registration. What's your approach?",
    options: [
      {
        text: "Inform the officer before reaching for documents: 'My license is in my wallet in my back pocket'",
        consequence: "Perfect! Always inform officers before making movements to avoid misunderstandings.",
        nextStep: 'search_request',
        isCorrect: true
      },
      {
        text: "Quickly reach for the glove compartment without saying anything",
        consequence: "Sudden movements can make officers nervous. Always communicate your actions.",
        nextStep: 'search_request'
      },
      {
        text: "Ask if I'm required to provide these documents",
        consequence: "While you are required to provide license and registration, this could seem uncooperative.",
        nextStep: 'search_request'
      }
    ]
  },
  search_request: {
    id: 'search_request',
    scenario: "The officer says: 'Mind if I take a look in your trunk?' How do you respond?",
    options: [
      {
        text: "I do not consent to any searches",
        consequence: "Excellent! You've clearly asserted your Fourth Amendment rights.",
        nextStep: 'end',
        isCorrect: true
      },
      {
        text: "Sure, go ahead",
        consequence: "You've consented to a search. Once given, consent can be difficult to withdraw.",
        nextStep: 'end'
      },
      {
        text: "Do you have a warrant?",
        consequence: "Good question! While you can ask this, a simple 'I do not consent' is clearer.",
        nextStep: 'end'
      }
    ]
  },
  escalation: {
    id: 'escalation',
    scenario: "By not pulling over, you've created a more serious situation. The officer may now suspect you're evading. This is not recommended.",
    options: [
      {
        text: "Pull over immediately and cooperate fully",
        consequence: "Better late than never. Pull over safely and follow all instructions.",
        nextStep: 'pull_over'
      }
    ]
  },
  end: {
    id: 'end',
    scenario: "Simulation complete! Remember: Stay calm, be polite, know your rights, and prioritize safety.",
    options: []
  }
};

const TrafficStopSimulation: React.FC<TrafficStopSimulationProps> = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState('start');
  const [history, setHistory] = useState<Array<{step: string, choice: string, consequence: string}>>([]);

  const handleChoice = (option: any) => {
    setHistory([...history, {
      step: simulationSteps[currentStep].scenario,
      choice: option.text,
      consequence: option.consequence
    }]);

    if (option.nextStep) {
      setCurrentStep(option.nextStep);
    }
  };

  const resetSimulation = () => {
    setCurrentStep('start');
    setHistory([]);
  };

  const currentStepData = simulationSteps[currentStep];

  return (
    <div className="max-w-2xl mx-auto p-4">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 mb-6 text-blue-400 hover:text-blue-300 transition-colors"
      >
        <ArrowLeftIcon />
        Back to simulators
      </button>

      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-blue-300 mb-4">Traffic Stop Simulation</h2>
        
        {currentStep !== 'end' && (
          <div className="mb-6">
            <div className="bg-gray-700 rounded-lg p-4 mb-4">
              <p className="text-gray-200 text-lg">{currentStepData.scenario}</p>
            </div>

            <div className="space-y-3">
              {currentStepData.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleChoice(option)}
                  className="w-full text-left p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gray-200">{option.text}</span>
                    <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {currentStep === 'end' && (
          <div>
            <h3 className="text-xl font-semibold text-green-400 mb-4">Simulation Complete!</h3>
            <div className="space-y-4 mb-6">
              {history.map((item, index) => (
                <div key={index} className="bg-gray-700 rounded-lg p-4">
                  <p className="text-sm text-gray-400 mb-2">Step {index + 1}</p>
                  <p className="text-gray-200 mb-2"><strong>Scenario:</strong> {item.step}</p>
                  <p className="text-gray-200 mb-2"><strong>Your choice:</strong> {item.choice}</p>
                  <p className="text-blue-300"><strong>Result:</strong> {item.consequence}</p>
                </div>
              ))}
            </div>
            <button
              onClick={resetSimulation}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrafficStopSimulation; 