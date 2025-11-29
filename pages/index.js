import Head from 'next/head';
import Navigation from '@/components/Navigation';
import NewsCard from '@/components/NewsCard';
import BreakingNewsTicker from '@/components/BreakingNewsTicker';
import CategorySection from '@/components/CategorySection';
import Footer from '@/components/Footer';
import ErrorState from '@/components/ErrorState';
import { TrendingUp } from 'lucide-react';

export async function getServerSideProps() {
  try {
    // Fetch news from API route
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/news`);
    
    if (!response.ok) throw new Error('Failed to fetch news');
    
    const data = await response.json();
    
    return {
      props: {
        topStories: data.topStories || [],
        categories: data.categories || {},
        fetchedAt: new Date().toISOString(),
      }
    };
  } catch (error) {
    console.error('Error fetching news:', error);
    return {
      props: {
        topStories: [],
        categories: {},
        error: true
      }
    };
  }
}

export default function Home({ topStories, categories, error, fetchedAt }) {
  return (
    <>
      <Head>
        <title>Live हिंदुस्तान - ताज़ा समाचार, खबरें और अपडेट्स</title>
        <meta 
          name="description" 
          content="भारत की सबसे ताज़ा खबरें - राजनीति, व्यापार, मनोरंजन, खेल और अधिक। Live Hindustan पर पढ़ें हिंदी समाचार।" 
        />
        <meta property="og:title" content="Live हिंदुस्तान - भारत का प्रमुख समाचार पोर्टल" />
        <meta property="og:description" content="ताज़ा हिंदी समाचार और खबरें" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://livehindustan.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://livehindustan.com" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <BreakingNewsTicker />

        <main className="max-w-7xl mx-auto px-4 py-8">
          {error ? (
            <ErrorState message="समाचार लोड करने में समस्या आई। कृपया बाद में प्रयास करें।" />
          ) : (
            <>
              {/* Hero Section - Top Stories */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-6 flex items-center">
                  <TrendingUp className="w-8 h-8 mr-2 text-primary" />
                  मुख्य समाचार
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {topStories.slice(0, 3).map((article, idx) => (
                    <NewsCard
                      key={article.id}
                      article={article}
                      priority={idx === 0}
                      className={idx === 0 ? 'md:col-span-2 md:row-span-2' : ''}
                    />
                  ))}
                </div>
              </section>

              {/* Category Sections */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                <CategorySection 
                  title="राजनीति" 
                  articles={categories.politics || []} 
                  color="blue"
                />
                <CategorySection 
                  title="व्यापार" 
                  articles={categories.business || []} 
                  color="green"
                />
                <CategorySection 
                  title="मनोरंजन" 
                  articles={categories.entertainment || []} 
                  color="purple"
                />
              </div>

              {/* More Top Stories */}
              {topStories.length > 3 && (
                <section className="mb-12">
                  <h2 className="text-2xl font-bold mb-6">और खबरें</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {topStories.slice(3, 7).map((article) => (
                      <NewsCard key={article.id} article={article} size="small" />
                    ))}
                  </div>
                </section>
              )}

              {/* Timestamp */}
              <div className="text-center text-xs text-gray-500 mt-8">
                अंतिम अपडेट: {new Date(fetchedAt).toLocaleString('hi-IN')}
              </div>
            </>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
}