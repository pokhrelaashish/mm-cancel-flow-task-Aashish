'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { DM_Sans } from 'next/font/google';

const dm_sans = DM_Sans({ 
  subsets: ['latin'],
  weight: ['400', '700'] 
});

export default function FeedbackPage() {
  const router = useRouter();
  
  // State to hold the feedback text
  const [feedback, setFeedback] = useState('');
  
  // Minimum characters required to continue
  const minChars = 25;
  const isContinueDisabled = feedback.length < minChars;

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
          
          {/* Left Column: Feedback Form */}
          <div className="p-3 md:p-5 pt-4 md:pt-8 flex flex-col order-last md:order-first">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              What's one thing you wish we could've helped you with?
            </h1>
            <p className="text-sm text-gray-600 mb-6 font-bold">
              We're always looking to improve, your thoughts can help us make Migrate Mate more useful for others.*
            </p>
            
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Your feedback..."
              className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-gray-800 focus:border-transparent transition placeholder:text-gray-500 text-gray-900"
            />
            <div className="text-right text-xs text-gray-500 mt-1">
              Min {minChars} characters ({feedback.length}/{minChars})
            </div>

            <button
              disabled={isContinueDisabled}
              onClick={() => router.push('/cancellation/cancel/immigration')}
              className="w-full mt-auto py-3 text-sm font-bold text-white rounded-lg transition-colors bg-gray-300 disabled:cursor-not-allowed enabled:bg-gray-800 enabled:hover:bg-gray-900"
            >
              Continue
            </button>
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