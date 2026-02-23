import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const DISCORD_OAUTH_URL =
  'https://discord.com/oauth2/authorize?client_id=1095193298425094204';

export function HeaderNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const onHomeSurface = location.pathname === '/';
  const currentHash = onHomeSurface ? location.hash : '';

  const isHomeActive = onHomeSurface && (currentHash === '' || currentHash === '#home');
  const isFeaturesActive = onHomeSurface && currentHash === '#features';
  const isDashboardActive = onHomeSurface && currentHash === '#dashboard';

  function toggleMenu() {
    setMenuOpen((current) => !current);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <button
          type="button"
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="site-nav-shell"
          onClick={toggleMenu}
        >
          <span className="menu-toggle-bar" />
          <span className="menu-toggle-bar" />
          <span className="menu-toggle-bar" />
          <span className="menu-toggle-label">Menu</span>
        </button>

        <div id="site-nav-shell" className={menuOpen ? 'nav-shell nav-shell-open' : 'nav-shell'}>
          <nav aria-label="Primary">
            <ul className="nav-list">
              <li>
                <Link
                  className={isHomeActive ? 'nav-link nav-link-active' : 'nav-link'}
                  to="/"
                  onClick={closeMenu}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className={isFeaturesActive ? 'nav-link nav-link-active' : 'nav-link'}
                  to="/#features"
                  onClick={closeMenu}
                >
                  Features
                </Link>
              </li>
            </ul>
          </nav>
          <Link
            className={
              isDashboardActive
                ? 'nav-link nav-link-active nav-dashboard'
                : 'nav-link nav-dashboard'
            }
            to="/#dashboard"
            onClick={closeMenu}
          >
            Dashboard
          </Link>
          <a
            className="button button-primary nav-cta"
            href={DISCORD_OAUTH_URL}
            target="_blank"
            rel="noreferrer noopener"
            onClick={closeMenu}
          >
            Start Your Journey
          </a>
        </div>
      </div>
    </header>
  );
}
