'use client'

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { DM_Sans } from 'next/font/google';

const dm_sans = DM_Sans({ 
  subsets: ['latin'],
  weight: ['400', '700'] 
});

interface DownsellOfferProps {
  originalPrice?: number;
  discountAmount?: number;
}

export default function DownsellOfferPage({ 
  originalPrice = 25, 
  discountAmount = 10 
}: DownsellOfferProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [isAccepting, setIsAccepting] = useState(false);
  const [isDeclining, setIsDeclining] = useState(false);
  
  const discountedPrice = Math.max(originalPrice - discountAmount, 0);
  const discountPercentage = Math.round((discountAmount / originalPrice) * 100);
  
  // Get context from URL params
  const fromPath = searchParams.get('from') || 'nojob';
  const nextPath = searchParams.get('next'); // For "found job" flow
  
  const handleAcceptOffer = async () => {
    setIsAccepting(true);
    
    try {
      // Log the downsell acceptance
      await logDownsellAction('accepted', {
        originalPrice,
        discountedPrice,
        discountAmount,
        fromPath
      });
      
      // Simulate processing delay
      setTimeout(() => {
        setIsAccepting(false);
        // Redirect back to profile page - no actual payment processing needed
        router.push('/');
      }, 1500);
    } catch (error) {
      console.error('Error logging downsell acceptance:', error);
      setIsAccepting(false);
      // Still redirect on error
      router.push('/');
    }
  };

  const handleDeclineOffer = async () => {
    setIsDeclining(true);
    
    try {
      // Log the downsell decline
      await logDownsellAction('declined', {
        originalPrice,
        discountedPrice,
        discountAmount,
        fromPath
      });
      
      // Continue with cancellation flow based on original path
      if (fromPath === 'nojob') {
        router.push('/cancellation/nojob/feedback');
      } else if (fromPath === 'cancel' && nextPath === 'success') {
        router.push('/cancellation/cancel/success');
      } else {
        router.push('/cancellation/cancel/feedback');
      }
    } catch (error) {
      console.error('Error logging downsell decline:', error);
      // Continue flow even on error
      if (fromPath === 'nojob') {
        router.push('/cancellation/nojob/feedback');
      } else {
        router.push('/cancellation/cancel/feedback');
      }
    } finally {
      setIsDeclining(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white shadow-lg rounded-xl">
        
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex flex-wrap justify-between items-center">

          {/* Back Button */}
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
              <span className="text-xs text-gray-500 font-bold">Special Offer</span>
            </div>
          </div>

          <div className="order-3">
            <button onClick={() => router.push('/')} className="text-gray-400 hover:text-gray-600 text-2xl font-bold">&times;</button>
          </div>

        </div>

        <div className="flex flex-col md:grid md:grid-cols-2">
          
          {/* Left Column: Downsell Offer */}
          <div className="p-3 md:p-5 flex flex-col flex-1 order-last md:order-first">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Wait! Before you go...
            </h1>
            <p className="text-gray-600 mb-8 font-bold">
              We'd love to keep helping you on your journey. Here's a special offer just for you.
            </p>
            
            {/* Offer Box */}
            <div className="p-6 border-2 border-green-400 bg-green-50 rounded-lg text-center mb-6">
              <div className="mb-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  Limited Time Offer
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Get ${discountAmount} off your subscription
              </h2>
              <p className="mb-4">
                <span className="text-3xl font-bold text-green-600">${discountedPrice}/month</span>
                <span className="ml-2 text-gray-500 line-through text-lg">${originalPrice}/month</span>
              </p>
              <p className="text-sm text-gray-600 mb-4">
                That's {discountPercentage}% off your current plan. This offer applies to your next billing cycle.
              </p>
              
              <button
                onClick={handleAcceptOffer}
                disabled={isAccepting || isDeclining}
                className="w-full py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-3"
              >
                {isAccepting ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </div>
                ) : (
                  `Accept Offer - Save $${discountAmount}/month`
                )}
              </button>
              
              <p className="text-xs text-gray-500">
                No changes to your current billing cycle. Discount starts on your next renewal.
              </p>
            </div>

            <button
              onClick={handleDeclineOffer}
              disabled={isAccepting || isDeclining}
              className="w-full py-3 border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDeclining ? 'Processing...' : 'No thanks, continue with cancellation'}
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

// Function to log downsell actions via API
async function logDownsellAction(
  action: 'accepted' | 'declined', 
  data: {
    originalPrice: number;
    discountedPrice: number;
    discountAmount: number;
    fromPath: string;
  }
) {
  try {
    const response = await fetch('/api/user/ab-test-variant', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, ...data })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error logging downsell action:', error);
    throw error;
  }
}