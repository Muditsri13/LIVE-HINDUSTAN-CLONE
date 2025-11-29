import Head from 'next/head';
import Navigation from '../components/Navigation';
import NewsCard from '../components/NewsCard';
import BreakingNewsTicker from '../components/BreakingNewsTicker';
import CategorySection from '../components/CategorySection';
import Footer from '../components/Footer';
import ErrorState from '../components/ErrorState';
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
        <title>Live à¤¹à¤¿à¤‚à¤¦à¥à¤¸à¥à¤¤à¤¾à¤¨ - à¤¤à¤¾à¤œà¤¼à¤¾ à¤¸à¤®à¤¾à¤šà¤¾à¤°, à¤–à¤¬à¤°à¥‡à¤‚ à¤”à¤° à¤…à¤ªà¤¡à¥‡à¤Ÿà¥à¤¸</title>
        <meta 
          name="description" 
          content="à¤­à¤¾à¤°à¤¤ à¤•à¥€ à¤¸à¤¬à¤¸à¥‡ à¤¤à¤¾à¤œà¤¼à¤¾ à¤–à¤¬à¤°à¥‡à¤‚ - à¤°à¤¾à¤œà¤¨à¥€à¤¤à¤¿, à¤µà¥à¤¯à¤¾à¤ªà¤¾à¤°, à¤®à¤¨à¥‹à¤°à¤‚à¤œà¤¨, à¤–à¥‡à¤² à¤”à¤° à¤…à¤§à¤¿à¤•à¥¤ Live Hindustan à¤ªà¤° à¤ªà¤¢à¤¼à¥‡à¤‚ à¤¹à¤¿à¤‚à¤¦à¥€ à¤¸à¤®à¤¾à¤šà¤¾à¤°à¥¤" 
        />
        <meta property="og:title" content="Live à¤¹à¤¿à¤‚à¤¦à¥à¤¸à¥à¤¤à¤¾à¤¨ - à¤­à¤¾à¤°à¤¤ à¤•à¤¾ à¤ªà¥à¤°à¤®à¥à¤– à¤¸à¤®à¤¾à¤šà¤¾à¤° à¤ªà¥‹à¤°à¥à¤Ÿà¤²" />
        <meta property="og:description" content="à¤¤à¤¾à¤œà¤¼à¤¾ à¤¹à¤¿à¤‚à¤¦à¥€ à¤¸à¤®à¤¾à¤šà¤¾à¤° à¤”à¤° à¤–à¤¬à¤°à¥‡à¤‚" />
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
            <ErrorState message="à¤¸à¤®à¤¾à¤šà¤¾à¤° à¤²à¥‹à¤¡ à¤•à¤°à¤¨à¥‡ à¤®à¥‡à¤‚ à¤¸à¤®à¤¸à¥à¤¯à¤¾ à¤†à¤ˆà¥¤ à¤•à¥ƒà¤ªà¤¯à¤¾ à¤¬à¤¾à¤¦ à¤®à¥‡à¤‚ à¤ªà¥à¤°à¤¯à¤¾à¤¸ à¤•à¤°à¥‡à¤‚à¥¤" />
          ) : (
            <>
              {/* Hero Section - Top Stories */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-6 flex items-center">
                  <TrendingUp className="w-8 h-8 mr-2 text-primary" />
                  à¤®à¥à¤–à¥à¤¯ à¤¸à¤®à¤¾à¤šà¤¾à¤°
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
                  title="à¤°à¤¾à¤œà¤¨à¥€à¤¤à¤¿" 
                  articles={categories.politics || []} 
                  color="blue"
                />
                <CategorySection 
                  title="à¤µà¥à¤¯à¤¾à¤ªà¤¾à¤°" 
                  articles={categories.business || []} 
                  color="green"
                />
                <CategorySection 
                  title="à¤®à¤¨à¥‹à¤°à¤‚à¤œà¤¨" 
                  articles={categories.entertainment || []} 
                  color="purple"
                />
              </div>

              {/* More Top Stories */}
              {topStories.length > 3 && (
                <section className="mb-12">
                  <h2 className="text-2xl font-bold mb-6">à¤”à¤° à¤–à¤¬à¤°à¥‡à¤‚</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {topStories.slice(3, 7).map((article) => (
                      <NewsCard key={article.id} article={article} size="small" />
                    ))}
                  </div>
                </section>
              )}

              {/* Timestamp */}
              <div className="text-center text-xs text-gray-500 mt-8">
                à¤…à¤‚à¤¤à¤¿à¤® à¤…à¤ªà¤¡à¥‡à¤Ÿ: {new Date(fetchedAt).toLocaleString('hi-IN')}
              </div>
            </>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
}
