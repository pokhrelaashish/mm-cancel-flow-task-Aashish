'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DM_Sans } from 'next/font/google';

const dm_sans = DM_Sans({ 
  subsets: ['latin'],
  weight: ['400', '700'] 
});

export default function FinalReasonPage() {
  const router = useRouter();
  
  // State to hold the selected cancellation reason
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  // State to show a validation error if the user tries to proceed without a selection
  const [showError, setShowError] = useState(false);
  const [followUpAnswer, setFollowUpAnswer] = useState('');

  const cancellationReasons = [
    {
      id: "too-expensive",
      text: "Too expensive",
      followUp: {
        type: "text",
        question: "What would be the maximum you would be willing to pay?*",
      },
    },
    {
      id: "not-helpful",
      text: "Platform not helpful",
      followUp: {
        type: "textarea",
        question: "What can we change to make the platform more helpful?*",
        validation: "Please enter at least 25 characters so we can understand your feedback*",
      },
    },
    {
      id: "not-relevant",
      text: "Not enough relevant jobs",
      followUp: {
        type: "textarea",
        question: "In which way can we make the jobs more relevant?*",
        validation: "Please enter at least 25 characters so we can understand your feedback*",
      },
    },
    {
      id: "not-move",
      text: "Decided not to move",
      followUp: {
        type: "textarea",
        question: "What changed for you to decide to not move?*",
        validation: "Please enter at least 25 characters so we can understand your feedback*",
      },
    },
    {
      id: "other",
      text: "Other",
      followUp : {
        type: "textarea",
        question: "What would have helped you the most?*",
        validation: "Please enter at least 25 characters so we can understand your feedback*",
      },
    },
  ];

  const handleComplete = () => {
    if (selectedReason) {
      // Proceed to the final cancellation confirmation
      router.push('/cancellation/nojob/completion');
    } else {
      // Show the error message
      setShowError(true);
    }
  };

  const currentReasonObject = cancellationReasons.find(r => r.text === selectedReason);

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
              <div className="w-6 h-1.5 rounded-full bg-green-500"></div>
              <div className="w-6 h-1.5 rounded-full bg-gray-400"></div>
              <span className="text-xs text-gray-500 font-bold">Step 3 of 3</span>
            </div>
          </div>

          <div className="order-3">
            <button onClick={() => router.push('/')} className="text-gray-400 hover:text-gray-600 text-2xl font-bold">&times;</button>
          </div>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-2">
          
          {/* Left Column: Cancellation Reasons */}
          <div className="p-3 md:p-5 pt-4 md:pt-8 flex flex-col order-last md:order-first">
            <h1 className="text-3xl font-bold text-gray-900">What's the main reason for cancelling?</h1>
            <p className="text-gray-600 mt-2 mb-4 font-bold">Please take a minute to let us know why:</p>
            
            {showError && (
              <p className="text-sm text-red-600 mb-4 font-bold">
                To help us understand your experience, please select a reason for cancelling*
              </p>
            )}

            {/* Radio Button Options */}
            <div className="space-y-4 mb-8 font-bold">
              {cancellationReasons.map((reason) => (
                <div key={reason.id}>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="cancellation-reason"
                      value={reason.text}
                      checked={selectedReason === reason.text}
                      onChange={() => setSelectedReason(reason.text)}
                      className="h-4 w-4 text-gray-800 border-gray-300 focus:ring-gray-700"
                    />
                    <span className="ml-3 text-sm text-gray-700">{reason.text}</span>
                  </label>

                  {/* 3. Conditionally render the follow-up question */}
                  {selectedReason === reason.text && reason.followUp && (
                    <div className="mt-2 ml-7">
                      <label htmlFor="follow-up" className="text-xs text-gray-600">
                        {reason.followUp.question}
                      </label>
                      {reason.followUp.validation && (
                        <p className="text-xs text-red-600 mt-1">
                          {reason.followUp.validation}
                        </p>
                      )}

                      {reason.followUp.type === 'textarea' ? (
                        <>
                          <textarea
                            id="follow-up"
                            value={followUpAnswer}
                            onChange={(e) => setFollowUpAnswer(e.target.value)}
                            placeholder="Your feedback..."
                            className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-gray-800 focus:border-transparent transition placeholder:text-gray-500 text-gray-900"
                          />
                          <div className="text-right text-xs text-gray-500 mt-1">
                            Min 25 characters ({followUpAnswer.length}/25)
                          </div>
                        </>
                        ) : (
                        <input
                          id="follow-up"
                          type="text"
                          value={followUpAnswer}
                          onChange={(e) => setFollowUpAnswer(e.target.value)}
                          className="mt-1 w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-gray-800 focus:border-transparent transition text-gray-900"
                        />
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

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
                onClick={handleComplete}
                // disabled={selectedReason === null}
                className="w-full py-3 text-sm font-bold rounded-lg transition-colors bg-gray-200 text-gray-400 disabled:cursor-not-allowed enabled:bg-gray-800 enabled:text-white"
              >
                Complete cancellation
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