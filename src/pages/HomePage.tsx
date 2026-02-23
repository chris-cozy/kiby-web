import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Link, useLocation } from 'react-router-dom';
import { ErrorState } from '../components/ErrorState';
import { Seo } from '../components/Seo';
import {
  type PolicySlug,
  type PolicySource,
  defaultPolicySource,
} from '../content/policies';

type CenterView = 'home' | 'features' | 'dashboard' | 'terms' | 'privacy';

type InlinePolicyState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'ready'; markdown: string }
  | { status: 'error'; message: string };

function getCenterViewFromHash(hash: string): CenterView {
  switch (hash) {
    case '#features':
      return 'features';
    case '#dashboard':
      return 'dashboard';
    case '#terms':
      return 'terms';
    case '#privacy':
      return 'privacy';
    default:
      return 'home';
  }
}

const featureHighlights = [
  {
    title: 'Adoption And Onboarding',
    points: [
      '`/adopt` starts your Kiby run with guided onboarding.',
      'Tutorial supports replay, status, and skip controls.',
    ],
  },
  {
    title: 'Daily Care Actions',
    points: [
      'Feed, pet, play, cuddle, bathe, and train your companion.',
      'Sleep scheduling and cooldown systems support routine play.',
    ],
  },
  {
    title: 'Adventure And Events',
    points: [
      'Async adventures with claim flow, route tiers, and progression.',
      'Global campaign events to protect Dream Land together.',
    ],
  },
  {
    title: 'Economy And Progression',
    points: [
      'Shop, inventory, consumables, gifting, and stat growth.',
      'Quests, titles, streaks, and seasonal leaderboard support.',
    ],
  },
] as const;

const dashboardHighlights = [
  {
    title: 'Companion Status',
    detail: 'Check hunger, energy, mood, and streak readiness for each adopted Kiby.',
  },
  {
    title: 'Adventure Tracking',
    detail: 'Review active expeditions, route progress, and reward claim timing in one place.',
  },
  {
    title: 'Guardian Planning',
    detail: 'See reminders, event windows, and high-impact actions to defend Dream Land.',
  },
] as const;

const seoByView: Record<CenterView, { title: string; description: string; path: string }> = {
  home: {
    title: 'Kiby - Adopt, Care, Protect Dream Land',
    description:
      'Adopt a Kiby on Discord, care for your companion, and defend Dream Land through cooperative adventures.',
    path: '/',
  },
  features: {
    title: 'Kiby - Discord Features',
    description:
      'Explore Kiby Discord features including adoption, care loops, adventures, and world events.',
    path: '/#features',
  },
  dashboard: {
    title: 'Kiby - Guardian Dashboard Preview',
    description:
      'Preview upcoming Kiby dashboard capabilities including status tracking, adventures, and planning tools.',
    path: '/#dashboard',
  },
  terms: {
    title: 'Kiby - Terms Overview',
    description:
      'Read a quick summary of Kiby Terms of Service expectations for fair play and account responsibility.',
    path: '/#terms',
  },
  privacy: {
    title: 'Kiby - Privacy Overview',
    description:
      'Review a quick Kiby Privacy overview covering gameplay data usage and support controls.',
    path: '/#privacy',
  },
};

const policySectionMeta: Record<PolicySlug, { heading: string }> = {
  terms: {
    heading: 'Terms Of Service',
  },
  privacy: {
    heading: 'Privacy Policy',
  },
};

function isPolicyView(view: CenterView): view is PolicySlug {
  return view === 'terms' || view === 'privacy';
}

interface HomePageProps {
  policySource?: PolicySource;
}

export function HomePage({ policySource = defaultPolicySource }: HomePageProps) {
  const location = useLocation();
  const centerView = getCenterViewFromHash(location.hash);
  const seo = seoByView[centerView];
  const [inlinePolicyState, setInlinePolicyState] = useState<
    Record<PolicySlug, InlinePolicyState>
  >({
    terms: { status: 'idle' },
    privacy: { status: 'idle' },
  });

  useEffect(() => {
    if (!isPolicyView(centerView)) {
      return;
    }

    if (inlinePolicyState[centerView].status === 'ready') {
      return;
    }

    let isCancelled = false;

    setInlinePolicyState((previous) => ({
      ...previous,
      [centerView]: { status: 'loading' },
    }));

    policySource
      .load(centerView)
      .then((markdown) => {
        if (!isCancelled) {
          setInlinePolicyState((previous) => ({
            ...previous,
            [centerView]: { status: 'ready', markdown },
          }));
        }
      })
      .catch((error: unknown) => {
        if (isCancelled) {
          return;
        }

        const detail = error instanceof Error ? error.message : 'Please try again later.';
        setInlinePolicyState((previous) => ({
          ...previous,
          [centerView]: {
            status: 'error',
            message: `${detail} Check that the Markdown file exists in content/.`,
          },
        }));
      });

    return () => {
      isCancelled = true;
    };
  }, [centerView, policySource]);

  const activePolicyState = isPolicyView(centerView)
    ? inlinePolicyState[centerView]
    : null;

  return (
    <section className="page home-page">
      <Seo title={seo.title} description={seo.description} path={seo.path} />

      <div className="home-veil">
        <div className="center-content-shell">
          {centerView === 'home' ? (
            <section className="center-content content-enter" key="home">
              <p className="eyebrow">Dream Land Guardian Initiative</p>
              <h1>Adopt a Kiby. Play with your companion. Care for Dream Land.</h1>
              <p className="lede">
                Kiby is a Discord virtual pet adventure where players adopt their own Kiby,
                maintain core needs, and work together through world events to keep Dream Land
                peaceful.
              </p>

              <section aria-label="Core gameplay" className="hero-pillars">
                <article className="pillar-card">
                  <h2>Adopt</h2>
                  <p>Start with `/adopt` and guided onboarding for your first companion.</p>
                </article>
                <article className="pillar-card">
                  <h2>Play</h2>
                  <p>Use playful care actions to build affection, mood, and progression.</p>
                </article>
                <article className="pillar-card">
                  <h2>Care</h2>
                  <p>Feed, bathe, train, and protect Dream Land through coordinated events.</p>
                </article>
              </section>
            </section>
          ) : null}

          {centerView === 'features' ? (
            <section className="center-content content-enter" key="features">
              <p className="eyebrow">Kiby Discord Feature Set</p>
              <h1>What Guardians Can Do In Kiby</h1>
              <p className="lede">
                Kiby combines virtual pet care, progression systems, social play, and world
                defense events into one long-term Discord experience.
              </p>

              <section aria-label="Feature highlights" className="features-inline-grid">
                {featureHighlights.map((feature) => (
                  <article key={feature.title} className="feature-inline-card">
                    <h2>{feature.title}</h2>
                    <ul>
                      {feature.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </section>
            </section>
          ) : null}

          {centerView === 'dashboard' ? (
            <section className="center-content content-enter" key="dashboard">
              <p className="eyebrow">Guardian Console Preview</p>
              <h1>Dashboard Preview For Dream Land Guardians</h1>
              <p className="lede">
                The dashboard preview centralizes your Kiby health, adventures, and event planning
                so players can coordinate care and protect Dream Land efficiently.
              </p>

              <section aria-label="Dashboard highlights" className="hero-pillars">
                {dashboardHighlights.map((feature) => (
                  <article key={feature.title} className="pillar-card">
                    <h2>{feature.title}</h2>
                    <p>{feature.detail}</p>
                  </article>
                ))}
              </section>
            </section>
          ) : null}

          {centerView === 'terms' ? (
            <section className="center-content content-enter" key="terms">
              <p className="eyebrow">Kiby Legal</p>
              <h1>{policySectionMeta.terms.heading}</h1>
              <div className="inline-policy-scroll">
                {activePolicyState?.status === 'ready' ? (
                  <article className="markdown-body">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {activePolicyState.markdown}
                    </ReactMarkdown>
                  </article>
                ) : null}

                {activePolicyState?.status === 'error' ? (
                  <ErrorState title="Content unavailable" message={activePolicyState.message} />
                ) : null}

                {activePolicyState?.status === 'idle' || activePolicyState?.status === 'loading' ? (
                  <p role="status" aria-live="polite" className="inline-policy-status">
                    Loading policy content...
                  </p>
                ) : null}
              </div>
            </section>
          ) : null}

          {centerView === 'privacy' ? (
            <section className="center-content content-enter" key="privacy">
              <p className="eyebrow">Kiby Legal</p>
              <h1>{policySectionMeta.privacy.heading}</h1>
              <div className="inline-policy-scroll">
                {activePolicyState?.status === 'ready' ? (
                  <article className="markdown-body">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {activePolicyState.markdown}
                    </ReactMarkdown>
                  </article>
                ) : null}

                {activePolicyState?.status === 'error' ? (
                  <ErrorState title="Content unavailable" message={activePolicyState.message} />
                ) : null}

                {activePolicyState?.status === 'idle' || activePolicyState?.status === 'loading' ? (
                  <p role="status" aria-live="polite" className="inline-policy-status">
                    Loading policy content...
                  </p>
                ) : null}
              </div>
            </section>
          ) : null}
        </div>

        <p className="contact-inline">
          Need help or policy support? Explore <Link to="/#terms">Terms</Link>, and{' '}
          <Link to="/#privacy">Privacy</Link>.
        </p>
      </div>
    </section>
  );
}
