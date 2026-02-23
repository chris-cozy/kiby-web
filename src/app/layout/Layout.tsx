import { Outlet, useLocation } from 'react-router-dom';
import { BackgroundAudio } from '../../components/BackgroundAudio';
import { Footer } from './Footer';
import { HeaderNav } from './HeaderNav';

export function Layout() {
  const location = useLocation();
  const isHomeRoute = location.pathname === '/';

  return (
    <div className={isHomeRoute ? 'app-shell route-home' : 'app-shell'}>
      <BackgroundAudio />
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <HeaderNav />
      <main id="main-content" className="site-main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
