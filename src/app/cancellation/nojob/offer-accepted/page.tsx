'use client'

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { DM_Sans } from 'next/font/google';

const dm_sans = DM_Sans({ 
  subsets: ['latin'],
  weight: ['400', '700'] 
});

export default function OfferAcceptedPage() {
  const router = useRouter();

  const [subscriptionData, setSubscriptionData] = useState({
    daysLeft: 'XX',
    startDate: 'XX date',
    newPrice: '$12.50',
  });

  // useEffect runs when the component mounts on the client-side
  useEffect(() => {
    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + 30); // Calculate 30 days from now

    // Format the date (e.g., "September 24, 2025")
    const formattedDate = futureDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    setSubscriptionData(prevData => ({
      ...prevData,
      daysLeft: '30',
      startDate: formattedDate,
    }));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white shadow-lg rounded-xl">
        
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <div className="flex-1 text-center">
            <h3 className="text-sm font-bold text-gray-700">Subscription continued</h3>
          </div>
          <button onClick={() => router.push('/')} className="text-gray-400 hover:text-gray-600 text-2xl font-bold">&times;</button>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-2">
          
          {/* Left Column: Confirmation Message */}
          <div className="p-3 md:p-5 flex flex-col flex-1">
            <h1 className="text-3xl font-bold text-gray-700 mb-4">
              Great choice, mate!
            </h1>
            <h2 className="text-3xl font-bold mb-6">
              <span className="text-gray-700">You're still on the path to your dream role. </span>
              <span className="text-purple-600">Let's make it happen together!</span>
            </h2>
            
            <div className="text-sm text-gray-700 space-y-2 mb-8 font-bold">
              <p>You've got {subscriptionData.daysLeft} days left on your current plan.</p>
              <p>Starting from {subscriptionData.startDate}, your monthly payment will be {subscriptionData.newPrice}.</p>
              <p className="text-xs text-gray-700 mt-2 font-bold italic">You can cancel anytime before then.</p>
            </div>

            <button
              onClick={() => router.push('/')} // Or wherever your main app dashboard is
              className="w-full mt-auto py-3 bg-purple-600 text-white font-bold  rounded-lg hover:bg-purple-700 transition-colors"
            >
              Land your dream role
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