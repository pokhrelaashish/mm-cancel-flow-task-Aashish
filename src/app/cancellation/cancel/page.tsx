'use client'

import Link from 'next/link';

import { useRouter } from 'next/navigation';

import { useState } from 'react';

import { DM_Sans } from 'next/font/google';

const dm_sans = DM_Sans({ 
  subsets: ['latin'],
  weight: ['400', '700'] 
});

const mockUser = {
  email: 'user@example.com',
  id: '1'
};

const mockSubscriptionData = {
  status: 'active',
  isTrialSubscription: false,
  cancelAtPeriodEnd: false,
  currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
  monthlyPrice: 25,
  isUCStudent: false,
  hasManagedAccess: false,
  managedOrganization: null,
  downsellAccepted: false
};

export default function BeforeCancelPage() {
  const router = useRouter();

  const [isCancelling, setIsCancelling] = useState(false);

  const handleCancellationClick = async () => {
    setIsCancelling(true);
    try {
      const response = await fetch('/api/user/ab-testing-variant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userId: mockUser.id,
          subscriptionId: mockSubscriptionData.id
        }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }
      
      const { variant } = await response.json();

      if (variant === 'B') {
        // Variant B: Go to the downsell offer page
        // Note: The downsell page is at /cancellation/downsell
        router.push(`/cancellation/downsell?price=${mockSubscriptionData.monthlyPrice}`);
      } else {
        // Variant A: Go directly to the standard cancellation flow
        router.push('/cancellation/cancel');
      }

    } catch (err) {
      console.error('Failed to determine A/B test variant:', err);
      // Default to the standard flow in case of an error
      router.push('/cancellation/cancel');
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <div className="flex-1 md:text-center">
            <h3 className="text-sm font-bold text-gray-700">Subscription Cancellation</h3>
          </div>
          <button 
            onClick={() => router.push('/')}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold">&times;</button>
        </div>
        <div className="flex flex-col md:grid md:grid-cols-2">

          {/* Right Column: Image */}
          <div className="md:p-5 p-3 order-first md:order-last flex">
            <img 
              src="/images/empire-state-compressed.jpg"
              alt="The Empire State Building at dusk"
              className="w-full h-auto md:h-full md:w-full object-cover rounded-lg"
            />
          </div>
          
          {/* Left Column: Text and Buttons */}
          <div className="p-3 md:p-5 pt-4 md:pt-8 flex flex-col order-last md:order-first">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Hey mate, <br />
              Quick one before you go.
            </h1>
            <h2 className="text-2xl font-bold italic text-gray-800 mb-4">
              Have you found a job yet?
            </h2>
            <p className="text-gray-600 font-bold mb-8 text-sm">
              Whatever your answer, we just want to help you take the next step. With visa support, or by hearing how we can do better.
            </p>
            
            {/* Action Buttons */}
            <div className="space-y-3 mt-auto">
              <button
                onClick={() => router.push('/cancellation/cancel/success')}
                className="block w-full text-center p-3 text-gray-700 font-bold bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                
                <span className="text-gray-700 font-bold">Yes, I've found a job</span>
              </button>
              <button
                onClick={handleCancellationClick}
                disabled={isCancelling}
                className="block w-full text-center p-3 text-gray-700 font-bold bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                
                <span className="text-gray-700 font-bold">Not yet - I'm still looking</span>
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </div>

  );
}