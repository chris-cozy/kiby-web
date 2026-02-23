import { Link, isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { Seo } from '../components/Seo';

export function RouteErrorPage() {
  const error = useRouteError();

  const message = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : 'An unexpected error occurred while rendering this page.';

  return (
    <section className="page route-error-page">
      <Seo
        title="Kiby - Unexpected Error"
        description="Unexpected route error while loading the Kiby web client."
        path="/error"
      />
      <p className="eyebrow">Error</p>
      <h1>We hit a snag</h1>
      <p>{message}</p>
      <Link className="button button-primary" to="/">
        Return home
      </Link>
    </section>
  );
}
