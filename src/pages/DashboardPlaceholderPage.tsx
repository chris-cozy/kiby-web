import { Seo } from '../components/Seo';

export function DashboardPlaceholderPage() {
  return (
    <section className="page dashboard-page">
      <Seo
        title="Kiby - Dashboard (Coming Soon)"
        description="Preview of upcoming Kiby Dream Land dashboard capabilities."
        path="/dashboard"
      />
      <p className="eyebrow">Guardian Console</p>
      <h1>Dashboard (coming soon)</h1>
      <p className="lede">
        The next milestone introduces authenticated player views and live Dream Land status data.
      </p>
      <ul>
        <li>Account-aware Kiby status, needs, and care history</li>
        <li>Adventure, event, and reward progression snapshots</li>
        <li>Secure settings and reminder preferences</li>
      </ul>
    </section>
  );
}
