'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DM_Sans } from 'next/font/google';

const dm_sans = DM_Sans({ 
  subsets: ['latin'],
  weight: ['400', '700'] 
});

export default function NoJobFeedbackPage() {
  const router = useRouter();
  
  // State to hold the answers for each question
  const [answers, setAnswers] = useState({
    rolesApplied: null,
    companiesEmailed: null,
    interviews: null,
  });

  // Check if all questions have been answered to enable the continue button
  const allQuestionsAnswered = Object.values(answers).every(answer => answer !== null);

  const [showError, setShowError] = useState(false);

  const handleSelection = (question: string, value: string) => {
    setAnswers(prev => ({ ...prev, [question]: value }));
    // Hide the error message as soon as the user starts answering
    if (showError) {
      setShowError(false);
    }
  };

  const handleSubmit = () => {
    if (allQuestionsAnswered) {
      // If validation passes, navigate to the next page
      router.push('/cancellation/nojob/reason');
    } else {
      // If validation fails, show the error message
      setShowError(true);
    }
  };

  const questionGroups = [
    {
      question: "How many roles did you apply for through Migrate Mate?",
      stateKey: "rolesApplied",
      options: ["0", "1 - 5", "6 - 20", "20+"],
    },
    {
      question: "How many companies did you email directly?",
      stateKey: "companiesEmailed",
      options: ["0", "1 - 5", "6 - 20", "20+"],
    },
    {
      question: "How many different companies did you interview with?",
      stateKey: "interviews",
      options: ["0", "1 - 2", "3 - 5", "5+"],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white shadow-lg rounded-xl">
        
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex flex-wrap justify-between items-center">
          <div className="order-2 md:order-1">
            <button onClick={() => router.back()} className="flex items-center text-sm font-bold text-gray-600 hover:text-gray-900">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
          </div>

          <div className="w-full md:w-auto order-1 md:order-2 flex flex-col mb-3 md:mb-0">
            <div className="text-sm font-bold text-gray-700 mb-2">Subscription Cancellation</div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-1.5 rounded-full bg-green-500"></div>
              <div className="w-6 h-1.5 rounded-full bg-gray-400"></div>
              <div className="w-6 h-1.5 rounded-full bg-gray-300"></div>
              <span className="text-xs text-gray-500 font-bold">Step 2 of 3</span>
            </div>
          </div>

          <div className="order-3">
            <button onClick={() => router.push('/')} className="text-gray-400 hover:text-gray-600 text-2xl font-bold">&times;</button>
          </div>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-2">
          
          {/* Left Column: Survey */}
          <div className="p-3 md:p-5 pt-4 md:pt-8 flex flex-col order-last md:order-first">
            <h1 className="text-2xl font-bold text-gray-900 md:hidden">
              What's the main reason for cancelling?
            </h1>

            {/* Desktop Heading (hidden on small screens) */}
            <h1 className="text-3xl font-bold text-gray-900 hidden md:block">
              Help us understand how you were using Migrate Mate.
            </h1>

            {showError && (
              <p className="text-sm text-red-600 my-4 font-bold">
                Mind letting us know why you're cancelling? It helps us understand your experience and improve the platform.*
              </p>
            )}
            
            {questionGroups.map(({ question, stateKey, options }) => (
              <div key={stateKey} className="mb-6">
                <h2 className="text-sm font-semibold text-gray-800 mb-3">{question}</h2>
                <div className="flex space-x-2">
                  {options.map(option => (
                    <button
                      key={option}
                      onClick={() => handleSelection(stateKey, option)}
                      className={`flex-1 py-2 px-3 text-sm rounded-md border transition-colors ${
                        answers[stateKey as keyof typeof answers] === option
                          ? 'bg-gray-800 text-white border-gray-800'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <div className="mt-auto space-y-3">
              <button
                onClick={() => router.push('/cancellation/nojob/offer-accepted')}
                className="w-full py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center"
              >
                <span>Get 50% off | </span>
                <span className="font-normal mx-1">$12.50</span>
                <span className="font-normal line-through text-green-200">$25</span>
              </button>

              <button
                onClick={handleSubmit}
                className="w-full py-3 text-sm font-bold rounded-lg transition-colors bg-gray-200 text-gray-400 disabled:cursor-not-allowed enabled:bg-gray-800 enabled:text-white"
              >
                Continue
              </button>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="md:p-5 p-3 order-first md:order-last flex">
            <img 
              src="/images/empire-state-compressed.jpg"
              alt="The Empire State Building at dusk"
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}