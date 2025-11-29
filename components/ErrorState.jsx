import { AlertCircle, RefreshCw } from 'lucide-react';

export default function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="bg-red-50 rounded-full p-6 mb-6">
        <AlertCircle className="w-16 h-16 text-red-600" />
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-2">
        कुछ गलत हो गया
      </h3>
      
      <p className="text-gray-600 text-center mb-6 max-w-md">
        {message || 'समाचार लोड करने में समस्या आई। कृपया बाद में प्रयास करें।'}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-md font-semibold transition-colors"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          पुनः प्रयास करें
        </button>
      )}

      <div className="mt-8 text-sm text-gray-500">
        <p>यदि समस्या बनी रहती है, तो कृपया हमसे संपर्क करें।</p>
      </div>
    </div>
  );
}