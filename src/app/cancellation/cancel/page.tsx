'use client'

import Link from 'next/link';

import { useRouter } from 'next/navigation';

import { DM_Sans } from 'next/font/google';

const lora = DM_Sans({ 
  subsets: ['latin'],
  weight: ['400', '700'] 
});

export default function BeforeCancelPage() {
  const router = useRouter();

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
              <Link 
                href="/cancel/success?reason=success"
                className="block w-full text-center p-3 text-gray-700 font-bold bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Yes, I've found a job
              </Link>
              <Link 
                href="/cancel/offer?reason=looking"
                className="block w-full text-center p-3 text-gray-700 font-bold bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Not yet - I'm still looking
              </Link>
            </div>
          </div>
          
        </div>
      </div>
    </div>

  );
}