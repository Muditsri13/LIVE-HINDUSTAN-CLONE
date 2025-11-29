// components/Card.js
import Link from 'next/link';
export default function Card({ article }) {
  return (
    <div className="card">
      <div className="thumb">
        <img src={article.image || '/placeholder.jpg'} alt={article.title} style={{width:'100%',height:'100%',objectFit:'cover'}} />
      </div>
      <div className="card-body">
        <div style={{fontSize:12, color:'#6b7280'}}>{new Date(article.date).toLocaleDateString()}</div>
        <Link href={`/articles/${article.id}`} style={{textDecoration:'none', color:'inherit'}}>
          <div className="card-title">{article.title}</div>
        </Link>
        <div className="card-summary">{article.summary}</div>
      </div>
    </div>
  );
}
