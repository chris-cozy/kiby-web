import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';

export function NotFoundPage() {
  return (
    <section className="page not-found-page">
      <Seo
        title="Kiby - Page Not Found"
        description="The page you requested does not exist on the Kiby web client."
        path="/404"
      />
      <p className="eyebrow">404</p>
      <h1>Page not found</h1>
      <p>The link may be outdated or the page may have moved.</p>
      <Link className="button button-primary" to="/">
        Back to Home
      </Link>
    </section>
  );
}
