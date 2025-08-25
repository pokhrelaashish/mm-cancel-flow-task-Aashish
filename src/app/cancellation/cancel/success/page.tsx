'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { DM_Sans } from 'next/font/google';

const dm_sans = DM_Sans({ 
  subsets: ['latin'],
  weight: ['400', '700'] 
});

export default function CancellationSurveyPage() {
  const router = useRouter();
  
  // State to hold the answers for each question
  const [answers, setAnswers] = useState({
    foundWithMigrateMate: null,
    rolesApplied: null,
    companiesEmailed: null,
    interviews: null,
  });

  // Function to update the state when a button is clicked
  const handleSelection = (question: string, value: string) => {
    setAnswers(prev => ({ ...prev, [question]: value }));
  };

  // Check if all questions have been answered to enable the continue button
  const allQuestionsAnswered = Object.values(answers).every(answer => answer !== null);

  const questionGroups = [
    {
      question: "Did you find this job with MigrateMate?*",
      stateKey: "foundWithMigrateMate",
      options: ["Yes", "No"],
    },
    {
      question: "How many roles did you apply for through Migrate Mate?*",
      stateKey: "rolesApplied",
      options: ["0", "1 - 5", "6 - 20", "20+"],
    },
    {
      question: "How many companies did you email directly?*",
      stateKey: "companiesEmailed",
      options: ["0", "1 - 5", "6 - 20", "20+"],
    },
    {
      question: "How many different companies did you interview with?*",
      stateKey: "interviews",
      options: ["0", "1 - 2", "3 - 5", "5+"],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white shadow-lg rounded-xl">
        
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex flex-wrap justify-between items-center">

          {/* Back Button (Order 2 on mobile, 1 on desktop) */}
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
              <div className="w-6 h-1.5 rounded-full bg-gray-400"></div>
              <div className="w-6 h-1.5 rounded-full bg-gray-300"></div>
              <div className="w-6 h-1.5 rounded-full bg-gray-300"></div>
              <span className="text-xs text-gray-500 font-bold">Step 1 of 3</span>
            </div>
          </div>

          <div className="order-3">
            <button onClick={() => router.push('/')} className="text-gray-400 hover:text-gray-600 text-2xl font-bold">&times;</button>
          </div>

        </div>

        <div className="flex flex-col md:grid md:grid-cols-2">
          
          <div className="p-3 md:p-5 pt-4 md:pt-8 flex flex-col order-last md:order-first">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Congrats on the new role! 🎉</h1>
            
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

            <button
              disabled={!allQuestionsAnswered}
              onClick={() => router.push('/cancellation/cancel/feedback')}
              className="w-full mt-4 py-3 text-sm font-bold text-white rounded-lg transition-colors bg-gray-300 disabled:cursor-not-allowed enabled:bg-gray-800 enabled:hover:bg-gray-900"
            >
              Continue
            </button>
          </div>

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