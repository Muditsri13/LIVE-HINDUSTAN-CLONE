import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Calendar, Share2, ArrowLeft } from 'lucide-react';

export async function getServerSideProps({ params }) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/article/${params.id}`);
    
    if (!response.ok) throw new Error('Article not found');
    
    const article = await response.json();
    
    return {
      props: { article }
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

export default function ArticlePage({ article }) {
  const router = useRouter();

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.summary,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    }
  };

  return (
    <>
      <Head>
        <title>{article.title} - Live हिंदुस्तान</title>
        <meta name="description" content={article.summary} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.summary} />
        <meta property="og:image" content={article.image} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={article.date} />
        <meta property="article:section" content={article.category} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href={`https://livehindustan.com/article/${article.id}`} />
        
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NewsArticle",
              "headline": article.title,
              "image": article.image,
              "datePublished": article.date,
              "dateModified": article.date,
              "author": {
                "@type": "Organization",
                "name": "Live Hindustan"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Live Hindustan",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://livehindustan.com/logo.png"
                }
              },
              "description": article.summary
            })
          }}
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Navigation />

        <main className="max-w-4xl mx-auto px-4 py-8">
          {/* Back Button */}
          <Link 
            href="/"
            className="inline-flex items-center text-primary hover:text-primary-dark mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            मुख्य पृष्ठ पर वापस जाएं
          </Link>

          <article className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Category Badge */}
            <div className="px-8 pt-8">
              <span className="inline-block bg-primary text-white px-4 py-1 text-sm font-semibold rounded-full">
                {article.category}
              </span>
            </div>

            {/* Article Header */}
            <header className="px-8 pt-4 pb-6">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                {article.title}
              </h1>
              
              <div className="flex items-center justify-between flex-wrap gap-4 text-gray-600">
                <div className="flex items-center text-sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  <time dateTime={article.date}>
                    {new Date(article.date).toLocaleDateString('hi-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </time>
                </div>
                
                <button
                  onClick={handleShare}
                  className="flex items-center text-sm hover:text-primary transition-colors"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  शेयर करें
                </button>
              </div>
            </header>

            {/* Featured Image */}
            <div className="relative w-full h-96 md:h-[500px]">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
            </div>

            {/* Article Content */}
            <div className="px-8 py-8">
              {/* Summary/Lead */}
              <p className="text-xl text-gray-700 leading-relaxed mb-6 font-medium">
                {article.summary}
              </p>

              {/* Main Content */}
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  {article.content || `यह एक विस्तृत समाचार लेख है। वास्तविक परिदृश्य में, यहाँ पूरा article content होगा जो API से fetch किया जाएगा।`}
                </p>
                
                <p className="text-gray-700 leading-relaxed mb-4">
                  समाचार की पूरी जानकारी यहाँ प्रदर्शित होगी। Next.js के dynamic routing के माध्यम से, 
                  प्रत्येक article का अपना SEO-optimized URL होगा।
                </p>

                <p className="text-gray-700 leading-relaxed mb-4">
                  इस implementation में Image optimization, metadata, और structured data 
                  सभी शामिल हैं जो search engines के लिए बेहतर visibility प्रदान करते हैं।
                </p>
              </div>

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="mt-8 pt-6 border-t">
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </article>

          {/* Related Articles Section */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6">संबंधित समाचार</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Related articles would be loaded here */}
              <p className="text-gray-600 col-span-3 text-center py-8">
                संबंधित समाचार लोड हो रहे हैं...
              </p>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}