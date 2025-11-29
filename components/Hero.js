// components/Hero.js
import Image from 'next/image';
import Link from 'next/link';

export default function Hero({ article }) {
  if (!article) return null;
  return (
    <div className="hero">
      <div className="hero-inner container" style={{alignItems:'stretch'}}>
        <div className="hero-image">
          {article.image ? (
            <img src={article.image} alt={article.title} style={{width:'100%', height:'100%', objectFit:'cover'}} />
          ) : (
            <img src="/placeholder.jpg" alt="placeholder" style={{width:'100%', height:'100%', objectFit:'cover'}} />
          )}
        </div>

        <div className="hero-text">
          <div className="kicker">{article.category || 'Top Story'}</div>
          <h2>{article.title}</h2>
          <p>{article.summary}</p>
          <Link href={`/articles/${article.id}`} className="read-more">Read full story →</Link>
        </div>
      </div>
    </div>
  );
}
