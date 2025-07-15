import React, { useState } from 'react';
import { ArrowLeftIcon } from '../Icons';

interface RightsQuizProps {
  onBack: () => void;
}

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "During a traffic stop, when can police search your car without a warrant?",
    options: [
      "Anytime they want",
      "Only if they have probable cause to believe there's evidence of a crime",
      "Only if you give them permission",
      "Never without a warrant"
    ],
    correctAnswer: 1,
    explanation: "Police can search your car without a warrant if they have probable cause to believe it contains evidence of a crime. This is known as the 'automobile exception' to the warrant requirement."
  },
  {
    id: 2,
    question: "Do you have to answer questions from law enforcement at your home?",
    options: [
      "Yes, always",
      "No, you can remain silent except to provide your name",
      "Only if they have a warrant",
      "Only if you're being arrested"
    ],
    correctAnswer: 1,
    explanation: "You have the right to remain silent and don't have to answer questions beyond providing your name. You can speak through the door or step outside and close the door behind you."
  },
  {
    id: 3,
    question: "What should you do if ICE agents come to your workplace?",
    options: [
      "Run away immediately",
      "Stay calm and don't run - running can create suspicion",
      "Hide in the bathroom",
      "Immediately show all your documents"
    ],
    correctAnswer: 1,
    explanation: "Staying calm and not running is crucial. Running can create suspicion and escalate the situation. You have rights regardless of your immigration status."
  },
  {
    id: 4,
    question: "Can you record police officers during an encounter?",
    options: [
      "No, it's illegal",
      "Yes, in public spaces where you have a legal right to be",
      "Only if you ask permission first",
      "Only if you're not the one being questioned"
    ],
    correctAnswer: 1,
    explanation: "You have the right to record police officers performing their duties in public spaces, as long as you don't interfere with their work."
  },
  {
    id: 5,
    question: "What should you say if police ask to search your home?",
    options: [
      "Let them in to be cooperative",
      "I do not consent to any searches without a warrant",
      "Ask them to come back later",
      "Only allow them to search the living room"
    ],
    correctAnswer: 1,
    explanation: "Clearly stating 'I do not consent to any searches without a warrant' protects your Fourth Amendment rights. Be polite but firm."
  },
  {
    id: 6,
    question: "During a traffic stop, when can you ask if you're free to go?",
    options: [
      "Only after getting a ticket",
      "After the officer has your documents, you can ask 'Am I free to go?'",
      "Never - you have to wait for them to dismiss you",
      "Only if you're being arrested"
    ],
    correctAnswer: 1,
    explanation: "After providing required documents, you can politely ask 'Am I free to go?' If yes, you may leave. If no, you are being detained."
  },
  {
    id: 7,
    question: "What information must you provide during a traffic stop?",
    options: [
      "Everything they ask for",
      "Only your driver's license, registration, and insurance",
      "Your entire travel history",
      "Nothing - you can remain completely silent"
    ],
    correctAnswer: 1,
    explanation: "You must provide your driver's license, vehicle registration, and proof of insurance. Beyond that, you have the right to remain silent."
  },
  {
    id: 8,
    question: "If you're arrested, what's the most important thing to remember?",
    options: [
      "Answer all questions truthfully",
      "Ask for a lawyer and remain silent",
      "Try to explain your side of the story",
      "Sign any documents they give you"
    ],
    correctAnswer: 1,
    explanation: "The most important thing is to ask for a lawyer and exercise your right to remain silent. Don't sign anything without legal counsel."
  }
];

const RightsQuiz: React.FC<RightsQuizProps> = ({ onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<Array<{question: string, selected: number, correct: number, correctAnswer: boolean}>>([]);

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    const isCorrect = answerIndex === quizQuestions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setAnswers([...answers, {
      question: quizQuestions[currentQuestion].question,
      selected: answerIndex,
      correct: quizQuestions[currentQuestion].correctAnswer,
      correctAnswer: isCorrect
    }]);
  };

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers([]);
  };

  const currentQ = quizQuestions[currentQuestion];

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
        <h2 className="text-2xl font-bold text-blue-300 mb-4">Know Your Rights Quiz</h2>
        
        {currentQuestion < quizQuestions.length ? (
          <div>
            <div className="mb-4">
              <span className="text-sm text-gray-400">
                Question {currentQuestion + 1} of {quizQuestions.length}
              </span>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-gray-700 rounded-lg p-4 mb-4">
              <h3 className="text-lg font-semibold text-gray-200 mb-4">{currentQ.question}</h3>
              
              <div className="space-y-3">
                {currentQ.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => !showResult && handleAnswer(index)}
                    disabled={showResult}
                    className={`w-full text-left p-4 rounded-lg transition-colors ${
                      showResult
                        ? index === currentQ.correctAnswer
                          ? 'bg-green-700 text-white'
                          : index === selectedAnswer && index !== currentQ.correctAnswer
                          ? 'bg-red-700 text-white'
                          : 'bg-gray-600 text-gray-400'
                        : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {showResult && (
              <div className="bg-gray-700 rounded-lg p-4 mb-4">
                <p className={`font-semibold mb-2 ${
                  selectedAnswer === currentQ.correctAnswer ? 'text-green-400' : 'text-red-400'
                }`}>
                  {selectedAnswer === currentQ.correctAnswer ? 'Correct!' : 'Incorrect'}
                </p>
                <p className="text-gray-300 text-sm">{currentQ.explanation}</p>
              </div>
            )}

            {showResult && (
              <button
                onClick={nextQuestion}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                {currentQuestion < quizQuestions.length - 1 ? 'Next Question' : 'See Results'}
              </button>
            )}
          </div>
        ) : (
          <div>
            <h3 className="text-xl font-semibold text-green-400 mb-4">Quiz Complete!</h3>
            <div className="text-center mb-6">
              <p className="text-3xl font-bold text-blue-300 mb-2">{score}/{quizQuestions.length}</p>
              <p className="text-gray-300">
                {score === quizQuestions.length 
                  ? "Perfect score! You know your rights well!"
                  : score >= quizQuestions.length * 0.75
                  ? "Great job! You have a good understanding of your rights."
                  : "Good effort! Review the material to improve your knowledge."}
              </p>
            </div>

            <div className="space-y-4 mb-6">
              {answers.map((answer, index) => (
                <div key={index} className="bg-gray-700 rounded-lg p-4">
                  <p className="text-sm text-gray-400 mb-2">Question {index + 1}</p>
                  <p className="text-gray-200 mb-2">{answer.question}</p>
                  <p className={`text-sm ${answer.correctAnswer ? 'text-green-400' : 'text-red-400'}`}>
                    {answer.correctAnswer ? '✓ Correct' : '✗ Incorrect'}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={resetQuiz}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Take Quiz Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RightsQuiz; 