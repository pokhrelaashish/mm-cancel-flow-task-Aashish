'use client'

import { useRouter } from 'next/navigation';
import { DM_Sans } from 'next/font/google';

const dm_sans = DM_Sans({ 
  subsets: ['latin'],
  weight: ['400', '700'] 
});

export default function NoJobOfferPage() {
  const router = useRouter();

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
          
          {/* Left Column: Offer Details */}
          <div className="p-3 md:p-5 flex flex-col flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              We built this to help you land the job, this makes it a little easier.
            </h1>
            <p className="text-gray-600 mb-8 font-bold">
              We've been there and we're here to help you.
            </p>
            
            {/* Offer Box */}
            <div className="p-6 border-2 border-purple-400 bg-purple-50 rounded-lg text-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Here's 50% off until you find a job.</h2>
              <p className="my-2">
                <span className="text-2xl font-bold text-purple-600">$12.50/month</span>
                <span className="ml-2 text-gray-500 line-through">$25/month</span>
              </p>
              <button
                onClick={() => router.push('/cancellation/nojob/offer-accepted')}
                className="w-full py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors">
                Get 50% off
              </button>
              <p className="text-xs text-gray-500 mt-2">You wont be charged until your next billing date.</p>
            </div>

            <button
              onClick={() => router.push('/cancellation/nojob/feedback')}
              className="w-full py-3 border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-100 transition-colors"
            >
              No thanks
            </button>
          </div>

          {/* Right Column: Image */}
          <div className="p-3 md:p-5 order-first md:order-last flex">
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