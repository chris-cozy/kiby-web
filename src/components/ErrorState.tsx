import { Link } from 'react-router-dom';

interface ErrorStateProps {
  title: string;
  message: string;
}

export function ErrorState({ title, message }: ErrorStateProps) {
  return (
    <section className="error-state" role="status" aria-live="polite">
      <h2>{title}</h2>
      <p>{message}</p>
      <div className="error-state-actions">
        <Link className="button button-primary" to="/">
          Return home
        </Link>
        <Link className="button button-ghost" to="/terms">
          Visit Terms
        </Link>
      </div>
    </section>
  );
}
