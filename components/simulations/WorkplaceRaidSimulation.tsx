import React, { useState } from 'react';
import { ChevronRightIcon, ArrowLeftIcon } from '../Icons';

interface WorkplaceRaidSimulationProps {
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
    scenario: "You're at work when ICE agents enter the building. Your manager announces there's a raid. What's your immediate response?",
    options: [
      {
        text: "Stay calm and don't run or create panic",
        consequence: "Excellent! Running can create suspicion and escalate the situation.",
        nextStep: 'agent_approach',
        isCorrect: true
      },
      {
        text: "Try to leave the building immediately",
        consequence: "Attempting to leave during a raid could be seen as suspicious behavior.",
        nextStep: 'agent_approach'
      },
      {
        text: "Hide in the bathroom or storage room",
        consequence: "Hiding might draw more attention and could be interpreted as having something to conceal.",
        nextStep: 'agent_approach'
      }
    ]
  },
  agent_approach: {
    id: 'agent_approach',
    scenario: "An ICE agent approaches you and asks for your name. How do you respond?",
    options: [
      {
        text: "Provide your name only, nothing more",
        consequence: "Good! You're only required to provide your name in most situations.",
        nextStep: 'documentation_request',
        isCorrect: true
      },
      {
        text: "Give them your full name and explain your immigration status",
        consequence: "You have the right to remain silent beyond providing your name.",
        nextStep: 'documentation_request'
      },
      {
        text: "Refuse to say anything at all",
        consequence: "While you have the right to remain silent, providing your name is generally required.",
        nextStep: 'documentation_request'
      }
    ]
  },
  documentation_request: {
    id: 'documentation_request',
    scenario: "The agent asks to see your work authorization documents. What do you do?",
    options: [
      {
        text: "Ask if you are being detained or if you are free to go",
        consequence: "Smart! This clarifies your status and your rights in the situation.",
        nextStep: 'detention_status',
        isCorrect: true
      },
      {
        text: "Immediately show all your documents",
        consequence: "While cooperation might seem helpful, you have rights regarding document requests.",
        nextStep: 'detention_status'
      },
      {
        text: "Say you don't have any documents with you",
        consequence: "This could complicate your situation. Focus on clarifying your status first.",
        nextStep: 'detention_status'
      }
    ]
  },
  detention_status: {
    id: 'detention_status',
    scenario: "The agent says you need to come with them for questioning. How do you respond?",
    options: [
      {
        text: "Ask to see a warrant and state you want to speak with a lawyer",
        consequence: "Perfect! You have the right to see a warrant and legal representation.",
        nextStep: 'legal_rights',
        isCorrect: true
      },
      {
        text: "Go with them without asking questions",
        consequence: "You have the right to understand why you're being detained and to legal counsel.",
        nextStep: 'legal_rights'
      },
      {
        text: "Physically resist being taken",
        consequence: "Physical resistance can lead to additional charges. Stay calm and assert your rights verbally.",
        nextStep: 'legal_rights'
      }
    ]
  },
  legal_rights: {
    id: 'legal_rights',
    scenario: "You assert your rights to see a warrant and speak with a lawyer. The agent seems frustrated. What now?",
    options: [
      {
        text: "Remain silent and continue requesting legal counsel",
        consequence: "Excellent! You have the right to remain silent and request an attorney.",
        nextStep: 'end',
        isCorrect: true
      },
      {
        text: "Try to explain your situation to change their mind",
        consequence: "Anything you say can be used against you. It's best to wait for your attorney.",
        nextStep: 'end'
      },
      {
        text: "Sign any documents they present",
        consequence: "Never sign documents without understanding them or having legal counsel review them.",
        nextStep: 'end'
      }
    ]
  },
  end: {
    id: 'end',
    scenario: "Remember: You have rights regardless of immigration status. Stay calm, ask for a lawyer, and don't sign anything without legal counsel.",
    options: []
  }
};

const WorkplaceRaidSimulation: React.FC<WorkplaceRaidSimulationProps> = ({ onBack }) => {
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
        <h2 className="text-2xl font-bold text-blue-300 mb-4">Workplace Raid Response</h2>
        
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

export default WorkplaceRaidSimulation; 