import { render, screen, waitFor, within } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { type PolicySlug, type PolicySource } from '../content/policies';
import { createAppRoutes } from './router';

function createMockPolicySource(
  overrides: Partial<Record<PolicySlug, string | Error>> = {},
): PolicySource {
  const defaults: Record<PolicySlug, string> = {
    privacy: '# Kiby Privacy Policy\n\nThis is the privacy policy content.',
    terms: '# Kiby Terms of Service\n\nThis is the terms content.',
  };

  return {
    async load(slug) {
      const override = overrides[slug];

      if (override instanceof Error) {
        throw override;
      }

      return override ?? defaults[slug];
    },
  };
}

function renderAtRoute(pathname: string, policySource = createMockPolicySource()) {
  const router = createMemoryRouter(createAppRoutes({ policySource }), {
    initialEntries: [pathname],
  });

  return render(
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>,
  );
}

describe('Kiby web router', () => {
  it('renders home and navigation links', () => {
    renderAtRoute('/');

    expect(
      screen.getByRole('heading', {
        name: /adopt a kiby\. play with your companion\. care for dream land\./i,
      }),
    ).toBeInTheDocument();

    const nav = screen.getByRole('navigation', { name: 'Primary' });
    expect(within(nav).getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(within(nav).getByRole('link', { name: 'Features' })).toHaveAttribute(
      'href',
      '/#features',
    );

    const header = screen.getByRole('banner');
    expect(within(header).getByRole('link', { name: 'Dashboard' })).toHaveAttribute(
      'href',
      '/#dashboard',
    );
    const startJourney = screen.getByRole('link', { name: 'Start Your Journey' });
    expect(startJourney).toHaveAttribute(
      'href',
      'https://discord.com/oauth2/authorize?client_id=1095193298425094204',
    );
    expect(startJourney).toHaveAttribute('target', '_blank');
  });

  it('renders in-place features view when hash is set', () => {
    renderAtRoute('/#features');

    expect(
      screen.getByRole('heading', { name: /what guardians can do in kiby/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/adoption and onboarding/i)).toBeInTheDocument();
    expect(screen.getByText(/adventure and events/i)).toBeInTheDocument();
  });

  it('renders in-place dashboard preview when hash is set', () => {
    renderAtRoute('/#dashboard');

    expect(
      screen.getByRole('heading', { name: /dashboard preview for dream land guardians/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/companion status/i)).toBeInTheDocument();
  });

  it('renders in-place terms policy content when hash is set', async () => {
    renderAtRoute('/#terms');

    expect(screen.getByRole('heading', { name: /^terms of service$/i })).toBeInTheDocument();
    expect(await screen.findByRole('heading', { name: /^kiby terms of service$/i })).toBeInTheDocument();
    expect(screen.getByText(/this is the terms content\./i)).toBeInTheDocument();
  });

  it('renders in-place privacy policy content when hash is set', async () => {
    renderAtRoute('/#privacy');

    expect(screen.getByRole('heading', { name: /^privacy policy$/i })).toBeInTheDocument();
    expect(await screen.findByRole('heading', { name: /^kiby privacy policy$/i })).toBeInTheDocument();
    expect(screen.getByText(/this is the privacy policy content\./i)).toBeInTheDocument();
  });

  it('renders privacy policy markdown content', async () => {
    renderAtRoute('/privacy');

    expect(await screen.findByRole('heading', { name: /kiby privacy policy/i })).toBeInTheDocument();
    await waitFor(() => {
      expect(document.title).toBe('Kiby - Privacy Policy');
    });
  });

  it('renders terms policy markdown content', async () => {
    renderAtRoute('/terms');

    expect(await screen.findByRole('heading', { name: /kiby terms of service/i })).toBeInTheDocument();
    await waitFor(() => {
      expect(document.title).toBe('Kiby - Terms of Service');
    });
  });

  it('shows friendly fallback when policy content is unavailable', async () => {
    renderAtRoute('/privacy', createMockPolicySource({ privacy: new Error('Missing file') }));

    expect(await screen.findByRole('heading', { name: /content unavailable/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /return home/i })).toHaveAttribute('href', '/');
  });

  it('renders not found page for unknown routes', async () => {
    renderAtRoute('/unknown');

    expect(await screen.findByRole('heading', { name: /page not found/i })).toBeInTheDocument();
  });

  it('includes legal links in footer', () => {
    renderAtRoute('/dashboard');

    const footer = screen.getByRole('contentinfo');
    expect(within(footer).getByRole('link', { name: 'Features' })).toHaveAttribute(
      'href',
      '/#features',
    );
    expect(within(footer).getByRole('link', { name: 'Privacy Policy' })).toHaveAttribute(
      'href',
      '/#privacy',
    );
    expect(within(footer).getByRole('link', { name: 'Terms of Service' })).toHaveAttribute(
      'href',
      '/#terms',
    );
  });
});
