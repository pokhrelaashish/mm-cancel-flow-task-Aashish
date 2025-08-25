'use client'

import { useRouter, useSearchParams } from 'next/navigation';

import { DM_Sans } from 'next/font/google';

const dm_sans = DM_Sans({ 
  subsets: ['latin'],
  weight: ['400', '700'] 
});

export default function ConfirmationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read the 'visaHelp' parameter from the URL. Default to 'no'.
  const needsVisaHelp = searchParams.get('visaHelp') === 'yes';

  const content = {
    // Content for when the user does NOT need visa help
    noHelp: {
      heading: "All done, your cancellation's been processed.",
      subheading: "We're stoked to hear you've landed a job and sorted your visa. Big congrats from the team. 🙌",
    },
    // Content for when the user NEEDS visa help
    needsHelp: {
      heading: "Your cancellation's all sorted, mate, no more charges.",
      message: {
        name: "Mihailo Bozic",
        email: "<mihailo@migratemate.co>",
        line1: "I'll be reaching out soon to help with the visa side of things.",
        line2: "We've got your back, whether it's questions, paperwork, or just figuring out your options.",
        line3: "Keep an eye on your inbox, I'll be in touch shortly.",
      }
    }
  };

  const pageContent = needsVisaHelp ? content.needsHelp : content.noHelp;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white shadow-lg rounded-xl">
        
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex justify-between md:justify-center items-start">
          
          {/* Title and Progress Bar */}
          <div className="flex flex-col md:items-center">
            <div className="text-sm font-bold text-gray-700 mb-2">Subscription Cancellation</div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-1.5 rounded-full bg-green-500"></div>
              <div className="w-6 h-1.5 rounded-full bg-green-500"></div>
              <div className="w-6 h-1.5 rounded-full bg-green-500"></div>
              <span className="text-xs text-gray-500 font-bold">Completed</span>
            </div>
          </div>

          {/* Close Button */}
          <button onClick={() => router.push('/')} className="text-gray-400 hover:text-gray-600 text-2xl font-bold md:absolute md:top-4 md:right-4">&times;</button>

        </div>

        <div className="flex flex-col md:flex-row">
          
          {/* Left Column: Confirmation Message */}
          <div className="p-10 md:p-12 flex flex-col flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{pageContent.heading}</h1>

            {needsVisaHelp ? (
              // "Needs Help" Message Block
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-3">
                  <img src="/images/mihailo-profile.jpeg" alt="Mihailo Bozic" className="w-10 h-10 rounded-full mr-3" />
                  <div>
                    <div className="font-bold text-sm text-gray-800">{pageContent.message.name}</div>
                    <div className="text-xs text-gray-500">{pageContent.message.email}</div>
                  </div>
                </div>
                <div className="space-y-3 text-gray-600">
                  <p>{pageContent.message.line1}</p>
                  <p>{pageContent.message.line2}</p>
                  <p className="font-semibold">{pageContent.message.line3}</p>
                </div>
              </div>
            ) : (
              // "No Help Needed" Message
              <p className="text-gray-600">{pageContent.subheading}</p>
            )}

            <button
              onClick={() => router.push('/')}
              className="w-full mt-auto py-3 text-sm font-bold text-white rounded-lg transition-colors bg-purple-600 hover:bg-purple-700"
            >
              Finish
            </button>
          </div>

          {/* Right Column: Image */}
          <div className="p-10 md:p-12 order-first md:order-last flex">
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