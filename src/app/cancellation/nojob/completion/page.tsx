'use client'

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { DM_Sans } from 'next/font/google';

const dm_sans = DM_Sans({ 
  subsets: ['latin'],
  weight: ['400', '700'] 
});

export default function CancellationConfirmedPage() {
  const router = useRouter();
  
  // State to hold the dynamic end date
  const [endDate, setEndDate] = useState('XX date');

  // useEffect to calculate the date when the component loads
  useEffect(() => {
    const futureDate = new Date();
    futureDate.setDate(new Date().getDate() + 30); // Calculate 30 days from now

    // Format the date (e.g., "September 24, 2025")
    const formattedDate = futureDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    setEndDate(formattedDate);
  }, []); // The empty array ensures this runs only once

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white shadow-lg rounded-xl">
        
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <div className="flex-1 md:text-center">
            <h3 className="text-sm font-bold text-gray-700">Subscription Cancellation</h3>
          </div>
          <button 
            onClick={() => router.push('/')}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold">&times;</button>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-2">
          
          {/* Left Column: Confirmation Message */}
          <div className="p-3 md:p-5 pt-4 md:pt-8 flex flex-col order-last md:order-first">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Sorry to see you go, mate.
            </h1>
            <h2 className="text-3xl font-bold text-gray-700 mb-6">
              Thanks for being with us, and you're always welcome back.
            </h2>
            
            <div className="text-sm text-gray-600 space-y-2 mb-8">
              <p>Your subscription is set to end on <span className="font-bold">{endDate}</span>.</p>
              <p>You'll still have full access until then. No further charges after that.</p>
              <p className="text-xs text-gray-500 mt-2">
                Changed your mind? You can reactivate anytime before your end date.
              </p>
            </div>

            <button
              onClick={() => router.push('/jobs')} // Or wherever your jobs page is
              className="w-full mt-auto py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-colors"
            >
              Back to Jobs
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