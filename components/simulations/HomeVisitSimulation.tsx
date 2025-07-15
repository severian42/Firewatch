import React, { useState } from 'react';
import { ChevronRightIcon, ArrowLeftIcon } from '../Icons';

interface HomeVisitSimulationProps {
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
    scenario: "There's a knock at your door. You look through the peephole and see people who appear to be law enforcement. What's your first step?",
    options: [
      {
        text: "Don't open the door immediately, ask who they are and what they want",
        consequence: "Good! You have no obligation to open your door without knowing who is there and why.",
        nextStep: 'identify_officers',
        isCorrect: true
      },
      {
        text: "Open the door to see what they want",
        consequence: "Opening the door gives officers visual access to your home and potentially weakens your privacy rights.",
        nextStep: 'identify_officers'
      },
      {
        text: "Ignore the knock and stay quiet",
        consequence: "While you can choose not to respond, it's often better to communicate through the door.",
        nextStep: 'identify_officers'
      }
    ]
  },
  identify_officers: {
    id: 'identify_officers',
    scenario: "They say they're police officers investigating a complaint. They want to come in and talk. How do you respond?",
    options: [
      {
        text: "Ask to see a warrant through the door or window",
        consequence: "Perfect! Officers generally need a warrant to enter your home without permission.",
        nextStep: 'warrant_check',
        isCorrect: true
      },
      {
        text: "Let them in to avoid seeming uncooperative",
        consequence: "Once you allow entry, you may have given up important constitutional protections.",
        nextStep: 'warrant_check'
      },
      {
        text: "Tell them to come back later",
        consequence: "This might work, but asking for a warrant is more specific and legally protective.",
        nextStep: 'warrant_check'
      }
    ]
  },
  warrant_check: {
    id: 'warrant_check',
    scenario: "They say they don't have a warrant but claim they have probable cause. They insist on entering. What do you do?",
    options: [
      {
        text: "Clearly state: 'I do not consent to any searches or entry without a warrant'",
        consequence: "Excellent! You've clearly asserted your Fourth Amendment rights.",
        nextStep: 'assert_rights',
        isCorrect: true
      },
      {
        text: "Step outside to talk to them, closing the door behind you",
        consequence: "This can be a reasonable compromise, but ensure you don't accidentally give consent.",
        nextStep: 'assert_rights'
      },
      {
        text: "Allow them to enter since they seem insistent",
        consequence: "Consenting to entry waives your right to challenge the search later.",
        nextStep: 'assert_rights'
      }
    ]
  },
  assert_rights: {
    id: 'assert_rights',
    scenario: "They become more insistent and mention they could get a warrant easily. They ask if you have something to hide. How do you respond?",
    options: [
      {
        text: "I have nothing to hide, but I know my rights and require a warrant for entry",
        consequence: "Perfect balance of asserting rights while remaining polite and non-confrontational.",
        nextStep: 'legal_counsel',
        isCorrect: true
      },
      {
        text: "Start arguing about constitutional rights",
        consequence: "While you're correct, being confrontational can escalate the situation.",
        nextStep: 'legal_counsel'
      },
      {
        text: "Give up and let them in",
        consequence: "You've waived your rights by giving consent to search.",
        nextStep: 'legal_counsel'
      }
    ]
  },
  legal_counsel: {
    id: 'legal_counsel',
    scenario: "They continue to pressure you. What's your next step?",
    options: [
      {
        text: "Ask if you're being detained and request to speak with an attorney",
        consequence: "Excellent! These are your fundamental rights in any law enforcement encounter.",
        nextStep: 'end',
        isCorrect: true
      },
      {
        text: "Try to negotiate or compromise",
        consequence: "Negotiating your constitutional rights isn't advisable. Stick to clear assertions.",
        nextStep: 'end'
      },
      {
        text: "Call a friend for advice while they're at the door",
        consequence: "While calling an attorney is good, focus on asserting your rights clearly first.",
        nextStep: 'end'
      }
    ]
  },
  end: {
    id: 'end',
    scenario: "Remember: Your home has the strongest privacy protections. Never consent to searches without a warrant, stay calm, and ask for legal counsel.",
    options: []
  }
};

const HomeVisitSimulation: React.FC<HomeVisitSimulationProps> = ({ onBack }) => {
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
        <h2 className="text-2xl font-bold text-blue-300 mb-4">Home Visit Encounter</h2>
        
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

export default HomeVisitSimulation; 