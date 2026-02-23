import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <p>© {new Date().getFullYear()} A Cozy Studio. Kiby Dream Land.</p>
        <nav aria-label="Legal">
          <ul className="footer-links">
            <li>
              <Link to="/#features">Features</Link>
            </li>
            <li>
              <Link to="/#terms">Terms of Service</Link>
            </li>
            <li>
              <Link to="/#privacy">Privacy Policy</Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
