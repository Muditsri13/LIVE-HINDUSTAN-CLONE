import Link from 'next/link';
import { ChevronRight, Calendar } from 'lucide-react';

export default function CategorySection({ title, articles, color = 'red' }) {
  const colorClasses = {
    red: 'border-red-600 text-red-600',
    blue: 'border-blue-600 text-blue-600',
    green: 'border-green-600 text-green-600',
    purple: 'border-purple-600 text-purple-600',
    orange: 'border-orange-600 text-orange-600'
  };

  if (!articles || articles.length === 0) {
    return (
      <section>
        <h2 className={`text-2xl font-bold mb-4 pb-2 border-b-4 ${colorClasses[color]}`}>
          {title}
        </h2>
        <p className="text-gray-500 text-center py-8">कोई समाचार उपलब्ध नहीं</p>
      </section>
    );
  }

  return (
    <section>
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className={`text-2xl font-bold pb-2 border-b-4 ${colorClasses[color]} flex-1`}>
          {title}
        </h2>
        <Link 
          href={`/category/${title.toLowerCase()}`}
          className={`text-sm ${colorClasses[color]} hover:opacity-80 transition-opacity flex items-center`}
        >
          सभी देखें
          <ChevronRight className="w-4 h-4 ml-1" />
        </Link>
      </div>

      {/* Articles List */}
      <div className="space-y-4">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/article/${article.id}`}
            className="block pb-4 border-b border-gray-200 last:border-0 hover:bg-gray-50 p-3 rounded transition-colors group"
          >
            <article>
              {/* Title */}
              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                {article.title}
              </h3>

              {/* Summary */}
              {article.summary && (
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                  {article.summary}
                </p>
              )}

              {/* Metadata */}
              <div className="flex items-center text-xs text-gray-500">
                <Calendar className="w-3 h-3 mr-1" />
                <time dateTime={article.date}>
                  {new Date(article.date).toLocaleDateString('hi-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </time>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {/* View More Link */}
      {articles.length >= 3 && (
        <div className="mt-4 text-center">
          <Link
            href={`/category/${title.toLowerCase()}`}
            className={`inline-flex items-center ${colorClasses[color]} hover:opacity-80 transition-opacity text-sm font-semibold`}
          >
            और पढ़ें
            <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      )}
    </section>
  );
}