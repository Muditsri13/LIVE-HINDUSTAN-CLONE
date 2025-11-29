import { useState } from 'react';

export default function BreakingNewsTicker() {
  const [visible, setVisible] = useState(true);

  const breakingNews = [
    "बड़ी खबर: संसद में पास हुआ महत्वपूर्ण विधेयक",
    "शेयर बाजार में उछाल, सेंसेक्स 75,000 के पार",
    "भारत का ऐतिहासिक जीत, क्रिकेट वर्ल्ड कप जीता",
    "नई आर्थिक नीति की घोषणा, मध्यम वर्ग को राहत",
    "तकनीक क्षेत्र में नया यूनिकॉर्न, 1 बिलियन डॉलर वैल्यूएशन"
  ];

  const newsText = breakingNews.join(' • ');

  return (
    <>
      {visible && (
        <div className="bg-black text-white py-2 overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-4 flex items-center">
            {/* Breaking Badge */}
            <div className="flex items-center mr-4 flex-shrink-0">
              <span className="bg-primary px-3 py-1 text-xs font-bold animate-pulse rounded">
                ब्रेकिंग न्यूज
              </span>
            </div>

            {/* Scrolling Text */}
            <div className="flex-1 overflow-hidden">
              <div className="animate-marquee whitespace-nowrap">
                <span className="text-sm inline-block">
                  {newsText} • {newsText}
                </span>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setVisible(false)}
              className="ml-4 text-gray-400 hover:text-white transition-colors flex-shrink-0"
              aria-label="Close breaking news"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}