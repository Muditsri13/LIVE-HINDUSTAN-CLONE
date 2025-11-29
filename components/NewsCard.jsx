import Image from 'next/image';
import Link from 'next/link';
import { Calendar } from 'lucide-react';

export default function NewsCard({ article, size = 'medium', priority = false, className = '' }) {
  const sizeClasses = {
    large: 'h-64 md:h-96',
    medium: 'h-48',
    small: 'h-40'
  };

  const titleClasses = {
    large: 'text-xl md:text-2xl',
    medium: 'text-lg',
    small: 'text-base'
  };

  return (
    <Link href={`/article/${article.id}`} className={`group ${className}`}>
      <article className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
        {/* Image Container */}
        <div className={`relative ${sizeClasses[size]} overflow-hidden`}>
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400';
            }}
          />
          
          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className="bg-primary text-white px-3 py-1 text-xs font-semibold rounded-full shadow-md">
              {article.category}
            </span>
          </div>

          {/* Gradient Overlay for better text readability on large cards */}
          {size === 'large' && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          <h3 className={`font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors ${titleClasses[size]}`}>
            {article.title}
          </h3>

          {size !== 'small' && article.summary && (
            <p className="text-gray-600 text-sm line-clamp-2 mb-3 flex-1">
              {article.summary}
            </p>
          )}

          {/* Metadata */}
          <div className="flex items-center justify-between text-xs text-gray-500 mt-auto">
            <div className="flex items-center">
              <Calendar className="w-3 h-3 mr-1" />
              <time dateTime={article.date}>
                {new Date(article.date).toLocaleDateString('hi-IN', {
                  day: 'numeric',
                  month: 'short'
                })}
              </time>
            </div>
            
            {article.author && size !== 'small' && (
              <span className="truncate ml-2">{article.author}</span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}