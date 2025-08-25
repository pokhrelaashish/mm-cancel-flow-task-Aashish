'use client'

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { DM_Sans } from 'next/font/google';

const dm_sans = DM_Sans({ 
  subsets: ['latin'],
  weight: ['400', '700'] 
});

export default function FinalStepPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read the 'foundWith' parameter from the URL
  const foundWithMigrateMate = searchParams.get('foundWith') === 'yes';

  // State to manage the radio button selection
  const [hasLawyer, setHasLawyer] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [visaInfo, setVisaInfo] = useState('');

  const isButtonDisabled = 
    hasLawyer === null ||
    (hasLawyer === false && visaInfo.trim() === '');

  const handleCompleteCancellation = async () => {
    if (isButtonDisabled) return; // Prevent submission if no answer

    setIsSubmitting(true);

    // --- 2. Access the user's "yes" or "no" answer here ---
    const needsHelp = hasLawyer === false;

    // TODO: Replace this with your actual API call to your backend
    // await fetch('/api/cancel-subscription', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(finalAnswer),
    // });

    // Simulate API delay
    setTimeout(() => {
      setIsSubmitting(false);
      // Navigate to a final confirmation or homepage
      router.push(`/cancellation/cancel/confirmed?visaHelp=${needsHelp ? 'yes' : 'no'}`); 
    }, 1500);
  };

  const content = {
    yes: {
      heading: "We helped you land the job, now let's help you secure your visa.",
      subheading: "Is your company providing an immigration lawyer to help with your visa?",
    },
    no: {
      heading: "You landed the job! That's what we live for.",
      subheading: "Even if it wasn't through Migrate Mate, let us help get your visa sorted.",
      question: "Is your company providing an immigration lawyer to help with your visa?",
    },
  };

  const immigrationContent = {

    yes: {
      question: "What visa will you be applying for?*"
    },
    no: {
      prelude: "We can connect you with one of our trusted partners.",
      question: "What visa would you like to apply for?*"
    },

  };

  const pageContent = foundWithMigrateMate ? content.yes : content.no;

  const currentImmigrationContent = hasLawyer === false ? immigrationContent.no : immigrationContent.yes;

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
          
          {/* Left Column: Final Question */}
          <div className="p-3 md:p-5 pt-4 md:pt-8 flex flex-col order-last md:order-first">
            <h1 className="text-3xl font-bold text-gray-700 mb-4">{pageContent.heading}</h1>
            <p className="text-sm text-gray-700 mb-6 font-bold">{pageContent.subheading}</p>
            
            {/* Radio Button Question */}
            <div className="space-y-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="lawyer"
                  checked={hasLawyer === true}
                  onChange={() => setHasLawyer(true)}
                  className="h-4 w-4 text-gray-800 border-gray-300 focus:ring-gray-700"
                />
                <span className="ml-3 text-sm text-gray-700 font-bold">Yes</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="lawyer"
                  checked={hasLawyer === false}
                  onChange={() => setHasLawyer(false)}
                  className="h-4 w-4 text-gray-800 border-gray-300 focus:ring-gray-700"
                />
                <span className="ml-3 text-sm text-gray-700 font-bold">No</span>
              </label>
            </div>

            {hasLawyer !== null && (
              <div className="mt-4 border-t pt-4 mb-6">
                {/* Conditionally show the prelude text for the "No" case */}
                {hasLawyer === false && (
                  <p className="text-sm text-gray-700 mb-4 font-bold">
                    {currentImmigrationContent.prelude}
                  </p>
                )}
                <label htmlFor="help" className="text-sm font-bold text-gray-700">
                  {currentImmigrationContent.question}
                </label>
                <textarea
                  value={visaInfo}
                  onChange={(e) => setVisaInfo(e.target.value)}
                  className="mt-2 w-full p-2 border border-gray-300 rounded-md text-gray-900"
                />
              </div>
            )}

            <button
              disabled={hasLawyer === null}
              onClick={handleCompleteCancellation}
              className="w-full mt-auto py-3 text-sm font-bold text-white rounded-lg transition-colors bg-gray-300 disabled:cursor-not-allowed enabled:bg-gray-800 enabled:hover:bg-gray-900"
            >
              Complete cancellation
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